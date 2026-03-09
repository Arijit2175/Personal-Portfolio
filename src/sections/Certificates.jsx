import createGlobe from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import CertificateDetails from "../components/CertificateDetails";
import { certificates } from "../constants";

const MOVEMENT_DAMPING = 1400;
const BASE_THETA = 0.3;
const AUTO_ROTATION_SPEED = 0.004;
const MARKER_RADIUS = 41;

const projectMarker = (location, phi, theta) => {
  const [lat, lon] = location;
  const latRad = (lat * Math.PI) / 180;
  const lonRad = (lon * Math.PI) / 180;

  const x = Math.cos(latRad) * Math.cos(lonRad);
  const y = Math.sin(latRad);
  const z = Math.cos(latRad) * Math.sin(lonRad);

  const x1 = x * Math.cos(phi) - z * Math.sin(phi);
  const z1 = x * Math.sin(phi) + z * Math.cos(phi);

  const y2 = y * Math.cos(theta) - z1 * Math.sin(theta);
  const z2 = y * Math.sin(theta) + z1 * Math.cos(theta);

  return {
    x: x1,
    y: y2,
    visible: z2 > -0.03,
  };
};

const Certificates = () => {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const widthRef = useRef(0);
  const phiRef = useRef(0);
  const frameRef = useRef(0);

  const [activeId, setActiveId] = useState(certificates[0]?.id ?? null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [points, setPoints] = useState([]);

  const activeCertificate = useMemo(
    () => certificates.find((certificate) => certificate.id === activeId),
    [activeId]
  );

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const markers = useMemo(
    () =>
      certificates.map((certificate) => ({
        location: certificate.location,
        size: 0.08,
      })),
    []
  );

  useEffect(() => {
    const resize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };

    const updateProjectedMarkers = (phi) => {
      setPoints(
        certificates.map((certificate) => {
          const projected = projectMarker(certificate.location, phi, BASE_THETA);

          return {
            id: certificate.id,
            visible:
              projected.visible &&
              Math.sqrt(projected.x * projected.x + projected.y * projected.y) <=
                0.94,
            left: `${50 + projected.x * MARKER_RADIUS}%`,
            top: `${50 - projected.y * MARKER_RADIUS}%`,
          };
        })
      );
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
        if (!pointerInteracting.current) {
          phiRef.current += AUTO_ROTATION_SPEED;
        }

        const currentPhi = phiRef.current + rs.get();
        state.phi = currentPhi;
        state.theta = BASE_THETA;
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;

        frameRef.current += 1;
        if (frameRef.current % 3 === 0) {
          updateProjectedMarkers(currentPhi);
        }
      },
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
      updateProjectedMarkers(phiRef.current);
    }, 0);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", resize);
    };
  }, [markers, rs]);

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
      pointerInteracting.current = clientX;
    }
  };

  const openCertificate = (id) => {
    setActiveId(id);
    setIsModalOpen(true);
  };

  return (
    <section className="c-space section-spacing" id="certificates">
      <h2 className="text-heading">Certificates</h2>
      <p className="mt-2 text-sm text-neutral-400 md:text-base">
        Click on the highlighted points for more info.
      </p>

      <div className="mt-10">
        <div className="relative w-full max-w-[36rem] mx-auto overflow-hidden rounded-full">
          <canvas
            ref={canvasRef}
            className="w-full transition-opacity duration-500 opacity-0 aspect-square [contain:layout_paint_size]"
            onPointerDown={(event) => updatePointerInteraction(event.clientX)}
            onPointerUp={() => updatePointerInteraction(null)}
            onPointerOut={() => updatePointerInteraction(null)}
            onMouseMove={(event) => updateMovement(event.clientX)}
            onTouchStart={(event) => {
              if (event.touches[0]) {
                updatePointerInteraction(event.touches[0].clientX);
              }
            }}
            onTouchEnd={() => updatePointerInteraction(null)}
            onTouchMove={(event) => {
              if (event.touches[0]) {
                updateMovement(event.touches[0].clientX);
              }
            }}
          />

          <div className="absolute inset-0 pointer-events-none">
            {points.map((point) => (
              <button
                key={point.id}
                type="button"
                onClick={() => openCertificate(point.id)}
                className={`pointer-events-auto absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white transition-all duration-200 ${
                  point.visible
                    ? "opacity-100"
                    : "opacity-0"
                } ${
                  activeId === point.id
                    ? "scale-110 bg-white shadow-[0_0_20px_rgba(255,255,255,0.95)]"
                    : "bg-white/85 shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                }`}
                style={{ left: point.left, top: point.top }}
                aria-label={`View certificate ${point.id}`}
              />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && activeCertificate && (
        <CertificateDetails
          certificate={activeCertificate}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};

export default Certificates;
