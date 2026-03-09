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
            ? `${20 + Math.random() * 42}vmax`
            : `${110 + Math.random() * 170}vmax`,
        width:
          phase === 'prep'
            ? `${18 + Math.random() * 62}px`
            : `${90 + Math.random() * 260}px`,
        height:
          phase === 'prep'
            ? `${0.8 + Math.random() * 1.2}px`
            : `${1.4 + Math.random() * 2.6}px`,
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
      <div className="hyperspace-streak-layer">
        {streaks.map((streak) => (
          <span
            key={streak.id}
            className={`hyperspace-streak hyperspace-streak-${streak.depth} ${phase === 'prep' ? 'hyperspace-streak-prep' : ''}`}
            style={{
              '--streak-angle': streak.angle,
              '--streak-distance': streak.distance,
              '--streak-opacity': streak.opacity,
              width: streak.width,
              height: streak.height,
              animationDelay: streak.delay,
              animationDuration: streak.duration,
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default HyperspaceTransition
