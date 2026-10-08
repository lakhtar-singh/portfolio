import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, animate, motion, useAnimationFrame, useInView, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { SectionHead, Reveal } from './Fx'
import { aboutMe, marqueeBottom, marqueeTop, sectionCopy } from '../data'

const ease = [0.22, 1, 0.36, 1]
const highlight = new Set(['senior', 'full-stack', '2013', 'four', 'leading'])

function Word({ children, progress, range, accent }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const y = useTransform(progress, range, [6, 0])
  return <motion.span className={`sw ${accent ? 'accent-word' : ''}`} style={{ opacity, y }}>{children}</motion.span>
}

function ScrollWords({ text }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className="about-lead" aria-label={text}>
      {words.map((w, i) => {
        const start = i / words.length
        const accent = highlight.has(w.toLowerCase().replace(/[^a-z0-9-]/g, ''))
        return <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]} accent={accent}>{w}</Word>
      })}
    </p>
  )
}

const wrap = (min, max, v) => { const r = max - min; return ((((v - min) % r) + r) % r) + min }

function VelocityRow({ items, baseVelocity, outline }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false })
  const skew = useTransform(smooth, [-2000, 2000], [8, -8])
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`)
  const dir = useRef(1)
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let moveBy = dir.current * baseVelocity * (delta / 1000)
    if (factor.get() < 0) dir.current = -1
    else if (factor.get() > 0) dir.current = 1
    moveBy += dir.current * moveBy * factor.get()
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className={`marquee ${outline ? 'is-outline' : ''}`} aria-hidden="true">
      <motion.div className="marquee-track" style={{ x, skewX: skew }}>
        {[0, 1, 2, 3].map((k) => (
          <span className="marquee-group" key={k}>
            {items.map((t) => <span className="marquee-item" key={t}>{t}<i>✦</i></span>)}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/** Tech ribbons between the hero and the first section. */
export function Marquees() {
  return (
    <div className="marquees">
      <VelocityRow items={marqueeTop} baseVelocity={-2.2} />
      <VelocityRow items={marqueeBottom} baseVelocity={2.2} outline />
    </div>
  )
}

function Count({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.2, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value])
  return <span ref={ref}>{n}{suffix}</span>
}

function SideSwitch() {
  const [mode, setMode] = useState(aboutMe.sides[0].id)
  const side = aboutMe.sides.find((s) => s.id === mode)
  return (
    <div className="sides">
      <LayoutGroup>
        <div className="role-switch" role="tablist" aria-label="Role">
          {aboutMe.sides.map((s) => (
            <button key={s.id} role="tab" aria-selected={mode === s.id} className={`role-tab ${mode === s.id ? 'is-active' : ''}`} onClick={() => setMode(s.id)}>
              {mode === s.id && <motion.span layoutId="role-pill" className="role-pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              <span className="role-tab-text">{s.title}</span>
            </button>
          ))}
        </div>
      </LayoutGroup>
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          className={`side-panel side-${mode}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.45, ease }}
        >
          <span className="side-ghost" aria-hidden="true">{side.ghost}</span>
          <div className="side-figure">
            <span className="side-num"><Count value={side.value} suffix={side.suffix} /></span>
            <span className="side-unit">{side.unit}</span>
          </div>
          <div className="side-body">
            <p className="side-line">{side.line}</p>
            <ul className="side-points">
              {side.points.map((pt, k) => (
                <motion.li key={pt} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + k * 0.07, duration: 0.4, ease }}>
                  <span className="side-mark" aria-hidden="true">✓</span>{pt}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" data-label={sectionCopy.about.label} className="section about">
      <div className="wrap">
        <SectionHead path="about" title={aboutMe.statement} accent={sectionCopy.about.accent} />
        <div className="about-grid">
          <ScrollWords text={aboutMe.bio} />
          <aside className="about-side">
            <Reveal className="about-card">
              <p className="card-label">At a glance</p>
              <dl className="fact-list">
                {aboutMe.facts.map(([k, v]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
            </Reveal>
          </aside>
        </div>
        <SideSwitch />
      </div>
    </section>
  )
}
