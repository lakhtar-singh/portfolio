import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import { SplitHeading } from '../components/Fx'
import { aboutMe, sectionCopy } from '../data'
import { useMediaQuery } from '../lib/useMediaQuery'

const ease = [0.22, 1, 0.36, 1]

function Count({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value])
  return <span ref={ref}>{n}{suffix}</span>
}

function Badge() {
  return (
    <div className="v2-badge" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="v2-badge-ring">
        <defs>
          <path id="v2-badge-path" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
        </defs>
        <text>
          <textPath href="#v2-badge-path">FULL-STACK DEVELOPER · TEAM LEAD · TORONTO · </textPath>
        </text>
      </svg>
      <span className="v2-badge-core">LS</span>
    </div>
  )
}

export default function AboutMe() {
  const wide = useMediaQuery('(min-width: 900px)')
  const [open, setOpen] = useState('lead')

  return (
    <section id="about" data-label={sectionCopy.about.label} className="v2-section v2-me">
      <div className="v2-wrap">
        <p className="v2-label"><span className="v2-label-bracket">(</span>About me<span className="v2-label-bracket">)</span></p>

        <div className="v2-me-top">
          <SplitHeading text={aboutMe.statement} accent={sectionCopy.about.accent} className="v2-title v2-me-statement" />
          <motion.div
            className="v2-me-bio"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
          >
            <Badge />
            <p>{aboutMe.bio}</p>
          </motion.div>
        </div>

        <motion.dl
          className="v2-facts"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        >
          {aboutMe.facts.map(([k, v]) => (
            <motion.div key={k} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </motion.div>
          ))}
        </motion.dl>

        <div className="v2-me-panels">
          {aboutMe.sides.map((side, i) => {
            const isOpen = !wide || open === side.id
            return (
              <motion.article
                key={side.id}
                className={`v2-side v2-side-${side.id} ${isOpen ? 'is-open' : ''}`}
                tabIndex={0}
                onPointerEnter={() => setOpen(side.id)}
                onFocus={() => setOpen(side.id)}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                animate={wide ? { flexGrow: open === side.id ? 1.45 : 1 } : { flexGrow: 1 }}
                transition={{ duration: 0.8, ease, delay: i * 0.1, flexGrow: { duration: 0.7, ease } }}
              >
                <span className="v2-side-ghost" aria-hidden="true">{side.ghost}</span>
                <header className="v2-side-head">
                  <span>{side.title}</span>
                  <motion.span className="v2-side-arrow" animate={{ rotate: isOpen ? 0 : -45 }} transition={{ duration: 0.5, ease }} aria-hidden="true">→</motion.span>
                </header>
                <p className="v2-side-num"><Count value={side.value} suffix={side.suffix} /></p>
                <p className="v2-side-unit">{side.unit}</p>
                <p className="v2-side-line">{side.line}</p>
                <motion.ul className="v2-side-points" animate={{ opacity: isOpen ? 1 : 0.55 }} transition={{ duration: 0.4 }}>
                  {side.points.map((pt, k) => (
                    <motion.li
                      key={pt}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + k * 0.08, ease }}
                    >
                      <span className="v2-side-mark" aria-hidden="true">✓</span>{pt}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
