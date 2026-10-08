import { scrollToTop } from '../lib/scroll'
import { openPalette } from '../lib/events'
import { switchDesign } from '../lib/designSwitch'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p className="footer-big" aria-hidden="true">Lakhtar Singh</p>
        <div className="footer-row">
          <span>© {new Date().getFullYear()} Lakhtar Singh. Built with React, Framer Motion and Lenis.</span>
          <span className="footer-actions">
            <button className="link-btn" onClick={(e) => switchDesign(e.currentTarget)}>Switch to the light design</button>
            <button className="link-btn" onClick={openPalette}>Command menu</button>
            <button className="link-btn" onClick={scrollToTop}>Back to top ↑</button>
          </span>
        </div>
      </div>
    </footer>
  )
}
