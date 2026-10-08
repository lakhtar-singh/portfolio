import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const users = [
  { id: 'admin', name: 'Nadia', role: 'Admin', perms: ['pages.view', 'pages.create', 'pages.delete'] },
  { id: 'editor', name: 'Ravi', role: 'Editor', perms: ['pages.view', 'pages.create'] },
  { id: 'viewer', name: 'Chen', role: 'Viewer', perms: ['pages.view'] },
]

const endpoints = [
  {
    id: 'list', method: 'GET', path: '/api/v1/pages', perm: 'pages.view', status: 200, action: 'index',
    sql: 'SELECT id, title, status FROM pages\nWHERE tenant_id = 7\nORDER BY updated_at DESC LIMIT 20;  -- idx(tenant_id, updated_at)',
    body: { data: [{ id: 42, title: 'Spring campaign', status: 'published' }, { id: 41, title: 'Careers', status: 'draft' }], meta: { tenant: 'acme', total: 2 } },
  },
  {
    id: 'create', method: 'POST', path: '/api/v1/pages', perm: 'pages.create', status: 201, action: 'store',
    sql: "INSERT INTO pages (tenant_id, title, status, created_by)\nVALUES (7, 'Pricing', 'draft', :user_id);",
    body: { data: { id: 43, title: 'Pricing', status: 'draft' } },
  },
  {
    id: 'delete', method: 'DELETE', path: '/api/v1/pages/42', perm: 'pages.delete', status: 204, action: 'destroy',
    sql: 'DELETE FROM pages WHERE id = 42 AND tenant_id = 7;',
    body: null,
  },
  {
    id: 'cross', method: 'GET', path: '/api/v1/pages/913', perm: 'pages.view', status: 200, action: 'show', foreign: true,
    sql: 'SELECT * FROM pages WHERE id = 913 AND tenant_id = 7;  -- 0 rows',
    body: null,
  },
]

const steps = (ep) => ['auth:sanctum', 'tenant.scope', `can:${ep.perm}`, `PageController@${ep.action}`]

function evaluate(user, ep, revoked) {
  if (revoked) return { fail: 0, status: 401, body: { message: 'Unauthenticated.' } }
  if (ep.foreign) return { fail: 1, status: 404, body: { message: 'Page not found.' }, note: 'Page 913 belongs to another client. The scope hides it, so it looks like it does not exist.' }
  if (!user.perms.includes(ep.perm)) return { fail: 2, status: 403, body: { message: 'This action is unauthorized.' } }
  return { fail: -1, status: ep.status, body: ep.body, sql: ep.sql }
}

export default function TenantDemo() {
  const [userId, setUserId] = useState('editor')
  const [revoked, setRevoked] = useState(false)
  const [run, setRun] = useState(null)
  const [step, setStep] = useState(-1)
  const [history, setHistory] = useState([])
  const timers = useRef([])
  const user = users.find((u) => u.id === userId)

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const send = (ep) => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    const result = evaluate(user, ep, revoked)
    const last = result.fail === -1 ? 3 : result.fail
    const ms = 28 + Math.round(Math.random() * 40)
    setRun({ ep, result, ms, done: false })
    setStep(0)
    for (let i = 1; i <= last; i++) timers.current.push(setTimeout(() => setStep(i), i * 260))
    timers.current.push(setTimeout(() => {
      setRun((r) => ({ ...r, done: true }))
      setHistory((h) => [{ id: Date.now(), method: ep.method, path: ep.path, status: result.status, who: user.role }, ...h].slice(0, 4))
    }, last * 260 + 300))
  }

  const statusClass = (s) => (s < 300 ? 'ok' : s === 404 ? 'warn' : 'bad')

  return (
    <div className="demo tenant-demo">
      <div className="demo-controls">
        <div className="field">
          <span>Signed in to Acme Co. as</span>
          <div className="seg" role="group" aria-label="User">
            {users.map((u) => (
              <button key={u.id} className={userId === u.id ? 'is-on' : ''} onClick={() => setUserId(u.id)}>{u.name} · {u.role}</button>
            ))}
          </div>
        </div>
        <button className={`btn btn-ghost btn-small ${revoked ? 'is-on' : ''}`} onClick={() => setRevoked((r) => !r)} aria-pressed={revoked}>
          {revoked ? 'Token revoked' : 'Revoke token'}
        </button>
      </div>

      <div className="endpoint-list">
        {endpoints.map((ep) => (
          <button key={ep.id} className="endpoint" onClick={() => send(ep)}>
            <span className={`method m-${ep.method.toLowerCase()}`}>{ep.method}</span>
            <span className="mono">{ep.path}</span>
            {ep.foreign && <span className="badge badge-info">other client</span>}
            <span className="endpoint-send" aria-hidden="true">Send →</span>
          </button>
        ))}
      </div>

      <div className="mw-chain" aria-label="Laravel middleware chain">
        {(run ? steps(run.ep) : steps(endpoints[0])).map((s, i) => {
          const failed = run && run.result.fail === i && step >= i
          const passed = run && step >= i && !failed
          return (
            <div key={s} className={`mw ${passed ? 'is-pass' : ''} ${failed ? 'is-fail' : ''}`}>
              <span className="mw-dot" />
              <span className="mono">{s}</span>
            </div>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {run?.done ? (
          <motion.div key={run.ep.id + run.ms} className="response" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="response-head mono">
              <span className={`status status-${statusClass(run.result.status)}`}>{run.result.status}</span>
              <span>{run.ep.method} {run.ep.path}</span>
              <span className="muted">{run.ms} ms</span>
            </div>
            {run.result.note && <p className="small muted response-note">{run.result.note}</p>}
            <div className="response-grid">
              <pre className="mono">{run.result.body ? JSON.stringify(run.result.body, null, 2) : '(no content)'}</pre>
              <pre className="mono sql">{run.result.sql ?? (run.result.fail === 1 ? run.ep.sql : '-- request stopped before any query ran')}</pre>
            </div>
          </motion.div>
        ) : (
          <motion.p key="idle" className="small muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {run ? 'Running middleware…' : 'Pick a user, then send a request. Try deleting as the Viewer, or reading another client’s page.'}
          </motion.p>
        )}
      </AnimatePresence>

      {history.length > 0 && (
        <ul className="req-log mono small">
          {history.map((h) => (
            <motion.li key={h.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <span className={`status status-${statusClass(h.status)}`}>{h.status}</span>{h.method} {h.path}<span className="muted">{h.who}</span>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  )
}
