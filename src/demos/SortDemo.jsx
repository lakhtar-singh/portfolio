import { useEffect, useRef, useState } from 'react'

const colors = [
  { id: 'RED', css: 'var(--rose)' },
  { id: 'BLUE', css: 'var(--sky)' },
  { id: 'GREEN', css: 'var(--mint)' },
  { id: 'AMBER', css: 'var(--amber)' },
]
const BIN_X = [36, 54, 72, 90]
const SENSOR_X = 16
const DROP_MS = 520

export default function SortDemo() {
  const [, setTick] = useState(0)
  const [auto, setAuto] = useState(true)
  const [speed, setSpeed] = useState(1)
  const items = useRef([])
  const counts = useRef([0, 0, 0, 0])
  const log = useRef(['// SortLine v2.1 · serial @ 9600 baud', 'READY'])
  const nextId = useRef(1)
  const settings = useRef({ auto, speed })
  settings.current = { auto, speed }

  const spawn = () => {
    if (items.current.filter((i) => i.x < 8).length) return
    const c = Math.floor(Math.random() * 4)
    items.current.push({ id: nextId.current++, c, x: 0, scanned: false, drop: 0 })
  }

  useEffect(() => {
    let raf, last = performance.now(), sinceSpawn = 0, clock = 0
    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const { auto, speed } = settings.current
      clock += dt
      sinceSpawn += dt
      if (auto && sinceSpawn > 1.3 / speed) { spawn(); sinceSpawn = 0 }
      for (const it of items.current) {
        if (it.drop) continue
        it.x += 14 * speed * dt
        if (!it.scanned && it.x >= SENSOR_X) {
          it.scanned = true
          log.current.push(`[${clock.toFixed(1)}s] SCAN color=${colors[it.c].id.padEnd(5)} → servo(${it.c + 1}, 45°)`)
          if (log.current.length > 7) log.current.shift()
        }
        if (it.x >= BIN_X[it.c]) it.drop = now
      }
      items.current = items.current.filter((it) => {
        if (it.drop && now - it.drop > DROP_MS) { counts.current[it.c] += 1; return false }
        return true
      })
      setTick((t) => (t + 1) % 1e6)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const now = performance.now()
  const sensorHot = items.current.some((it) => Math.abs(it.x - SENSOR_X) < 2.5)
  const total = counts.current.reduce((a, b) => a + b, 0)

  return (
    <div className="demo sort-demo">
      <div className="sort-stage">
        <div className={`sensor ${sensorHot ? 'is-hot' : ''}`} style={{ left: `${SENSOR_X}%` }}><span>RGB</span></div>
        {BIN_X.map((x, b) => {
          const active = items.current.some((it) => it.c === b && it.x > x - 6 && it.x <= x + 1)
          return <div key={b} className={`diverter ${active ? 'is-active' : ''}`} style={{ left: `${x}%` }} />
        })}
        <div className="belt" style={{ '--speed': `${0.8 / speed}s` }} />
        {items.current.map((it) => {
          const p = it.drop ? Math.min((now - it.drop) / DROP_MS, 1) : 0
          return (
            <span
              key={it.id}
              className="parcel"
              style={{
                left: `${it.x}%`,
                background: colors[it.c].css,
                transform: `translate(-50%, ${p * p * 64}px) rotate(${p * 25}deg) scale(${1 - p * 0.25})`,
                opacity: 1 - p * 0.4,
              }}
            />
          )
        })}
        <div className="bins">
          {BIN_X.map((x, b) => (
            <div key={b} className="bin" style={{ left: `${x}%`, '--c': colors[b].css }}>
              <span className="bin-count mono">{counts.current[b]}</span>
              <span className="bin-name mono">BIN {b + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="demo-controls">
        <button className="btn btn-accent" onClick={spawn}>Drop a parcel</button>
        <button className={`btn btn-ghost ${auto ? 'is-on' : ''}`} onClick={() => setAuto((a) => !a)} aria-pressed={auto}>
          Auto-feed {auto ? 'on' : 'off'}
        </button>
        <label className="field field-inline">
          <span>Belt speed <b className="mono">{speed.toFixed(1)}×</b></span>
          <input id="sort-speed" type="range" min="0.5" max="2.5" step="0.1" value={speed} onChange={(e) => setSpeed(+e.target.value)} />
        </label>
      </div>

      <div className="serial">
        <div className="serial-head mono"><span>Serial Monitor</span><span>{total} sorted</span></div>
        <pre className="mono">{log.current.join('\n')}</pre>
      </div>
    </div>
  )
}
