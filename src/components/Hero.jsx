import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useInView, useScroll, useTransform } from 'framer-motion'
import FieldCanvas from './FieldCanvas'
import CodeWindow from './CodeWindow'
import { Magnetic } from './Fx'
import { profile, rotatingWords, stats } from '../data'
import { scrollToId } from '../lib/scroll'

const ease = [0.22, 1, 0.36, 1]

function Letters({ text, ready, delay = 0 }) {
  return text.split('').map((ch, i) => (
    <span className="mask" key={i} aria-hidden="true">
      <motion.span
        className="hero-letter"
        initial={{ y: '115%', rotate: 8 }}
        animate={ready ? { y: '0%', rotate: 0 } : undefined}
        transition={{ delay: delay + i * 0.045, duration: 1, ease }}
        whileHover={{ y: -14, color: 'var(--amber)', transition: { type: 'spring', stiffness: 500, damping: 12 } }}
      >
        {ch}
      </motion.span>
    </span>
  ))
}

function RotatingWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % rotatingWords.length), 2200)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="rotator">
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[i]}
          initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.45, ease }}
        >
          {rotatingWords[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value])
  return <span ref={ref} className="stat-value">{n}{suffix}</span>
}

export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const show = (d) => ({ initial: { opacity: 0, y: 24 }, animate: ready ? { opacity: 1, y: 0 } : undefined, transition: { delay: d, duration: 0.8, ease } })

  return (
    <section id="top" className="hero" ref={ref}>
      <FieldCanvas />
      <div className="hero-glow" aria-hidden="true" />
      <motion.div className="hero-inner wrap" style={{ y, opacity }}>
        <motion.div className="hero-topline" {...show(0.2)}>
          <span className="status"><span className="status-dot" />{profile.status}</span>
          <span className="mono muted">{profile.location} · since 2013</span>
        </motion.div>

        <h1 className="hero-name" aria-label={profile.name}>
          <span className="hero-line"><Letters text="Lakhtar" ready={ready} delay={0.1} /></span>
          <span className="hero-line hero-line-2"><Letters text="Singh" ready={ready} delay={0.35} /><motion.span className="hero-dot" initial={{ scale: 0 }} animate={ready ? { scale: 1 } : undefined} transition={{ delay: 0.9, type: 'spring', stiffness: 300, damping: 12 }} aria-hidden="true">.</motion.span></span>
        </h1>

        <div className="hero-grid">
          <div className="hero-copy">
            <motion.p className="hero-tag" {...show(0.7)}>
              Full-stack developer and team lead, building products that feel <RotatingWord />
            </motion.p>
            <motion.p className="hero-sub" {...show(0.8)}>
              Twelve years shipping code across the whole stack, four of them leading the team. React and Vue on the front; Node, Express, Laravel, PHP and WordPress behind it; MySQL and MongoDB underneath.
            </motion.p>
            <motion.div className="hero-ctas" {...show(0.9)}>
              <Magnetic><button className="btn btn-accent" data-cursor="Go" onClick={() => scrollToId('projects')}>Try the live demos <span aria-hidden="true">↓</span></button></Magnetic>
              <Magnetic><button className="btn btn-ghost" onClick={() => scrollToId('contact')}>Get in touch</button></Magnetic>
            </motion.div>
            <motion.dl className="hero-stats" {...show(1)}>
              {stats.map((s) => (
                <div key={s.label} className="stat">
                  <dt className="sr-only">{s.label}</dt>
                  <dd><Counter value={s.value} suffix={s.suffix} /><span className="stat-label">{s.label}</span></dd>
                </div>
              ))}
            </motion.dl>
          </div>
          <motion.div
            className="hero-code"
            initial={{ opacity: 0, y: 40, rotateX: 18 }}
            animate={ready ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
            transition={{ delay: 0.8, duration: 1.1, ease }}
          >
            <CodeWindow start={ready} />
          </motion.div>
        </div>
      </motion.div>

      <motion.button className="scroll-cue" onClick={() => scrollToId('about')} aria-label="Scroll to About" {...show(1.3)}>
        <span className="scroll-cue-track"><span className="scroll-cue-thumb" /></span>
        <span className="mono">scroll</span>
      </motion.button>
    </section>
  )
}
