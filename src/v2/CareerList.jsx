import { useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { SectionHeadV2 } from './Shared'
import { education, experience } from '../data'

const ease = [0.22, 1, 0.36, 1]

export default function CareerList() {
  const [open, setOpen] = useState(() => Math.max(0, experience.findIndex((e) => e.lead)))
  const [hover, setHover] = useState(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 30 })
  const sy = useSpring(y, { stiffness: 300, damping: 30 })
  const h = hover != null ? experience[hover] : null

  const move = (e) => {
    if (e.pointerType !== 'mouse') return
    x.set(e.clientX + 24)
    y.set(e.clientY + 24)
  }

  return (
    <section id="experience" data-label="Career" className="v2-section v2-career">
      <div className="v2-wrap">
        <SectionHeadV2
          label="Career"
          title="Twelve years, five companies, one team led."
          accent={[5, 6]}
          intro="Newest first. Open a row to see what I owned there."
        />
        <ul className="v2-rows" onPointerMove={move} onPointerLeave={() => setHover(null)}>
          {experience.map((e, i) => (
            <motion.li
              key={e.hash}
              className={`v2-row ${open === i ? 'is-open' : ''} ${e.lead ? 'is-lead' : ''}`}
              onPointerEnter={(ev) => ev.pointerType === 'mouse' && setHover(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.7, ease, delay: i * 0.04 }}
            >
              <button className="v2-row-head" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span className="v2-row-dates">{e.dates}</span>
                <span className="v2-row-company">{e.company}{e.current && <span className="v2-now-badge"><i />Current</span>}{e.lead && <span className="v2-lead-badge">Team lead</span>}</span>
                <span className="v2-row-role">{e.role}</span>
                <span className="v2-row-plus" aria-hidden="true">+</span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    className="v2-row-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.55, ease }}
                  >
                    <div className="v2-row-inner">
                      <p className="v2-row-summary">{e.summary}</p>
                      {e.points.length > 0 && (
                        <ul className="v2-row-points">
                          {e.points.map((p, k) => (
                            <motion.li key={p} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + k * 0.04 }}>{p}</motion.li>
                          ))}
                        </ul>
                      )}
                      <div className="v2-chips">{e.tags.map((t) => <span key={t}>{t}</span>)}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>

        <div className="v2-edu">
          <p className="v2-label"><span className="v2-label-bracket">(</span>Education<span className="v2-label-bracket">)</span></p>
          {education.map((ed) => (
            <div key={ed.school} className="v2-edu-row">
              <span className="v2-row-dates">{ed.dates}</span>
              <b>{ed.program}</b>
              <span>{ed.school}, {ed.place}</span>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        className="v2-follow"
        style={{ x: sx, y: sy }}
        animate={{ opacity: h ? 1 : 0, scale: h ? 1 : 0.7 }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      >
        {h && <><b>{h.place}</b><span>{h.tags.slice(0, 4).join(' · ')}</span></>}
      </motion.div>
    </section>
  )
}
