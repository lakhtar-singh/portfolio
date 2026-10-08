import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { SectionHead } from './Fx'
import { skills } from '../data'

const categories = ['All', ...new Set(skills.map((s) => s.cat))]

export default function Skills() {
  const [cat, setCat] = useState('All')
  const [focus, setFocus] = useState(null)
  const gridRef = useRef(null)
  const list = useMemo(() => (cat === 'All' ? skills : skills.filter((s) => s.cat === cat)), [cat])

  const spotlight = (e) => {
    for (const tile of gridRef.current.children) {
      const r = tile.getBoundingClientRect()
      tile.style.setProperty('--mx', `${e.clientX - r.left}px`)
      tile.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
  }

  return (
    <section id="skills" data-label="Skills" className="section skills">
      <div className="wrap">
        <SectionHead
          path="skills"
          title="The full stack, and where I used it"
          accent={[1, 2]}
          intro="Front-end, back-end, data, Git, DevOps and leadership. Filter by area, then hover or focus a skill to see where I used it."
        />
        <LayoutGroup>
          <div className="tabs" role="tablist" aria-label="Skill areas">
            {categories.map((c) => {
              const count = c === 'All' ? skills.length : skills.filter((s) => s.cat === c).length
              return (
                <button key={c} role="tab" aria-selected={cat === c} className={`tab ${cat === c ? 'is-active' : ''}`} onClick={() => setCat(c)}>
                  {cat === c && <motion.span layoutId="skill-tab" className="tab-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <span className="tab-text">{c}</span>
                  <span className="tab-count">{count}</span>
                </button>
              )
            })}
          </div>

          <motion.div layout className="skill-grid" ref={gridRef} onPointerMove={spotlight}>
            <AnimatePresence mode="popLayout">
              {list.map((s, i) => (
                <motion.button
                  layout
                  key={s.name}
                  className={`skill-tile ${focus?.name === s.name ? 'is-focus' : ''}`}
                  initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 26, delay: i * 0.015 }}
                  whileTap={{ scale: 0.94 }}
                  onPointerEnter={() => setFocus(s)}
                  onFocus={() => setFocus(s)}
                  onClick={() => setFocus(s)}
                >
                  <span className="skill-abbr">{s.abbr}</span>
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-cat">{s.cat}</span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        <div className="skill-detail" aria-live="polite">
          <span className="mono prompt">$ where-used</span>
          <AnimatePresence mode="wait">
            <motion.p
              key={focus?.name ?? 'none'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {focus ? <><strong>{focus.name}</strong> {focus.note}</> : 'Pick a skill to see where I used it.'}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
