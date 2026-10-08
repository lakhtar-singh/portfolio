import { useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useSmoothScroll } from './lib/useSmoothScroll'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Roles from './components/Roles'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import Toast from './components/Toast'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  const [loading, setLoading] = useState(true)

  useSmoothScroll()

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Loader key="loader" onDone={() => setLoading(false)} />}</AnimatePresence>
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero ready={!loading} />
        <About />
        <Roles />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
      <Toast />
      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  )
}
