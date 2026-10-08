import { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import Preview from '../components/Preview'
import { SectionHeadV2 } from './Shared'
import { demos } from '../demos'
import { kindClass, kindLabel, projects } from '../data'
import { lockScroll, scrollToId } from '../lib/scroll'
import { useMediaQuery } from '../lib/useMediaQuery'

const ease = [0.22, 1, 0.36, 1]
const counts = projects.reduce((m, p) => ({ ...m, [p.kind]: (m[p.kind] ?? 0) + 1 }), {})

function Panel({ p, i, onOpen }) {
  return (
    <motion.article className="v2-panel" whileHover="hover" initial="rest" animate="rest" onClick={() => onOpen(p)} data-cursor>
      <div className="v2-panel-top">
        <span>{String(i + 1).padStart(2, '0')} / {projects.length}</span>
        <span className={`v2-kind ${kindClass(p.kind)}`}>{kindLabel[p.kind]}</span>
      </div>
      <div className="v2-panel-screen">
        <motion.div className="v2-panel-screen-inner" variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }} transition={{ duration: 0.6, ease }}>
          <Preview kind={p.demo} />
        </motion.div>
      </div>
      <h3 className="v2-panel-title">{p.title}</h3>
      <p className="v2-panel-tag">{p.tagline}</p>
      <div className="v2-chips">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
      <button className="v2-panel-open" onClick={(e) => { e.stopPropagation(); onOpen(p) }}>
        Run the demo
        <motion.span aria-hidden="true" variants={{ rest: { x: 0 }, hover: { x: 6 } }}>→</motion.span>
        <span className="sr-only">: {p.title}</span>
      </button>
    </motion.article>
  )
}

const Intro = () => (
  <div className="v2-work-intro">
    <SectionHeadV2
      label="Work"
      title="Eleven projects you can actually run."
      accent={[4, 5]}
      intro="Full-stack builds that go from React down to MySQL and MongoDB, three shipped projects from my résumé, and four front-end labs."
    />
    <ul className="v2-legend">
      {Object.entries(counts).map(([k, n]) => <li key={k}><b>{n}</b>{k}</li>)}
    </ul>
  </div>
)

function Horizontal({ onOpen }) {
  const section = useRef(null)
  const track = useRef(null)
  const dist = useMotionValue(0)
  const [height, setHeight] = useState(0)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(() => -scrollYProgress.get() * dist.get())

  useLayoutEffect(() => {
    const measure = () => {
      const d = Math.max(0, track.current.scrollWidth - window.innerWidth)
      dist.set(d)
      setHeight(d)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [dist])

  return (
    <div ref={section} className="v2-hscroll" style={{ height: `calc(100vh + ${height}px)` }}>
      <div className="v2-hsticky">
        <motion.div ref={track} className="v2-track" style={{ x }}>
          <Intro />
          {projects.map((p, i) => <Panel key={p.id} p={p} i={i} onOpen={onOpen} />)}
          <div className="v2-work-end">
            <p className="v2-title">Like what you ran?</p>
            <button className="v2-btn" onClick={() => scrollToId('contact')}>Let’s talk →</button>
          </div>
        </motion.div>
        <div className="v2-hprogress" aria-hidden="true"><motion.span style={{ scaleX: scrollYProgress }} /></div>
      </div>
    </div>
  )
}

function Vertical({ onOpen }) {
  return (
    <div className="v2-wrap v2-vlist">
      <Intro />
      {projects.map((p, i) => (
        <motion.div key={p.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.7, ease }}>
          <Panel p={p} i={i} onOpen={onOpen} />
        </motion.div>
      ))}
    </div>
  )
}

function Drawer({ p, onClose, onNav }) {
  const Demo = demos[p.demo]
  const closeRef = useRef(null)

  useEffect(() => {
    lockScroll(true)
    const prev = document.activeElement
    closeRef.current?.focus()
    const key = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.altKey && e.key === 'ArrowRight') onNav(1)
      if (e.altKey && e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', key)
    return () => { lockScroll(false); window.removeEventListener('keydown', key); prev?.focus?.() }
  }, [onClose, onNav])

  return (
    <motion.div className="v2-drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} onClick={onClose}>
      <motion.aside
        className="v2-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="v2-drawer-title"
        data-lenis-prevent
        initial={{ x: '100%' }}
        animate={{ x: '0%' }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="v2-drawer-head">
          <div>
            <span className={`kind ${kindClass(p.kind)}`}>{kindLabel[p.kind]}</span>
            <h3 id="v2-drawer-title">{p.title}</h3>
          </div>
          <div className="modal-actions">
            <button className="icon-btn" onClick={() => onNav(-1)} aria-label="Previous project">←</button>
            <button className="icon-btn" onClick={() => onNav(1)} aria-label="Next project">→</button>
            <button ref={closeRef} className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
          </div>
        </header>
        <AnimatePresence mode="wait">
          <motion.div key={p.id} className="v2-drawer-body" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, delay: 0.1, ease }}>
            <p className="modal-about">{p.about}</p>
            <div className="v2-drawer-meta">
              <ul className="built-list">{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
              <div className="project-stack">{p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
            </div>
            <div className="demo-frame">
              <div className="demo-label"><span className="live-dot" />Live demo, try it</div>
              <Suspense fallback={<div className="demo-loading mono">Loading demo…</div>}><Demo /></Suspense>
            </div>
            <p className="modal-note mono">All data in the demo is sample data.</p>
          </motion.div>
        </AnimatePresence>
      </motion.aside>
    </motion.div>
  )
}

export default function WorkGallery() {
  const wide = useMediaQuery('(min-width: 900px)')
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [active, setActive] = useState(null)

  useEffect(() => {
    const open = (e) => setActive(projects.find((p) => p.id === e.detail) ?? null)
    window.addEventListener('open-project', open)
    return () => window.removeEventListener('open-project', open)
  }, [])

  const close = useCallback(() => setActive(null), [])
  const nav = useCallback((dir) => setActive((cur) => {
    const i = projects.findIndex((p) => p.id === cur.id)
    return projects[(i + dir + projects.length) % projects.length]
  }), [])

  return (
    <section id="projects" data-label="Work" className="v2-work">
      {wide && !reduce ? <Horizontal onOpen={setActive} /> : <Vertical onOpen={setActive} />}
      <AnimatePresence>{active && <Drawer key="drawer" p={active} onClose={close} onNav={nav} />}</AnimatePresence>
    </section>
  )
}
