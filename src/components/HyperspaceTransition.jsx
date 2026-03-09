import { useMemo } from 'react'

const STREAK_COUNT = 140

const HyperspaceTransition = () => {
  const streaks = useMemo(
    () =>
      Array.from({ length: STREAK_COUNT }, (_, index) => ({
        id: index,
        angle: `${Math.random() * 360}deg`,
        distance: `${60 + Math.random() * 120}vmax`,
        width: `${18 + Math.random() * 95}px`,
        height: `${1 + Math.random() * 2.8}px`,
        delay: `${Math.random() * 0.55}s`,
        duration: `${1.1 + Math.random() * 0.7}s`,
        opacity: 0.45 + Math.random() * 0.55,
        depth: Math.random() > 0.55 ? 'near' : 'far',
      })),
    []
  )

  return (
    <section className="hyperspace-root" aria-hidden="true">
      <div className="hyperspace-turbulence" />
      <div className="hyperspace-streak-layer">
        {streaks.map((streak) => (
          <span
            key={streak.id}
            className={`hyperspace-streak hyperspace-streak-${streak.depth}`}
            style={{
              '--streak-angle': streak.angle,
              '--streak-distance': streak.distance,
              width: streak.width,
              height: streak.height,
              opacity: streak.opacity,
              animationDelay: streak.delay,
              animationDuration: streak.duration,
            }}
          />
        ))}
      </div>
      <div className="hyperspace-rings" />
      <div className="hyperspace-core" />
      <div className="hyperspace-vignette" />
    </section>
  )
}

export default HyperspaceTransition
