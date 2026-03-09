import createGlobe from "cobe";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { certificates } from "../constants";

const BASE_THETA = 0.3;
const AUTO_ROTATION_SPEED = 0.0012;

const Certificates = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const widthRef = useRef(0);
  const scrollPhiRef = useRef(0);
  const autoPhiRef = useRef(0);

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
      baseColor: [1, 1, 1],
      markerColor: [1, 1, 1],
      glowColor: [1, 1, 1],
      markers,
      onRender: (state) => {
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

      <div className="mt-10 space-y-8">
        <div className="sticky top-24 z-20 w-full max-w-[30rem] mx-auto">
          <canvas
            ref={canvasRef}
            className="w-full transition-opacity duration-500 opacity-0 aspect-square [contain:layout_paint_size]"
          />
        </div>

        <div className="space-y-7 pt-[28rem] md:pt-[32rem]">
          {certificates.map((certificate, index) => {
            const isActive = index === activeIndex;
            const alignRight = index % 2 === 0;

            return (
              <article
                key={certificate.id}
                className={`flex ${
                  alignRight
                    ? "justify-end pl-8 md:pl-28 lg:pl-44"
                    : "justify-start pr-8 md:pr-28 lg:pr-44"
                }`}
              >
                <div
                  className={`w-full max-w-sm border rounded-2xl p-5 transition-all duration-300 ${
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
