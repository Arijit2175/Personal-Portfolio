import { useMemo } from 'react'

const STREAK_COUNT = 64

const HyperspaceTransition = () => {
  const streaks = useMemo(
    () =>
      Array.from({ length: STREAK_COUNT }, (_, index) => ({
        id: index,
        top: `${Math.random() * 100}%`,
        width: `${40 + Math.random() * 180}px`,
        height: `${1 + Math.random() * 2}px`,
        delay: `${Math.random() * 0.42}s`,
        duration: `${0.45 + Math.random() * 0.45}s`,
        opacity: 0.25 + Math.random() * 0.65,
      })),
    []
  )

  return (
    <section className="hyperspace-root" aria-hidden="true">
      <div className="hyperspace-vignette" />
      <div className="hyperspace-streak-layer">
        {streaks.map((streak) => (
          <span
            key={streak.id}
            className="hyperspace-streak"
            style={{
              top: streak.top,
              width: streak.width,
              height: streak.height,
              opacity: streak.opacity,
              animationDelay: streak.delay,
              animationDuration: streak.duration,
            }}
          />
        ))}
      </div>
      <div className="hyperspace-core" />
      <div className="hyperspace-flash" />
    </section>
  )
}

export default HyperspaceTransition
