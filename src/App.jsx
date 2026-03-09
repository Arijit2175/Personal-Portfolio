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

const TRANSITION_DURATION_MS = 1700

const App = () => {
  const [view, setView] = useState('landing')
  const viewRef = useRef('landing')
  const transitionTimerRef = useRef(null)

  useEffect(() => {
    viewRef.current = view
  }, [view])

  useEffect(() => {
    window.history.replaceState({ view: 'landing' }, '')

    const startJumpTo = (targetView) => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current)
      }

      setView('jump')
      transitionTimerRef.current = window.setTimeout(() => {
        setView(targetView)
        transitionTimerRef.current = null

        if (targetView === 'landing') {
          window.scrollTo({ top: 0, behavior: 'auto' })
        }
      }, TRANSITION_DURATION_MS)
    }

    const handlePopState = (event) => {
      const targetView = event.state?.view === 'portfolio' ? 'portfolio' : 'landing'
      if (targetView !== viewRef.current) {
        startJumpTo(targetView)
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
      {view === 'landing' ? (
        <Landing onEnter={handleEnterPortfolio} />
      ) : view === 'jump' ? (
        <HyperspaceTransition />
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