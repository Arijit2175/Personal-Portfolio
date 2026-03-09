import createGlobe from "cobe";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { certificates } from "../constants";

const BASE_THETA = 0.3;
const AUTO_ROTATION_SPEED = 0.0012;
const COLOR_CYCLE_SECONDS = 6;

const COLOR_THEMES = [
  {
    baseColor: [0.2, 0.26, 0.48],
    markerColor: [0.95, 0.98, 1],
    glowColor: [0.5, 0.72, 1],
  },
  {
    baseColor: [0.18, 0.42, 0.34],
    markerColor: [0.94, 1, 0.96],
    glowColor: [0.42, 0.9, 0.74],
  },
  {
    baseColor: [0.42, 0.22, 0.46],
    markerColor: [1, 0.94, 1],
    glowColor: [0.85, 0.52, 1],
  },
  {
    baseColor: [0.44, 0.3, 0.18],
    markerColor: [1, 0.96, 0.9],
    glowColor: [1, 0.72, 0.4],
  },
];

const lerp = (start, end, amount) => start + (end - start) * amount;

const lerpColor = (start, end, amount) => [
  lerp(start[0], end[0], amount),
  lerp(start[1], end[1], amount),
  lerp(start[2], end[2], amount),
];

const Certificates = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const widthRef = useRef(0);
  const scrollPhiRef = useRef(0);
  const autoPhiRef = useRef(0);
  const colorStartTimeRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const markers = useMemo(
    () =>
      certificates.map((certificate) => ({
        location: certificate.location,
        size: 0.06,
      })),
    []
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    scrollPhiRef.current = latest * Math.PI * 2.2;
    const nextIndex = Math.min(
      certificates.length - 1,
      Math.floor(latest * certificates.length)
    );
    setActiveIndex(nextIndex);
  });

  useEffect(() => {
    const resize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", resize);
    resize();

    const globe = createGlobe(canvasRef.current, {
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      devicePixelRatio: 2,
      phi: 0,
      theta: BASE_THETA,
      dark: 1,
      diffuse: 0.4,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: COLOR_THEMES[0].baseColor,
      markerColor: COLOR_THEMES[0].markerColor,
      glowColor: COLOR_THEMES[0].glowColor,
      markers,
      onRender: (state) => {
        if (!colorStartTimeRef.current) {
          colorStartTimeRef.current = performance.now();
        }

        const elapsedSeconds =
          (performance.now() - colorStartTimeRef.current) / 1000;
        const cycleProgress = elapsedSeconds / COLOR_CYCLE_SECONDS;
        const fromIndex = Math.floor(cycleProgress) % COLOR_THEMES.length;
        const toIndex = (fromIndex + 1) % COLOR_THEMES.length;
        const mix = cycleProgress % 1;

        state.baseColor = lerpColor(
          COLOR_THEMES[fromIndex].baseColor,
          COLOR_THEMES[toIndex].baseColor,
          mix
        );
        state.markerColor = lerpColor(
          COLOR_THEMES[fromIndex].markerColor,
          COLOR_THEMES[toIndex].markerColor,
          mix
        );
        state.glowColor = lerpColor(
          COLOR_THEMES[fromIndex].glowColor,
          COLOR_THEMES[toIndex].glowColor,
          mix
        );

        autoPhiRef.current += AUTO_ROTATION_SPEED;
        state.phi = autoPhiRef.current + scrollPhiRef.current;
        state.theta = BASE_THETA;
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 0);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", resize);
    };
  }, [markers]);

  return (
    <section className="c-space section-spacing" id="certificates" ref={sectionRef}>
      <h2 className="text-heading">Certificates</h2>

      <div className="mt-8 space-y-6 md:mt-10 md:space-y-8">
        <div className="relative z-20 w-full max-w-[18rem] mx-auto md:sticky md:top-24 md:max-w-[27rem]">
          <canvas
            ref={canvasRef}
            className="w-full transition-opacity duration-500 opacity-0 aspect-square [contain:layout_paint_size]"
          />
        </div>

        <div className="pt-4 space-y-6 md:space-y-7 md:pt-[26rem] lg:pt-[28rem]">
          {certificates.map((certificate, index) => {
            const isActive = index === activeIndex;
            const alignRight = index % 2 === 0;

            return (
              <article
                key={certificate.id}
                className={`flex ${
                  alignRight
                    ? "justify-center md:justify-end md:pl-20 lg:pl-36 xl:pl-44"
                    : "justify-center md:justify-start md:pr-20 lg:pr-36 xl:pr-44"
                }`}
              >
                <div
                  className={`w-full max-w-[22rem] sm:max-w-sm border rounded-2xl p-4 sm:p-5 transition-all duration-300 ${
                    isActive
                      ? "border-white/30 bg-midnight shadow-[0_0_24px_rgba(255,255,255,0.12)]"
                      : "border-white/10 bg-midnight/70"
                  }`}
                >
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="object-cover w-full mb-4 rounded-xl h-52"
                  />

                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={certificate.logo}
                      alt={certificate.organization}
                      className="w-10 h-10 p-1 rounded-lg bg-white/10"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-white">{certificate.title}</h3>
                      <p className="text-sm text-neutral-400">
                        {certificate.organization} | {certificate.country}
                      </p>
                    </div>
                  </div>

                  <p className="mb-3 text-sm text-neutral-400 md:text-base">
                    {certificate.description}
                  </p>
                  <p className="text-sm text-neutral-500">Issued: {certificate.issued}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
