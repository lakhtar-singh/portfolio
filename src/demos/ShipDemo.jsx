import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const carriers = [
  { id: 'ups', name: 'UPS', base: 14.2, perKg: 2.1, speed: 1, prefix: '1Z' },
  { id: 'fedex', name: 'FedEx', base: 15.8, perKg: 1.8, speed: 0.8, prefix: '7712' },
  { id: 'stallion', name: 'Stallion Express', base: 9.9, perKg: 2.6, speed: 1.3, prefix: 'SE' },
]
const destinations = [
  { id: 'tor', label: 'Toronto, ON', factor: 1, days: 1 },
  { id: 'van', label: 'Vancouver, BC', factor: 2.1, days: 3 },
  { id: 'nyc', label: 'New York, US', factor: 1.6, days: 2 },
  { id: 'lon', label: 'London, UK', factor: 3.6, days: 5 },
]
const steps = ['Label created', 'Picked up in Kitchener', 'At sorting hub', 'Out for delivery', 'Delivered']

function seeded(seed) {
  let s = seed
  return () => (s = (s * 9301 + 49297) % 233280) / 233280
}

export default function ShipDemo() {
  const [weight, setWeight] = useState(2.5)
  const [dest, setDest] = useState('van')
  const [chosen, setChosen] = useState(null)
  const [stage, setStage] = useState('quote')
  const [progress, setProgress] = useState(0)
  const [serial, setSerial] = useState(4821)

  const d = destinations.find((x) => x.id === dest)
  const rates = useMemo(
    () => carriers
      .map((c) => ({ ...c, price: (c.base + c.perKg * weight) * d.factor, days: Math.max(1, Math.round(d.days * c.speed)) }))
      .sort((a, b) => a.price - b.price),
    [weight, d]
  )
  const fastest = Math.min(...rates.map((r) => r.days))
  const pick = rates.find((r) => r.id === chosen)
  const tracking = pick ? `${pick.prefix}${serial}${String(Math.round(weight * 100)).padStart(4, '0')}CA` : ''
  const bars = useMemo(() => { const r = seeded(serial); return Array.from({ length: 46 }, () => 1 + Math.floor(r() * 3)) }, [serial])

  useEffect(() => {
    if (stage !== 'track') return
    setProgress(0)
    let n = 0
    const id = setInterval(() => { n += 1; setProgress(n); if (n >= steps.length - 1) clearInterval(id) }, 900)
    return () => clearInterval(id)
  }, [stage])

  const reset = () => { setStage('quote'); setChosen(null); setSerial((s) => s + 137) }

  return (
    <div className="demo ship-demo">
      <div className="demo-controls">
        <label className="field">
          <span>Parcel weight <b className="mono">{weight.toFixed(1)} kg</b></span>
          <input id="ship-weight" type="range" min="0.5" max="20" step="0.5" value={weight} onChange={(e) => setWeight(+e.target.value)} disabled={stage !== 'quote'} />
        </label>
        <label className="field">
          <span>Ship to</span>
          <select id="ship-dest" value={dest} onChange={(e) => setDest(e.target.value)} disabled={stage !== 'quote'}>
            {destinations.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
          </select>
        </label>
      </div>

      <AnimatePresence mode="wait">
        {stage === 'quote' && (
          <motion.div key="quote" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <ul className="rate-list">
              {rates.map((r, i) => (
                <motion.li layout key={r.id} transition={{ type: 'spring', stiffness: 400, damping: 34 }}>
                  <button className={`rate ${chosen === r.id ? 'is-chosen' : ''}`} onClick={() => setChosen(r.id)} aria-pressed={chosen === r.id}>
                    <span className="rate-name">{r.name}</span>
                    <span className="rate-badges">
                      {i === 0 && <span className="badge badge-good">Cheapest</span>}
                      {r.days === fastest && <span className="badge badge-info">Fastest</span>}
                    </span>
                    <span className="rate-days mono">{r.days} day{r.days > 1 ? 's' : ''}</span>
                    <span className="rate-price mono">${r.price.toFixed(2)}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
            <button className="btn btn-accent btn-block" disabled={!chosen} onClick={() => setStage('label')}>
              {chosen ? `Create ${pick.name} label` : 'Choose a carrier'}
            </button>
          </motion.div>
        )}

        {stage === 'label' && pick && (
          <motion.div key="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="ship-label"
              initial={{ y: -60, rotate: -4, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ y: 0, rotate: 0, clipPath: 'inset(0 0 0% 0)' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="sl-head"><b>{pick.name}</b><span>{pick.days}-DAY · {weight.toFixed(1)} KG</span></div>
              <div className="sl-addr">
                <div><small>FROM</small>Warehouse 3<br />Kitchener, ON N2G 4X6</div>
                <div><small>TO</small>Customer<br />{d.label}</div>
              </div>
              <div className="sl-barcode" aria-hidden="true">{bars.map((w, i) => <i key={i} style={{ width: w * 2 }} />)}</div>
              <div className="sl-track mono">{tracking}</div>
            </motion.div>
            <div className="row-actions">
              <button className="btn btn-ghost" onClick={reset}>Start over</button>
              <button className="btn btn-accent" onClick={() => setStage('track')}>Track parcel</button>
            </div>
          </motion.div>
        )}

        {stage === 'track' && (
          <motion.div key="track" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <p className="mono muted small">{tracking} · {pick?.name}</p>
            <ol className="track-list">
              {steps.map((s, i) => (
                <li key={s} className={i <= progress ? 'is-done' : ''}>
                  <motion.span className="track-node" animate={{ scale: i === progress ? [1, 1.4, 1] : 1 }} transition={{ duration: 0.6 }} />
                  <span>{s}</span>
                  {i <= progress && <motion.span className="mono muted small" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{`Day ${Math.ceil(((i + 1) / steps.length) * (pick?.days ?? 1))}`}</motion.span>}
                </li>
              ))}
            </ol>
            <button className="btn btn-ghost btn-block" onClick={reset}>Ship another parcel</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
