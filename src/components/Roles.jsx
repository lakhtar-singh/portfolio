import { useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { SectionHead, Tilt } from './Fx'
import { roles } from '../data'

const ease = [0.22, 1, 0.36, 1]
const order = ['lead', 'dev']

export default function Roles() {
  const [mode, setMode] = useState('lead')
  const role = roles[mode]

  return (
    <section id="leadership" data-label="Lead & build" className="section roles">
      <div className="wrap">
        <SectionHead
          path="leadership"
          title="Team lead first, full-stack developer always"
          accent={[0, 1]}
          intro="I’ve run the team and written the code. Switch between the two hats to see what each one looks like day to day."
        />

        <LayoutGroup>
          <div className="role-switch" role="tablist" aria-label="Role">
            {order.map((k) => (
              <button key={k} role="tab" aria-selected={mode === k} className={`role-tab ${mode === k ? 'is-active' : ''}`} onClick={() => setMode(k)}>
                {mode === k && <motion.span layoutId="role-pill" className="role-pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                <span className="role-tab-text">{roles[k].label}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } }, exit: { transition: { staggerChildren: 0.02 } } }}
          >
            <motion.p
              className="role-summary"
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } }, exit: { opacity: 0, y: -10 } }}
            >
              {role.summary}
            </motion.p>
            <div className="role-grid">
              {role.items.map((item) => (
                <motion.div
                  key={item.title}
                  variants={{
                    hidden: { opacity: 0, y: 30, rotateX: -12 },
                    show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease } },
                    exit: { opacity: 0, y: -16, transition: { duration: 0.2 } },
                  }}
                >
                  <Tilt className="role-card" max={6}>
                    <span className="role-cmd mono"><span className="prompt">$</span> {item.cmd}</span>
                    <h3 className="role-title">{item.title}</h3>
                    <p className="role-text">{item.text}</p>
                    <span className="role-where mono">{item.where}</span>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
