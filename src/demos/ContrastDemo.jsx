import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const hexToRgb = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
const rgbToHex = (r, g, b) => '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')
const lum = (hex) => {
  const [r, g, b] = hexToRgb(hex).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const ratio = (a, b) => { const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x); return (l1 + 0.05) / (l2 + 0.05) }

function rgbToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4
    h /= 6
  }
  return [h, s, l]
}
function hslToHex(h, s, l) {
  const f = (n) => { const k = (n + h * 12) % 12; const a = s * Math.min(l, 1 - l); return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)) }
  return rgbToHex(f(0) * 255, f(8) * 255, f(4) * 255)
}

const checks = [
  { id: 'aa', label: 'AA', sub: 'Body text', min: 4.5 },
  { id: 'aal', label: 'AA', sub: 'Large text', min: 3 },
  { id: 'aaa', label: 'AAA', sub: 'Body text', min: 7 },
  { id: 'aaal', label: 'AAA', sub: 'Large text', min: 4.5 },
]

export default function ContrastDemo() {
  const [fg, setFg] = useState('#8a9aa6')
  const [bg, setBg] = useState('#f4f7f6')
  const r = useMemo(() => ratio(fg, bg), [fg, bg])

  const fix = (target = 4.6) => {
    const [h, s, l0] = rgbToHsl(hexToRgb(fg))
    const darker = lum(bg) > 0.18
    let l = l0, out = fg
    for (let i = 0; i < 100 && ratio(out, bg) < target; i++) {
      l = darker ? Math.max(0, l - 0.01) : Math.min(1, l + 0.01)
      out = hslToHex(h, s, l)
    }
    setFg(out)
  }

  return (
    <div className="demo contrast-demo">
      <div className="demo-controls">
        <label className="color-field">
          <input id="contrast-fg" type="color" value={fg} onChange={(e) => setFg(e.target.value)} />
          <span><small>Text</small><b className="mono">{fg}</b></span>
        </label>
        <button className="icon-btn" onClick={() => { setFg(bg); setBg(fg) }} aria-label="Swap colours">⇄</button>
        <label className="color-field">
          <input id="contrast-bg" type="color" value={bg} onChange={(e) => setBg(e.target.value)} />
          <span><small>Background</small><b className="mono">{bg}</b></span>
        </label>
      </div>

      <motion.div className="contrast-preview" animate={{ backgroundColor: bg, color: fg }} transition={{ duration: 0.4 }}>
        <p className="cp-big">Big headline, 24px bold</p>
        <p>Body copy at 16px. Readers with low vision need at least 4.5:1 here to read this comfortably.</p>
      </motion.div>

      <div className="ratio-row">
        <div className="ratio">
          <AnimatePresence mode="popLayout">
            <motion.span key={r.toFixed(2)} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="ratio-num mono">
              {r.toFixed(2)}
            </motion.span>
          </AnimatePresence>
          <span className="mono muted">: 1</span>
        </div>
        <div className="check-grid">
          {checks.map((c) => {
            const pass = r >= c.min
            return (
              <motion.div key={c.id} className={`check ${pass ? 'is-pass' : 'is-fail'}`} animate={{ scale: [0.96, 1] }} transition={{ duration: 0.3 }}>
                <b>{c.label}</b><span>{c.sub}</span><em>{pass ? 'Pass' : 'Fail'}</em>
              </motion.div>
            )
          })}
        </div>
      </div>
      <div className="row-actions">
        <button className="btn btn-accent" onClick={() => fix(4.6)} disabled={r >= 4.5}>{r >= 4.5 ? 'Passes AA' : 'Fix text colour for AA'}</button>
        <button className="btn btn-ghost" onClick={() => fix(7.1)} disabled={r >= 7}>Push to AAA</button>
        <button className="link-btn small" onClick={() => { setFg('#8a9aa6'); setBg('#f4f7f6') }}>Reset</button>
      </div>
    </div>
  )
}
