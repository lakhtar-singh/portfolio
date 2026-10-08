import { motion } from 'framer-motion'
import { SplitHeading } from '../components/Fx'

const ease = [0.22, 1, 0.36, 1]

export function SectionHeadV2({ label, title, accent = [], intro }) {
  return (
    <header className="v2-head">
      <motion.p
        className="v2-label"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
      >
        <span className="v2-label-bracket">(</span>{label}<span className="v2-label-bracket">)</span>
      </motion.p>
      <SplitHeading text={title} accent={accent} className="v2-title" />
      {intro && (
        <motion.p
          className="v2-intro"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          {intro}
        </motion.p>
      )}
    </header>
  )
}
