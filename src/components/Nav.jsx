import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { scrollToId, scrollToTop, lockScroll } from '../lib/scroll'
import { openPalette } from '../lib/events'

export const sections = [
  ['about', 'About'],
  ['leadership', 'Lead & build'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['contact', 'Contact'],
]

export default function Nav() {
  const [active, setActive] = useState('')
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(v > prev && v > 240)
    setScrolled(v > 20)
  })

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el) })
    const hero = document.getElementById('top')
    if (hero) io.observe(hero)
    return () => io.disconnect()
  }, [])

  useEffect(() => { lockScroll(menu) }, [menu])

  const go = (id) => { setMenu(false); setTimeout(() => scrollToId(id), menu ? 350 : 0) }
  const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform)

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'is-scrolled' : ''}`}
        animate={{ y: hidden && !menu ? '-130%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <button className="nav-logo" onClick={scrollToTop} aria-label="Back to top">
          <span className="logo-mark">LS</span>
          <span className="logo-text">Lakhtar Singh</span>
        </button>
        <nav className="nav-links" aria-label="Sections">
          {sections.map(([id, label]) => (
            <button key={id} className={`nav-link ${active === id ? 'is-active' : ''}`} onClick={() => go(id)}>
              {active === id && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="kbd-btn" onClick={openPalette} aria-label="Open command menu">
            <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd><kbd>K</kbd>
          </button>
          <button className="btn btn-small btn-accent nav-cta" onClick={() => go('contact')}>Hire me</button>
          <button className={`burger ${menu ? 'is-open' : ''}`} onClick={() => setMenu((m) => !m)} aria-label="Menu" aria-expanded={menu}>
            <span /><span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 36px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 36px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 36px)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile">
              {sections.map(([id, label], i) => (
                <motion.button
                  key={id}
                  className="mobile-link"
                  onClick={() => go(id)}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="mono">~/{id}</span>{label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
