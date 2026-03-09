import { useMemo } from "react";
import { motion } from "motion/react";

const STAR_COUNT = 70;

const Landing = ({ onEnter }) => {
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.7,
      })),
    []
  );

  return (
    <section className="landing-root">
      <div className="landing-nebula landing-nebula-left" />
      <div className="landing-nebula landing-nebula-right" />

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
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              opacity: star.opacity,
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
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          Arijit Karmakar
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
