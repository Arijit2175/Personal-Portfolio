import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
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

const TRANSITION_DURATION_MS = 1700

const App = () => {
  const [view, setView] = useState('landing')
  const transitionTimerRef = useRef(null)

  useEffect(() => {
    window.history.replaceState({ view: 'landing' }, '')

    const handlePopState = (event) => {
      const isPortfolioView = event.state?.view === 'portfolio'
      setView(isPortfolioView ? 'portfolio' : 'landing')

      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current)
        transitionTimerRef.current = null
      }

      if (!isPortfolioView) {
        window.scrollTo({ top: 0, behavior: 'auto' })
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current)
      }
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const handleEnterPortfolio = () => {
    if (view !== 'landing') return

    window.history.pushState({ view: 'portfolio' }, '')
    setView('jump')
    transitionTimerRef.current = window.setTimeout(() => {
      setView('portfolio')
      transitionTimerRef.current = null
    }, TRANSITION_DURATION_MS)
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
            transition={{ duration: 0.35 }}
          >
            <Landing onEnter={handleEnterPortfolio} />
          </motion.div>
        ) : view === 'jump' ? (
          <motion.div
            key="jump"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <HyperspaceTransition />
          </motion.div>
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, y: 14, scale: 1.01 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App