import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import GitHubActivity from './sections/GitHubActivity'
import Projects from './sections/Projects'
import Education from './sections/Education'
import Experiences from './sections/Experiences'
import Certificates from './sections/Certificates'
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
      const stateView = event.state?.view

      if (stateView !== 'landing' && stateView !== 'portfolio') {
        if (viewRef.current === 'portfolio') return
      }

      const targetView = stateView === 'portfolio' ? 'portfolio' : 'landing'
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
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            <Landing onEnter={handleEnterPortfolio} />
          </motion.div>
        ) : view === 'departing' ? (
          <motion.div
            key="departing"
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.998 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <Landing onEnter={handleEnterPortfolio} isDeparting />
            <HyperspaceTransition phase="prep" />
          </motion.div>
        ) : view === 'jump' ? (
          <motion.div
            key="jump"
            initial={{ scale: 1.004 }}
            animate={{ scale: 1 }}
            exit={{ scale: 1 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
          >
            <HyperspaceTransition phase="warp" />
          </motion.div>
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="container mx-auto max-w-7xl">
              <Navbar />
              <Hero />
              <About />
              <GitHubActivity />
              <Projects />
              <Education />
              <Experiences />
              <Certificates />
              <Skills />
              <Contact />
              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App