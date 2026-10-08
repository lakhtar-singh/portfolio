import { useState } from 'react'
import { motion } from 'framer-motion'
import { copyText } from '../lib/events'

export default function AtlasDemo() {
  const [hue, setHue] = useState(32)
  const [radius, setRadius] = useState(12)
  const [dense, setDense] = useState(false)
  const [dark, setDark] = useState(true)
  const [on, setOn] = useState(true)
  const [progress] = useState(68)

  const tokens = {
    '--ds-accent': `hsl(${hue} 92% 62%)`,
    '--ds-accent-ink': `hsl(${hue} 60% 14%)`,
    '--ds-radius': `${radius}px`,
    '--ds-pad': dense ? '6px 12px' : '11px 18px',
    '--ds-gap': dense ? '8px' : '14px',
    '--ds-bg': dark ? `hsl(${hue} 18% 10%)` : `hsl(${hue} 30% 97%)`,
    '--ds-surface': dark ? `hsl(${hue} 16% 15%)` : '#ffffff',
    '--ds-text': dark ? `hsl(${hue} 20% 92%)` : `hsl(${hue} 25% 14%)`,
    '--ds-muted': dark ? `hsl(${hue} 10% 62%)` : `hsl(${hue} 10% 42%)`,
    '--ds-line': dark ? `hsl(${hue} 14% 24%)` : `hsl(${hue} 20% 88%)`,
  }
  const code = `:root {\n${Object.entries(tokens).map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}`

  return (
    <div className="demo atlas-demo">
      <div className="demo-controls atlas-controls">
        <label className="field">
          <span>Accent hue <b className="mono">{hue}°</b></span>
          <input id="atlas-hue" type="range" min="0" max="360" value={hue} onChange={(e) => setHue(+e.target.value)} className="hue-range" />
        </label>
        <label className="field">
          <span>Corner radius <b className="mono">{radius}px</b></span>
          <input id="atlas-radius" type="range" min="0" max="28" value={radius} onChange={(e) => setRadius(+e.target.value)} />
        </label>
        <div className="seg" role="group" aria-label="Density">
          <button className={!dense ? 'is-on' : ''} onClick={() => setDense(false)}>Comfortable</button>
          <button className={dense ? 'is-on' : ''} onClick={() => setDense(true)}>Compact</button>
        </div>
        <div className="seg" role="group" aria-label="Preview theme">
          <button className={dark ? 'is-on' : ''} onClick={() => setDark(true)}>Dark</button>
          <button className={!dark ? 'is-on' : ''} onClick={() => setDark(false)}>Light</button>
        </div>
      </div>

      <motion.div className="ds-preview" style={tokens} layout>
        <div className="ds-row">
          <button className="ds-btn">Primary</button>
          <button className="ds-btn ds-secondary">Secondary</button>
          <button className="ds-btn ds-ghost">Ghost</button>
        </div>
        <div className="ds-row">
          <label className="ds-field" htmlFor="ds-email">
            <span>Work email</span>
            <input id="ds-email" placeholder="you@company.com" />
          </label>
          <button className={`ds-switch ${on ? 'is-on' : ''}`} onClick={() => setOn((o) => !o)} role="switch" aria-checked={on} aria-label="Notifications">
            <motion.span layout transition={{ type: 'spring', stiffness: 600, damping: 32 }} />
          </button>
        </div>
        <div className="ds-card">
          <span className="ds-avatar">LS</span>
          <div>
            <strong>Release 2.4 is ready</strong>
            <p>12 components updated. Review the changelog before publishing.</p>
            <div className="ds-progress"><span style={{ width: `${progress}%` }} /></div>
          </div>
          <span className="ds-badge">New</span>
        </div>
      </motion.div>

      <div className="token-code">
        <div className="serial-head mono"><span>tokens.css</span><button className="link-btn" onClick={() => copyText(code, 'Tokens copied')}>Copy</button></div>
        <pre className="mono">{code}</pre>
      </div>
    </div>
  )
}
