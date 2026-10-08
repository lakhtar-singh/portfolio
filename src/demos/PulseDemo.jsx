import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useSpring, useTransform } from 'framer-motion'

const W = 600, H = 200, N = 48
const eventTypes = [
  ['order', 'New order from Calgary, AB'],
  ['deploy', 'Deploy web@4f1c2a finished'],
  ['order', 'New order from Halifax, NS'],
  ['alert', 'p95 latency above 180 ms'],
  ['user', '32 users joined from a newsletter link'],
  ['order', 'New order from Toronto, ON'],
  ['cache', 'CDN cache revalidated /products'],
]

function Num({ value, format }) {
  const mv = useSpring(value, { stiffness: 90, damping: 20 })
  useEffect(() => { mv.set(value) }, [mv, value])
  const text = useTransform(mv, format)
  return <motion.span>{text}</motion.span>
}

const walk = (v) => Math.max(18, Math.min(92, v + (Math.random() - 0.5) * 16))

export default function PulseDemo() {
  const [data, setData] = useState(() => { let v = 50; return Array.from({ length: N }, () => (v = walk(v))) })
  const [running, setRunning] = useState(true)
  const [events, setEvents] = useState([])
  const [spike, setSpike] = useState(0)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setData((d) => [...d.slice(1), spike > 0 ? Math.min(98, d[d.length - 1] + 14) : walk(d[d.length - 1])])
      setSpike((s) => Math.max(0, s - 1))
      if (Math.random() > 0.45) {
        const [type, text] = eventTypes[Math.floor(Math.random() * eventTypes.length)]
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        setEvents((e) => [{ id: Date.now(), type, text, time }, ...e].slice(0, 5))
      }
    }, 750)
    return () => clearInterval(id)
  }, [running, spike])

  const last = data[data.length - 1]
  const { line, area, lx, ly } = useMemo(() => {
    const x = (i) => (i / (N - 1)) * W
    const y = (v) => H - (v / 100) * H
    const pts = data.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`)
    return { line: `M${pts.join(' L')}`, area: `M0,${H} L${pts.join(' L')} L${W},${H} Z`, lx: x(N - 1), ly: y(last) }
  }, [data, last])

  const kpis = [
    { label: 'Active users', value: Math.round(last * 23), format: (v) => Math.round(v).toLocaleString() },
    { label: 'Orders / min', value: last * 0.62, format: (v) => v.toFixed(1) },
    { label: 'p95 latency', value: 60 + last * 1.3, format: (v) => `${Math.round(v)} ms`, warn: 60 + last * 1.3 > 180 },
    { label: 'Error rate', value: 0.1 + last / 300, format: (v) => `${v.toFixed(2)}%` },
  ]

  return (
    <div className="demo pulse-demo">
      <div className="kpi-row">
        {kpis.map((k) => (
          <div key={k.label} className={`kpi ${k.warn ? 'is-warn' : ''}`}>
            <span className="kpi-label">{k.label}</span>
            <span className="kpi-value mono"><Num value={k.value} format={k.format} /></span>
          </div>
        ))}
      </div>
      <div className="chart">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label="Live traffic chart">
          <defs>
            <linearGradient id="pulse-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--amber)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} className="grid-line" />)}
          <path d={area} fill="url(#pulse-fill)" />
          <path d={line} className="chart-line" fill="none" />
          <circle cx={lx} cy={ly} r="9" className="chart-halo" />
          <circle cx={lx} cy={ly} r="4" className="chart-dot" />
        </svg>
        <span className="chart-cap mono">requests / s · last 36 s</span>
      </div>
      <div className="demo-controls">
        <button className="btn btn-ghost" onClick={() => setRunning((r) => !r)} aria-pressed={!running}>{running ? 'Pause stream' : 'Resume stream'}</button>
        <button className="btn btn-accent" onClick={() => { setSpike(4); setRunning(true) }}>Simulate traffic spike</button>
      </div>
      <ul className="event-feed">
        <AnimatePresence initial={false}>
          {events.map((e) => (
            <motion.li
              key={e.id}
              layout
              initial={{ opacity: 0, x: -24, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
            >
              <span className={`ev-dot ev-${e.type}`} />
              <span>{e.text}</span>
              <span className="mono muted small">{e.time}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}
