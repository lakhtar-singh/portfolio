import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const layers = ['React', 'Express', 'Validate', 'Mongoose', 'MongoDB']
const seed = [
  { sku: 'NB-204', name: 'Dot-grid notebook', qty: 42, loc: 'A-12' },
  { sku: 'PN-118', name: 'Gel pen, 0.5 mm', qty: 6, loc: 'B-03' },
  { sku: 'TP-330', name: 'Washi tape set', qty: 2, loc: 'C-07' },
  { sku: 'MG-021', name: 'Ceramic mug', qty: 18, loc: 'D-01' },
]

export default function StockDemo() {
  const [items, setItems] = useState(seed)
  const [req, setReq] = useState(null)
  const [stage, setStage] = useState(-1)
  const [flash, setFlash] = useState(null)
  const [name, setName] = useState('Brass bookmark')
  const timers = useRef([])
  const busy = stage >= 0 && !req?.done

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const fire = (request) => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    const stop = request.invalid ? 2 : 4
    setReq({ ...request, done: false })
    setStage(0)
    for (let i = 1; i <= stop; i++) timers.current.push(setTimeout(() => setStage(i), i * 240))
    timers.current.push(setTimeout(() => {
      if (!request.invalid) {
        request.apply()
        setFlash(request.sku)
        timers.current.push(setTimeout(() => setFlash(null), 900))
      }
      setStage(stop + 1)
      setReq((r) => ({ ...r, done: true }))
    }, stop * 240 + 320))
  }

  const adjust = (item, delta) => {
    const invalid = item.qty + delta < 0
    fire({
      sku: item.sku,
      invalid,
      line: `PATCH /api/products/${item.sku}   { "delta": ${delta} }`,
      mongo: `db.products.findOneAndUpdate(\n  { sku: "${item.sku}", qty: { $gte: ${Math.max(0, -delta)} } },\n  { $inc: { qty: ${delta} } },\n  { returnDocument: "after" }\n)`,
      status: invalid ? '422 Unprocessable Entity' : '200 OK',
      error: invalid ? '"qty" cannot go below 0' : null,
      apply: () => setItems((list) => list.map((p) => (p.sku === item.sku ? { ...p, qty: p.qty + delta } : p))),
    })
  }

  const add = (e) => {
    e.preventDefault()
    const clean = name.trim()
    const sku = `NW-${String(100 + items.length * 7).padStart(3, '0')}`
    fire({
      sku,
      invalid: clean.length < 3,
      line: `POST /api/products   { "name": "${clean}", "qty": 10 }`,
      mongo: `db.products.insertOne({\n  sku: "${sku}", name: "${clean}",\n  qty: 10, loc: "E-02", createdAt: new Date()\n})`,
      status: clean.length < 3 ? '422 Unprocessable Entity' : '201 Created',
      error: clean.length < 3 ? '"name" must be at least 3 characters' : null,
      apply: () => setItems((list) => [...list, { sku, name: clean, qty: 10, loc: 'E-02' }]),
    })
  }

  const dotStage = Math.min(stage, req?.invalid ? 2 : 4)
  const returning = req?.done

  return (
    <div className="demo stock-demo">
      <div className="tracer" aria-label="Request path">
        <div className="tracer-line" />
        {layers.map((l, i) => (
          <div key={l} className={`tracer-node ${stage >= i && stage >= 0 ? 'is-on' : ''} ${req?.invalid && i === 2 && stage >= 2 ? 'is-fail' : ''}`}>
            <span className="tracer-dot" />
            <span className="mono">{l}</span>
          </div>
        ))}
        <div className="tracer-track">
          {stage >= 0 && (
            <motion.span
              className={`packet ${returning ? 'is-back' : ''} ${req?.invalid ? 'is-error' : ''}`}
              animate={{ left: `${returning ? 0 : (dotStage / (layers.length - 1)) * 100}%` }}
              transition={{ duration: returning ? 0.5 : 0.22, ease: 'easeInOut' }}
            />
          )}
        </div>
      </div>

      <div className="stock-grid">
        <div className="stock-table" role="table" aria-label="Inventory">
          <div className="stock-row stock-head mono" role="row"><span>SKU</span><span>Item</span><span>Qty</span><span /></div>
          <AnimatePresence initial={false}>
            {items.map((p) => (
              <motion.div
                layout
                key={p.sku}
                role="row"
                className={`stock-row ${flash === p.sku ? 'is-flash' : ''}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="mono small">{p.sku}</span>
                <span className="stock-name">{p.name}{p.qty <= 5 && <span className="badge badge-warn">Low</span>}</span>
                <span className="mono stock-qty">{p.qty}</span>
                <span className="qty-btns">
                  <button className="icon-btn" onClick={() => adjust(p, -1)} disabled={busy} aria-label={`Remove one ${p.name}`}>−</button>
                  <button className="icon-btn" onClick={() => adjust(p, 1)} disabled={busy} aria-label={`Add one ${p.name}`}>+</button>
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
          <form className="stock-add" onSubmit={add}>
            <input id="stock-name" value={name} onChange={(e) => setName(e.target.value)} aria-label="New product name" />
            <button className="btn btn-accent btn-small" disabled={busy}>Add product</button>
          </form>
        </div>

        <div className="stock-console mono">
          {req ? (
            <>
              <p className="console-label">request</p>
              <pre>{req.line}</pre>
              <p className="console-label">mongodb</p>
              <pre className={req.invalid ? 'is-dim' : ''}>{req.invalid ? '// skipped: validation failed' : req.mongo}</pre>
              <p className="console-label">response</p>
              <pre className={req.done ? (req.invalid ? 'is-error' : 'is-ok') : 'is-dim'}>{req.done ? `${req.status}${req.error ? `\n{ "error": ${JSON.stringify(req.error)} }` : ''}` : '…'}</pre>
            </>
          ) : (
            <p className="muted small">Press − or + on any row, or add a product, to watch the request travel through the stack. Take the washi tape below zero to see validation stop it.</p>
          )}
        </div>
      </div>
    </div>
  )
}
