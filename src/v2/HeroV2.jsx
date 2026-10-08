import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { Magnetic } from '../components/Fx'
import { heroFacts, profile, stats } from '../data'
import DesignSwitch from '../components/DesignSwitch'
import { scrollToId } from '../lib/scroll'
import { useMediaQuery } from '../lib/useMediaQuery'

const ease = [0.22, 1, 0.36, 1]
const front = ['Full-stack', 'developer', '& team lead.']
const under = ['React, Vue,', 'Node, PHP,', 'SQL & Git.']

function Lines({ lines, ready, delay = 0 }) {
  return lines.map((l, i) => (
    <span className="v2-line" key={l}>
      <motion.span
        initial={{ y: '105%' }}
        animate={ready ? { y: '0%' } : undefined}
        transition={{ duration: 1, delay: delay + i * 0.1, ease }}
      >
        {l}
      </motion.span>
    </span>
  ))
}

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value])
  return <b ref={ref}>{n}{suffix}</b>
}

export default function HeroV2({ ready }) {
  const finePointer = useMediaQuery('(pointer: fine)')
  const box = useRef(null)
  const mx = useMotionValue(-400)
  const my = useMotionValue(-400)
  const r = useSpring(0, { stiffness: 170, damping: 22 })
  const clip = useMotionTemplate`circle(${r}px at ${mx}px ${my}px)`

  // Touch screens get a lens that drifts on its own.
  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf
    r.set(70)
    const loop = (t) => {
      const el = box.current
      if (el) {
        const w = el.offsetWidth, h = el.offsetHeight
        mx.set(w * (0.5 + 0.38 * Math.sin(t / 1700)))
        my.set(h * (0.5 + 0.32 * Math.sin(t / 1100)))
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [mx, my, r])

  const move = (e) => {
    if (e.pointerType !== 'mouse') return
    const rect = box.current.getBoundingClientRect()
    mx.set(e.clientX - rect.left)
    my.set(e.clientY - rect.top)
    r.set(Math.min(170, rect.width * 0.18))
  }

  const show = (d) => ({ initial: { opacity: 0, y: 20 }, animate: ready ? { opacity: 1, y: 0 } : undefined, transition: { duration: 0.8, delay: d, ease } })

  return (
    <section id="top" className="v2-hero">
      <motion.header className="v2-topbar v2-wrap" {...show(0.1)}>
        <a href={import.meta.env.BASE_URL} className="v2-logo"><span>LS</span>Lakhtar Singh</a>
        <div className="v2-topbar-right">
          <span className="v2-status"><i />{profile.status}</span>
          <DesignSwitch className="v2-switch" />
        </div>
      </motion.header>

      <div className="v2-wrap v2-hero-body">
        <motion.p className="v2-kicker" {...show(0.3)}>
          <span className="v2-label-bracket">(</span>Full-stack developer · Team lead · {profile.location}<span className="v2-label-bracket">)</span>
        </motion.p>

        <div className="v2-xray" ref={box} onPointerMove={move} onPointerLeave={() => r.set(0)} data-cursor>
          <h1 className="v2-hero-title" aria-label="Full-stack developer and team lead.">
            <Lines lines={front} ready={ready} delay={0.2} />
          </h1>
          <motion.div className="v2-xray-layer" style={{ clipPath: clip, WebkitClipPath: clip }} aria-hidden="true">
            <p className="v2-hero-title">{under.map((l) => <span className="v2-line" key={l}><span>{l}</span></span>)}</p>
          </motion.div>
        </div>

        <div className="v2-hero-foot">
          <motion.div className="v2-hero-copy" {...show(0.7)}>
            <p className="v2-hero-intro">{profile.intro}</p>
            <p className="v2-hero-stack">{profile.stackLine}</p>
            <div className="v2-ctas">
              <Magnetic><button className="v2-btn" onClick={() => scrollToId('projects')}>Run the demos <span aria-hidden="true">→</span></button></Magnetic>
              <Magnetic><button className="v2-btn v2-btn-ghost" onClick={() => scrollToId('contact')}>Start a conversation</button></Magnetic>
            </div>
            <p className="v2-hint">{finePointer ? 'Move your cursor over the headline to see the stack underneath.' : 'The blue lens shows the stack underneath the headline.'}</p>
          </motion.div>

          <motion.dl className="v2-spec" {...show(0.85)}>
            {heroFacts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            <div className="v2-spec-stats">
              {stats.map((s) => (
                <span key={s.label}><Counter value={s.value} suffix={s.suffix} />{s.label}</span>
              ))}
            </div>
          </motion.dl>
        </div>
      </div>
    </section>
  )
}
