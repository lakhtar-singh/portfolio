import { motion } from 'framer-motion'
import { scrollToTop } from '../lib/scroll'
import { openPalette } from '../lib/events'

export default function FooterV2() {
  return (
    <footer className="v2-footer">
      <div className="v2-wrap">
        <motion.p
          className="v2-footer-name"
          initial={{ y: '40%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          Lakhtar Singh
        </motion.p>
        <div className="v2-footer-row">
          <span>© {new Date().getFullYear()} Lakhtar Singh · Full-stack developer · Toronto</span>
          <span className="v2-footer-links">
            <button onClick={openPalette}>Command menu</button>
            <button onClick={scrollToTop}>Back to top ↑</button>
          </span>
        </div>
      </div>
    </footer>
  )
}
