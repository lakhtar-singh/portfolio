import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { SectionHead, Tilt } from './Fx'
import Preview from './Preview'
import { projects, kindLabel, kindClass, sectionCopy } from '../data'
import { demos } from '../demos'
import { lockScroll } from '../lib/scroll'


const filters = ['All', 'Full-stack', 'Shipped', 'Lab']

/** Column spans on a 6-column grid so every row is full. */
export function spansFor(n) {
  if (n <= 0) return []
  if (n === 1) return [6]
  if (n % 3 === 0) return Array(n).fill(2)
  if (n % 2 === 0) return Array(n).fill(3)
  return [4, 2, ...spansFor(n - 2)]
}
const ease = [0.22, 1, 0.36, 1]

function ProjectCard({ p, onOpen, index, span, hero }) {
  return (
    <motion.div
      layout
      className={`project-cell ${hero ? 'is-hero' : ''}`}
      style={{ '--span': span }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease, delay: (index % 3) * 0.08 }}
    >
      <Tilt className="project-card" max={6} data-cursor="Open" onClick={() => onOpen(p)}>
        <div className="project-preview"><Preview kind={p.demo} /></div>
        <div className="project-info">
          <div className="project-row">
            <span className={`kind ${kindClass(p.kind)}`}>{kindLabel[p.kind]}</span>
            <span className="project-arrow" aria-hidden="true">↗</span>
          </div>
          <h3 className="project-title">{p.title}</h3>
          <p className="project-tagline">{p.tagline}</p>
          <div className="project-stack">{p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
          <button className="project-open" onClick={(e) => { e.stopPropagation(); onOpen(p) }}>
            Open live demo<span className="sr-only">: {p.title}</span>
          </button>
        </div>
      </Tilt>
    </motion.div>
  )
}

function ProjectModal({ p, onClose, onNav }) {
  const Demo = demos[p.demo]
  const closeRef = useRef(null)

  useEffect(() => {
    lockScroll(true)
    const prev = document.activeElement
    closeRef.current?.focus()
    const key = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && e.altKey) onNav(1)
      if (e.key === 'ArrowLeft' && e.altKey) onNav(-1)
    }
    window.addEventListener('keydown', key)
    return () => { lockScroll(false); window.removeEventListener('keydown', key); prev?.focus?.() }
  }, [onClose, onNav])

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        data-lenis-prevent
        initial={{ y: 80, scale: 0.94, opacity: 0, clipPath: 'inset(10% 6% 10% 6% round 28px)' }}
        animate={{ y: 0, scale: 1, opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
        exit={{ y: 60, scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.6, ease }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-head">
          <div>
            <span className={`kind ${kindClass(p.kind)}`}>{kindLabel[p.kind]}</span>
            <h3 id="modal-title" className="modal-title">{p.title}</h3>
          </div>
          <div className="modal-actions">
            <button className="icon-btn" onClick={() => onNav(-1)} aria-label="Previous project">←</button>
            <button className="icon-btn" onClick={() => onNav(1)} aria-label="Next project">→</button>
            <button ref={closeRef} className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
          </div>
        </header>
        <AnimatePresence mode="wait">
          <motion.div
            key={p.id}
            className="modal-body"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease }}
          >
            <aside className="modal-info">
              <p className="modal-about">{p.about}</p>
              <p className="card-label">What it does</p>
              <ul className="built-list">{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
              <p className="card-label">Stack</p>
              <div className="project-stack">{p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
              <p className="modal-note mono">All data in the demo is sample data.</p>
            </aside>
            <div className="demo-frame">
              <div className="demo-label"><span className="live-dot" />Live demo, try it</div>
              <Suspense fallback={<div className="demo-loading mono">Loading demo…</div>}>
                <Demo />
              </Suspense>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)
  const list = filter === 'All' ? projects : projects.filter((p) => p.kind === filter)
  const spans = spansFor(list.length)

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
    <section id="projects" data-label={sectionCopy.projects.label} className="section projects">
      <div className="wrap">
        <SectionHead path="projects" title={sectionCopy.projects.title} accent={sectionCopy.projects.accent} intro={sectionCopy.projects.intro} />
        <LayoutGroup>
          <div className="tabs" role="tablist" aria-label="Project filter">
            {filters.map((f) => (
              <button key={f} role="tab" aria-selected={filter === f} className={`tab ${filter === f ? 'is-active' : ''}`} onClick={() => setFilter(f)}>
                {filter === f && <motion.span layoutId="project-tab" className="tab-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="tab-text">{f}</span>
                <span className="tab-count">{f === 'All' ? projects.length : projects.filter((p) => p.kind === f).length}</span>
              </button>
            ))}
          </div>
          <motion.div layout className="project-grid">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => <ProjectCard key={p.id} p={p} index={i} span={spans[i]} hero={spans[i] === 4} onOpen={setActive} />)}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
      <AnimatePresence>{active && <ProjectModal key="modal" p={active} onClose={close} onNav={nav} />}</AnimatePresence>
    </section>
  )
}
