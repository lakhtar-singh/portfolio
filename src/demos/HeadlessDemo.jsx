import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const themes = [
  { name: 'Amber', bg: '#FFB454', ink: '#2a1a00' },
  { name: 'Mint', bg: '#7DD3C0', ink: '#06261f' },
  { name: 'Rose', bg: '#FF7A6B', ink: '#2b0702' },
]
const pipeline = ['Saved in WordPress', 'WPGraphQL query', 'Edge cache purged', 'Live on site']
const initial = { title: 'Spring stationery sale', promo: 'Up to 40% off notebooks and pens this week.', cta: 'Shop the sale', theme: 0, banner: true }

export default function HeadlessDemo() {
  const [draft, setDraft] = useState(initial)
  const [live, setLive] = useState(initial)
  const [step, setStep] = useState(-1)
  const dirty = JSON.stringify(draft) !== JSON.stringify(live)
  const set = (k) => (e) => setDraft((d) => ({ ...d, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const publish = () => {
    setStep(0)
    pipeline.forEach((_, i) => setTimeout(() => {
      setStep(i)
      if (i === pipeline.length - 1) setLive(draft)
    }, i * 520))
    setTimeout(() => setStep(-1), pipeline.length * 520 + 1400)
  }

  const t = themes[live.theme]
  return (
    <div className="demo headless-demo">
      <div className="hl-grid">
        <div className="wp-panel">
          <div className="wp-head mono"><span>WordPress · Edit page</span>{dirty && <span className="badge badge-warn">Unpublished</span>}</div>
          <label className="field"><span>Headline</span><input id="hl-title" value={draft.title} onChange={set('title')} /></label>
          <label className="field"><span>Promo text</span><textarea id="hl-promo" rows="2" value={draft.promo} onChange={set('promo')} /></label>
          <label className="field"><span>Button label</span><input id="hl-cta" value={draft.cta} onChange={set('cta')} /></label>
          <div className="field">
            <span>Banner colour</span>
            <div className="swatches">
              {themes.map((th, i) => (
                <button key={th.name} className={`swatch ${draft.theme === i ? 'is-on' : ''}`} style={{ background: th.bg }} onClick={() => setDraft((d) => ({ ...d, theme: i }))} aria-label={th.name} aria-pressed={draft.theme === i} />
              ))}
            </div>
          </div>
          <label className="check-field"><input id="hl-banner" type="checkbox" checked={draft.banner} onChange={set('banner')} /> Show promo banner</label>
          <button className="btn btn-accent btn-block" onClick={publish} disabled={!dirty || step >= 0}>{step >= 0 ? 'Publishing…' : 'Publish'}</button>
        </div>

        <div className="site-panel">
          <div className="browser-bar mono"><span className="dots"><i /><i /><i /></span><span className="url">shop.example.com</span></div>
          <div className="site-body">
            <AnimatePresence>
              {live.banner && (
                <motion.div className="site-banner" style={{ background: t.bg, color: t.ink }} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <span>{live.promo}</span>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.h4 key={live.title} className="site-title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>{live.title}</motion.h4>
            <div className="site-products">{[0, 1, 2].map((i) => <span key={i} />)}</div>
            <motion.span key={live.cta + live.theme} className="site-cta" style={{ background: t.bg, color: t.ink }} initial={{ scale: 0.9 }} animate={{ scale: 1 }}>{live.cta}</motion.span>
          </div>
        </div>
      </div>
      <ol className="pipeline">
        {pipeline.map((p, i) => (
          <li key={p} className={step >= i ? 'is-on' : ''}>
            <motion.span className="pipe-dot" animate={step === i ? { scale: [1, 1.5, 1] } : { scale: 1 }} />
            <span>{p}</span>
          </li>
        ))}
      </ol>
      <p className="small muted">Edit the page on the left. The live site only changes when you publish, with no rebuild.</p>
    </div>
  )
}
