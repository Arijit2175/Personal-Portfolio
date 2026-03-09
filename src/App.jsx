import React, { useEffect, useRef, useState } from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Experiences from './sections/Experiences'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import CustomCursor from './components/CustomCursor'
import HyperspaceTransition from './components/HyperspaceTransition'
import Landing from './sections/Landing'

const DEPARTURE_DURATION_MS = 950
const TRANSITION_DURATION_MS = 2800

const App = () => {
  const [view, setView] = useState('landing')
  const viewRef = useRef('landing')
  const departureTimerRef = useRef(null)
  const transitionTimerRef = useRef(null)

  useEffect(() => {
    viewRef.current = view
  }, [view])

  useEffect(() => {
    window.history.replaceState({ view: 'landing' }, '')

    const clearTimers = () => {
      if (departureTimerRef.current) {
        window.clearTimeout(departureTimerRef.current)
        departureTimerRef.current = null
      }
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current)
        transitionTimerRef.current = null
      }
    }

    const startJumpTo = (targetView, withDeparture = false) => {
      clearTimers()

      if (withDeparture) {
        setView('departing')
        departureTimerRef.current = window.setTimeout(() => {
          setView('jump')
          departureTimerRef.current = null
        }, DEPARTURE_DURATION_MS)
      } else {
        setView('jump')
      }

      const totalDuration = withDeparture
        ? DEPARTURE_DURATION_MS + TRANSITION_DURATION_MS
        : TRANSITION_DURATION_MS

      transitionTimerRef.current = window.setTimeout(() => {
        setView(targetView)
        transitionTimerRef.current = null

        if (targetView === 'landing') {
          window.scrollTo({ top: 0, behavior: 'auto' })
        }
      }, totalDuration)
    }

    const handlePopState = (event) => {
      const targetView = event.state?.view === 'portfolio' ? 'portfolio' : 'landing'
      if (targetView !== viewRef.current) {
        startJumpTo(targetView)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => {
      clearTimers()
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const handleEnterPortfolio = () => {
    if (view !== 'landing') return

    window.history.pushState({ view: 'portfolio' }, '')

    setView('departing')
    departureTimerRef.current = window.setTimeout(() => {
      setView('jump')
      departureTimerRef.current = null
    }, DEPARTURE_DURATION_MS)

    transitionTimerRef.current = window.setTimeout(() => {
      setView('portfolio')
      transitionTimerRef.current = null
    }, DEPARTURE_DURATION_MS + TRANSITION_DURATION_MS)
  }

  return (
    <>
      <CustomCursor />
      {view === 'landing' || view === 'departing' ? (
        <>
          <Landing onEnter={handleEnterPortfolio} isDeparting={view === 'departing'} />
          {view === 'departing' && <HyperspaceTransition phase="prep" />}
        </>
      ) : view === 'jump' ? (
        <HyperspaceTransition phase="warp" />
      ) : (
        <div className="container mx-auto max-w-7xl">
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Experiences />
          <Skills />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  )
}

export default App