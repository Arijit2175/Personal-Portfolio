import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Particles } from "../components/Particles";

const FULL_NAME = "Arijit Karmakar";

const Landing = ({ onEnter }) => {
  const [typedName, setTypedName] = useState("");
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const isTyping = typedName.length < FULL_NAME.length;

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

  return (
    <section className="landing-root">
      <Particles
        className="landing-particles"
        quantity={140}
        size={0.7}
        staticity={65}
        ease={80}
        color="#ffffff"
        refresh
      />

      <div className="landing-nebula landing-nebula-left" />
      <div className="landing-nebula landing-nebula-right" />

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
          <span className="landing-title-text">{typedName}</span>
          {isTyping && (
            <span className="landing-caret" aria-hidden="true">
              |
            </span>
          )}
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
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          className="landing-button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {isButtonHovered ? "Get Ready!" : "Embark On An Adventure"}
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Landing;
