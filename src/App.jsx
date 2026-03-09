import React, { useEffect, useState } from 'react'
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
import Landing from './sections/Landing'

const App = () => {
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    window.history.replaceState({ view: 'landing' }, '')

    const handlePopState = (event) => {
      const isPortfolioView = event.state?.view === 'portfolio'
      setHasEntered(isPortfolioView)

      if (!isPortfolioView) {
        window.scrollTo({ top: 0, behavior: 'auto' })
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleEnterPortfolio = () => {
    setHasEntered(true)
    window.history.pushState({ view: 'portfolio' }, '')
  }

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Landing onEnter={handleEnterPortfolio} />
          </motion.div>
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
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