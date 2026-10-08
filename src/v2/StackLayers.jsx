import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionHeadV2 } from './Shared'
import { skillCategories, skills } from '../data'

const ease = [0.22, 1, 0.36, 1]
const order = ['Leadership', 'Frontend', 'Backend', 'Data', 'Git & workflow', 'Cloud & DevOps', 'Practices']

export default function StackLayers() {
  const [active, setActive] = useState('Frontend')
  const [open, setOpen] = useState(false)
  const [skill, setSkill] = useState(null)
  const cat = skillCategories.find((c) => c.id === active)
  const list = skills.filter((s) => s.cat === active)
  const pick = (c) => { setActive(c); setSkill(null) }

  return (
    <section id="skills" data-label="Stack" className="v2-section v2-stack">
      <div className="v2-wrap">
        <SectionHeadV2
          label="Stack"
          title="The full stack, layer by layer."
          accent={[1, 2]}
          intro={`${skills.length} skills across seven layers, from leading the team down to the habits under everything. Hover the stack or pick a layer.`}
        />
        <div className="v2-stack-grid">
          <div className="v2-iso-wrap" onPointerEnter={() => setOpen(true)} onPointerLeave={() => setOpen(false)}>
            <div className={`v2-iso ${open ? 'is-open' : ''}`}>
              {order.map((c, i) => (
                <button
                  key={c}
                  className={`v2-plate ${active === c ? 'is-active' : ''}`}
                  style={{ '--z': order.length - 1 - i }}
                  onPointerEnter={() => pick(c)}
                  onClick={() => pick(c)}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <span>{c}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="v2-stack-detail">
            <div className="v2-layer-tabs" role="tablist" aria-label="Stack layers">
              {order.map((c) => (
                <button key={c} role="tab" aria-selected={active === c} className={active === c ? 'is-on' : ''} onClick={() => pick(c)}>
                  {c}<span>{skills.filter((s) => s.cat === c).length}</span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="v2-layer-body"
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } }, exit: { opacity: 0, transition: { duration: 0.15 } } }}
              >
                <motion.h3 variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } } }}>{active}</motion.h3>
                <motion.p className="v2-layer-blurb" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>{cat?.blurb}</motion.p>
                <ul className="v2-skill-list">
                  {list.map((s) => (
                    <motion.li key={s.name} variants={{ hidden: { opacity: 0, y: 14, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 380, damping: 26 } } }}>
                      <button className={skill?.name === s.name ? 'is-on' : ''} onPointerEnter={() => setSkill(s)} onFocus={() => setSkill(s)} onClick={() => setSkill(s)}>
                        <span className="v2-abbr">{s.abbr}</span>{s.name}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            <div className="v2-skill-note" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.p key={skill?.name ?? 'none'} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                  {skill ? <><b>{skill.name}.</b> {skill.note}</> : 'Hover or tap a skill to see where I used it.'}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
