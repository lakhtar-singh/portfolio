import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const jobs = [
  { id: 'install', label: 'Install deps', secs: 1.1, log: ['npm ci  ✓ 1,284 packages', 'composer install --no-dev  ✓'] },
  { id: 'lint', label: 'Lint', secs: 0.7, log: ['eslint src  ✓ 0 problems', 'php-cs-fixer --dry-run  ✓'] },
  { id: 'test', label: 'Tests', secs: 1.5, log: ['vitest run  ✓ 212 passed', 'php artisan test  ✓ 148 passed'], fail: ['php artisan test  ✕ 1 failed', '  OrderTotalTest › applies tax after discount'] },
  { id: 'build', label: 'Build', secs: 1.2, log: ['vite build  ✓ 41 chunks', 'php artisan config:cache  ✓'] },
  { id: 'deploy', label: 'Deploy to EC2', secs: 1.4, log: ['rsync → ec2-prod-1  ✓', 'php artisan migrate --force  ✓ 2 migrations', 'symlink release → current  ✓'] },
  { id: 'health', label: 'Health check', secs: 0.6, log: ['GET /health  200 in 84 ms  ✓'] },
]
const SPEED = 650

export default function PipelineDemo() {
  const [state, setState] = useState(() => Object.fromEntries(jobs.map((j) => [j.id, 'idle'])))
  const [logs, setLogs] = useState(['$ waiting for a merge to main…'])
  const [breakTest, setBreakTest] = useState(false)
  const [running, setRunning] = useState(false)
  const [pr, setPr] = useState(128)
  const [releases, setReleases] = useState([
    { v: 'v2.7.0', note: 'Editable hero blocks', status: 'live' },
    { v: 'v2.6.3', note: 'Fix: role check on exports', status: 'previous' },
  ])
  const [outcome, setOutcome] = useState(null)
  const timers = useRef([])
  const logRef = useRef(null)

  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight }, [logs])

  const run = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    const willFail = breakTest
    setRunning(true)
    setOutcome(null)
    setState(Object.fromEntries(jobs.map((j) => [j.id, 'queued'])))
    setLogs([`$ git merge feature/pricing-page → main  (PR #${pr})`, '▶ workflow "deploy.yml" started'])
    let t = 300
    let failed = false
    for (const job of jobs) {
      if (failed) {
        timers.current.push(setTimeout(() => setState((s) => ({ ...s, [job.id]: 'skipped' })), t))
        continue
      }
      const start = t
      timers.current.push(setTimeout(() => setState((s) => ({ ...s, [job.id]: 'running' })), start))
      const lines = job.id === 'test' && willFail ? job.fail : job.log
      lines.forEach((line, i) => timers.current.push(setTimeout(() => setLogs((l) => [...l, `  ${line}`]), start + ((i + 1) * job.secs * SPEED) / (lines.length + 1))))
      t += job.secs * SPEED
      const isFail = job.id === 'test' && willFail
      timers.current.push(setTimeout(() => setState((s) => ({ ...s, [job.id]: isFail ? 'failed' : 'passed' })), t))
      if (isFail) failed = true
      t += 120
    }
    timers.current.push(setTimeout(() => {
      setRunning(false)
      setPr((n) => n + 1)
      if (willFail) {
        setOutcome({ ok: false, text: 'Deploy blocked. Production is still on ' + releases[0].v + '.' })
        setLogs((l) => [...l, '✕ workflow failed · deploy skipped · team notified'])
      } else {
        const [maj, min, patch] = releases[0].v.slice(1).split('.').map(Number)
        const v = `v${maj}.${min}.${patch + 1}`
        setReleases((r) => [{ v, note: 'Pricing page', status: 'live' }, ...r.map((x) => ({ ...x, status: 'previous' }))].slice(0, 4))
        setOutcome({ ok: true, text: `${v} is live. No one touched a server.` })
        setLogs((l) => [...l, `✓ released ${v} to production`])
      }
    }, t + 200))
  }

  return (
    <div className="demo pipeline-demo">
      <div className="demo-controls">
        <button className="btn btn-accent" onClick={run} disabled={running}>{running ? 'Pipeline running…' : `Merge PR #${pr} into main`}</button>
        <label className="check-field">
          <input id="pipe-break" type="checkbox" checked={breakTest} onChange={(e) => setBreakTest(e.target.checked)} disabled={running} />
          Sneak in a failing test
        </label>
      </div>

      <ol className="jobs">
        {jobs.map((j) => (
          <li key={j.id} className={`job is-${state[j.id]}`}>
            <span className="job-icon mono" aria-hidden="true">
              {state[j.id] === 'passed' ? '✓' : state[j.id] === 'failed' ? '✕' : state[j.id] === 'skipped' ? '–' : state[j.id] === 'running' ? '' : '·'}
            </span>
            <span className="job-label">{j.label}</span>
            <span className="job-bar"><motion.span animate={{ scaleX: ['running', 'passed', 'failed'].includes(state[j.id]) ? 1 : 0 }} transition={{ duration: state[j.id] === 'running' ? j.secs * SPEED / 1000 : 0.2, ease: 'linear' }} /></span>
            <span className="sr-only">{state[j.id]}</span>
          </li>
        ))}
      </ol>

      <AnimatePresence>
        {outcome && (
          <motion.div className={`outcome ${outcome.ok ? 'is-ok' : 'is-bad'}`} initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}>
            {outcome.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pipe-bottom">
        <div className="serial">
          <div className="serial-head mono"><span>GitHub Actions · deploy.yml</span><span>{running ? 'running' : 'idle'}</span></div>
          <pre className="mono" ref={logRef}>{logs.join('\n')}</pre>
        </div>
        <div className="releases">
          <div className="serial-head mono"><span>Releases</span></div>
          <ul>
            <AnimatePresence initial={false}>
              {releases.map((r) => (
                <motion.li layout key={r.v} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="mono">{r.v}</span>
                  <span className="rel-note">{r.note}</span>
                  <span className={`badge ${r.status === 'live' ? 'badge-good' : 'badge-info'}`}>{r.status}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  )
}
