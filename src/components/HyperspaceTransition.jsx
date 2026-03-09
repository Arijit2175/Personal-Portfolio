import { useMemo } from 'react'

const WARP_STREAK_COUNT = 170
const PREP_STREAK_COUNT = 90

const HyperspaceTransition = ({ phase = 'warp' }) => {
  const streaks = useMemo(
    () =>
      Array.from({ length: phase === 'prep' ? PREP_STREAK_COUNT : WARP_STREAK_COUNT }, (_, index) => ({
        id: index,
        angle: `${Math.random() * 360}deg`,
        distance:
          phase === 'prep'
            ? `${16 + Math.random() * 30}vmax`
            : `${85 + Math.random() * 150}vmax`,
        width:
          phase === 'prep'
            ? `${8 + Math.random() * 28}px`
            : `${35 + Math.random() * 180}px`,
        height:
          phase === 'prep'
            ? `${0.8 + Math.random() * 1.6}px`
            : `${2 + Math.random() * 4.5}px`,
        delay:
          phase === 'prep'
            ? `${Math.random() * 0.95}s`
            : `${Math.random() * 0.55}s`,
        duration:
          phase === 'prep'
            ? `${1.35 + Math.random() * 1.15}s`
            : `${1.2 + Math.random() * 0.9}s`,
        opacity:
          phase === 'prep'
            ? 0.28 + Math.random() * 0.36
            : 0.55 + Math.random() * 0.45,
        depth: Math.random() > 0.55 ? 'near' : 'far',
      })),
    [phase]
  )

  return (
    <section className={`hyperspace-root hyperspace-root-${phase}`} aria-hidden="true">
      <div className="hyperspace-turbulence" />
      <div className="hyperspace-streak-layer">
        {streaks.map((streak) => (
          <span
            key={streak.id}
            className={`hyperspace-streak hyperspace-streak-${streak.depth} ${phase === 'prep' ? 'hyperspace-streak-prep' : ''}`}
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
      <div className="hyperspace-vignette" />
    </section>
  )
}

export default HyperspaceTransition
