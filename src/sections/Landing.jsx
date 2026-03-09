import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";

const STAR_COUNT = 70;
const FULL_NAME = "Arijit Karmakar";

const Landing = ({ onEnter }) => {
  const [typedName, setTypedName] = useState("");

  useEffect(() => {
    let charIndex = 0;
    const typeTimer = window.setInterval(() => {
      charIndex += 1;
      setTypedName(FULL_NAME.slice(0, charIndex));
      if (charIndex >= FULL_NAME.length) {
        window.clearInterval(typeTimer);
      }
    }, 95);

    return () => window.clearInterval(typeTimer);
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 4,
        twinkleDuration: 2 + Math.random() * 4,
        driftDuration: 10 + Math.random() * 12,
        opacity: 0.3 + Math.random() * 0.7,
        driftX: `${(Math.random() * 26 - 13).toFixed(2)}px`,
        driftY: `${(Math.random() * 26 - 13).toFixed(2)}px`,
      })),
    []
  );

  return (
    <section className="landing-root">
      <div className="landing-nebula landing-nebula-left" />
      <div className="landing-nebula landing-nebula-right" />

      <div className="landing-ship-orbit" aria-hidden="true">
        <div className="landing-ship-trail" />
        <div className="landing-ship" />
      </div>

      <div className="landing-stars" aria-hidden="true">
        {stars.map((star) => (
          <span
            key={star.id}
            className="landing-star"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s, ${star.delay / 2}s`,
              animationDuration: `${star.twinkleDuration}s, ${star.driftDuration}s`,
              opacity: star.opacity,
              "--star-dx": star.driftX,
              "--star-dy": star.driftY,
            }}
          />
        ))}
      </div>

      <motion.div
        className="landing-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.p
          className="landing-intro"
          initial={{ opacity: 0, letterSpacing: "0.7em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          Welcome Aboard
        </motion.p>

        <motion.h1
          className="landing-title"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.22 }}
        >
          <span>{typedName}</span>
          <span className="landing-caret" aria-hidden="true">
            |
          </span>
        </motion.h1>

        <motion.p
          className="landing-subtitle"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          Charting modern web experiences through code, motion, and design.
        </motion.p>

        <motion.button
          type="button"
          onClick={onEnter}
          className="landing-button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Embark On An Adventure
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Landing;
