import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { SectionHead, Reveal } from './Fx'
import { education, marqueeBottom, marqueeTop } from '../data'

const story =
  'I started writing *PHP* in 2013 and haven’t stopped shipping since. Today I work across the *whole* *stack:* *React* and *Vue* interfaces, *Node,* *Express* and *Laravel* APIs, *WordPress* builds and the *MySQL* or *MongoDB* data underneath. For four years I *led* the team doing it, from sprint planning and pull request reviews to CI/CD pipelines that ship every merge to AWS.'

function Word({ children, progress, range, accent }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const y = useTransform(progress, range, [6, 0])
  return <motion.span className={`sw ${accent ? 'accent-word' : ''}`} style={{ opacity, y }}>{children}</motion.span>
}

function ScrollWords() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 50%'] })
  const words = story.split(' ')
  return (
    <p ref={ref} className="about-lead" aria-label={story.replaceAll('*', '')}>
      {words.map((w, i) => {
        const start = i / words.length
        const accent = w.includes('*')
        return (
          <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]} accent={accent}>
            {w.replaceAll('*', '')}
          </Word>
        )
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

export default function About() {
  return (
    <section id="about" data-label="About" className="section about">
      <div className="wrap">
        <SectionHead path="about" title="A full-stack developer who sweats the details" accent={[1]} />
        <div className="about-grid">
          <ScrollWords />
          <aside className="about-side">
            <Reveal className="about-card">
              <p className="card-label">Now</p>
              <p>Senior Full-Stack Developer at Tags for Hope since August 2025. Open to full-stack and team lead roles in Toronto or remote.</p>
            </Reveal>
            <Reveal className="about-card" delay={0.1}>
              <p className="card-label">Education</p>
              <ul className="edu-list">
                {education.map((e) => (
                  <li key={e.school}>
                    <strong>{e.program}</strong>
                    <span>{e.school}, {e.place}</span>
                    <span className="mono muted">{e.dates}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </div>
      <div className="marquees">
        <VelocityRow items={marqueeTop} baseVelocity={-2.2} />
        <VelocityRow items={marqueeBottom} baseVelocity={2.2} outline />
      </div>
    </section>
  )
}
