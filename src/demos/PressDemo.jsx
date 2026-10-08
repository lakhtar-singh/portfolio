import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const slots = ['09:00', '10:30', '13:00', '14:30', '16:00']
const seedRows = [
  { id: 118, name: 'A. Patel', day: 'Mon', time: '09:00' },
  { id: 119, name: 'J. Moreau', day: 'Tue', time: '10:30' },
  { id: 120, name: 'S. Kim', day: 'Wed', time: '13:00' },
  { id: 121, name: 'L. Grant', day: 'Thu', time: '16:00' },
]
const checks = ['Nonce verified', 'Slot locked (SELECT … FOR UPDATE)', 'Row inserted', 'Confirmation email queued']

export default function PressDemo() {
  const [rows, setRows] = useState(seedRows)
  const [day, setDay] = useState('Tue')
  const [time, setTime] = useState(null)
  const [name, setName] = useState('Jordan Lee')
  const [phase, setPhase] = useState(-1)
  const [result, setResult] = useState(null)
  const timers = useRef([])
  const taken = (d, t) => rows.some((r) => r.day === d && r.time === t)

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const book = (e) => {
    e.preventDefault()
    if (!time) return
    timers.current.forEach(clearTimeout)
    timers.current = []
    const conflict = taken(day, time)
    const id = Math.max(...rows.map((r) => r.id)) + 1
    setResult(null)
    setPhase(0)
    const last = conflict ? 1 : checks.length - 1
    for (let i = 1; i <= last; i++) timers.current.push(setTimeout(() => setPhase(i), i * 380))
    timers.current.push(setTimeout(() => {
      if (conflict) {
        setResult({ status: 409, body: { code: 'slot_taken', message: `${day} ${time} was just booked by someone else.` } })
      } else {
        setRows((r) => [...r, { id, name: name.trim() || 'Guest', day, time, fresh: true }])
        setResult({ status: 201, body: { id, day, time, status: 'confirmed' } })
        setTime(null)
      }
    }, last * 380 + 300))
  }

  const failedAt = result?.status === 409 ? 1 : -1

  return (
    <div className="demo press-demo">
      <div className="press-grid">
        <form className="wp-block" onSubmit={book}>
          <p className="wp-block-label mono">Gutenberg block · [pressbook]</p>
          <h4>Book a 30-minute consult</h4>
          <div className="day-tabs" role="tablist" aria-label="Day">
            {days.map((d) => (
              <button type="button" role="tab" aria-selected={day === d} key={d} className={day === d ? 'is-on' : ''} onClick={() => { setDay(d); setTime(null) }}>{d}</button>
            ))}
          </div>
          <div className="slot-grid">
            {slots.map((t) => {
              const isTaken = taken(day, t)
              return (
                <button
                  type="button"
                  key={t}
                  className={`slot ${time === t ? 'is-on' : ''} ${isTaken ? 'is-taken' : ''}`}
                  onClick={() => setTime(t)}
                  aria-pressed={time === t}
                >
                  {t}{isTaken && <small>booked</small>}
                </button>
              )
            })}
          </div>
          <label className="wp-input">
            <span>Your name</span>
            <input id="press-name" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <button className="wp-btn" disabled={!time || (phase >= 0 && !result)}>{time ? `Book ${day} at ${time}` : 'Pick a time'}</button>
          <p className="wp-hint">Tip: pick a “booked” slot to see the server refuse a double booking.</p>
        </form>

        <div className="press-dev">
          <div className="serial-head mono"><span>POST /wp-json/pressbook/v1/bookings</span></div>
          <ol className="check-list">
            {checks.map((c, i) => (
              <li key={c} className={`${phase >= i && failedAt !== i ? 'is-on' : ''} ${failedAt === i ? 'is-fail' : ''}`}>
                <span className="cl-mark mono">{failedAt === i ? '✕' : phase >= i ? '✓' : '·'}</span>{c}
              </li>
            ))}
          </ol>
          <AnimatePresence>
            {result && (
              <motion.pre className={`mono press-res ${result.status === 201 ? 'is-ok' : 'is-error'}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                {`${result.status} ${result.status === 201 ? 'Created' : 'Conflict'}\n${JSON.stringify(result.body, null, 2)}`}
              </motion.pre>
            )}
          </AnimatePresence>
          <div className="db-table">
            <div className="serial-head mono"><span>wp_pb_bookings</span><span>{rows.length} rows</span></div>
            <div className="db-rows mono">
              <div className="db-row db-head"><span>id</span><span>name</span><span>slot</span></div>
              <AnimatePresence initial={false}>
                {rows.slice(-5).map((r) => (
                  <motion.div key={r.id} className={`db-row ${r.fresh ? 'is-fresh' : ''}`} initial={{ opacity: 0, backgroundColor: 'rgba(255,180,84,0.35)' }} animate={{ opacity: 1, backgroundColor: 'rgba(255,180,84,0)' }} transition={{ duration: 1.2 }}>
                    <span>{r.id}</span><span>{r.name}</span><span>{r.day} {r.time}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
