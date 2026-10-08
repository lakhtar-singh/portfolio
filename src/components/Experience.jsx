import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { SectionHead } from './Fx'
import { education, experience, sectionCopy } from '../data'

const ease = [0.22, 1, 0.36, 1]

function Commit({ item, open, onToggle, index }) {
  const hasDiff = item.points.length > 0
  return (
    <motion.article
      className={`commit ${open ? 'is-open' : ''} ${item.lead ? 'is-lead' : ''}`}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease, delay: index * 0.05 }}
    >
      <span className={`commit-node ${index === 0 ? 'is-head' : ''}`} aria-hidden="true" />
      <div className="commit-meta">
        <span className="commit-hash">{item.hash}</span>
        <span className={`commit-branch ${index === 0 ? 'is-head' : ''}`}>{item.branch}</span>
        {item.current && <span className="commit-now"><i />Current</span>}
        {item.lead && <span className="commit-lead">Team lead</span>}
        <span className="commit-date">{item.dates}</span>
      </div>
      <h3 className="commit-company">{item.company}</h3>
      <p className="commit-role">{item.role} <span className="muted">· {item.place}</span></p>
      <p className="commit-summary">{item.summary}</p>
      <div className="commit-tags">{item.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
      {hasDiff && (
        <>
          <button className="diff-toggle" onClick={onToggle} aria-expanded={open}>
            <span className="mono">{open ? '− hide diff' : `+ show diff (${item.points.length} changes)`}</span>
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.ul
                className="diff"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease }}
              >
                {item.points.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ x: -12, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  >
                    <span className="diff-plus" aria-hidden="true">+</span>{p}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.article>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const [open, setOpen] = useState(() => Math.max(0, experience.findIndex((e) => e.lead)))
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 28 })

  return (
    <section id="experience" data-label={sectionCopy.experience.label} className="section experience">
      <div className="wrap">
        <SectionHead path="experience" title={sectionCopy.experience.title} accent={sectionCopy.experience.accent} intro={sectionCopy.experience.intro} />
        <div className="gitlog" ref={ref}>
          <div className="gitlog-rail" aria-hidden="true"><motion.div className="gitlog-fill" style={{ scaleY }} /></div>
          {experience.map((item, i) => (
            <Commit key={item.hash} item={item} index={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
        <motion.div
          className="edu-block"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
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
        </motion.div>
      </div>
    </section>
  )
}
