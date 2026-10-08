import { useEffect, useMemo, useState } from 'react'
import { Tilt } from './Fx'

const lines = [
  [['k', 'const '], ['v', 'engineer'], ['p', ' = {']],
  [['p', '  name: '], ['s', '"Lakhtar Singh"'], ['p', ',']],
  [['p', '  role: '], ['s', '"Full-Stack Dev + Team Lead"'], ['p', ',']],
  [['p', '  front: ['], ['s', '"React"'], ['p', ', '], ['s', '"Vue"'], ['p', ', '], ['s', '"TS"'], ['p', '],']],
  [['p', '  back: ['], ['s', '"Node"'], ['p', ', '], ['s', '"Express"'], ['p', ', '], ['s', '"Laravel"'], ['p', ', '], ['s', '"WP"'], ['p', '],']],
  [['p', '  data: ['], ['s', '"MySQL"'], ['p', ', '], ['s', '"MongoDB"'], ['p', '],']],
  [['p', '  git: '], ['s', '"PRs, reviews, CI/CD"'], ['p', ',']],
  [['f', '  ship'], ['p', ': () => '], ['s', '"front to database"'], ['p', ',']],
  [['p', '};']],
  [],
  [['c', '// hover the name, move the cursor, press ⌘K']],
]

export default function CodeWindow({ start }) {
  const total = useMemo(() => lines.reduce((n, l) => n + l.reduce((m, [, t]) => m + t.length, 0) + 1, 0), [])
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setCount(total)
    let n = 0
    const id = setInterval(() => {
      n += 2
      setCount(Math.min(n, total))
      if (n >= total) clearInterval(id)
    }, 22)
    return () => clearInterval(id)
  }, [start, total])

  let budget = count
  return (
    <Tilt className="code-window" max={10}>
      <div className="code-bar">
        <span className="dots"><i /><i /><i /></span>
        <span className="code-file">engineer.ts</span>
        <span className="code-lang">TS</span>
      </div>
      <pre className="code-body" aria-label="Code sample describing Lakhtar's full-stack skills">
        {lines.map((line, li) => {
          const out = line.map(([cls, text], ti) => {
            const shown = text.slice(0, Math.max(0, budget))
            budget -= text.length
            return shown ? <span key={ti} className={`t-${cls}`}>{shown}</span> : null
          })
          budget -= 1
          const typing = budget < 0 && budget > -(line.reduce((m, [, t]) => m + t.length, 0) + 2)
          return (
            <div key={li} className="code-line">
              <span className="ln">{li + 1}</span>
              <span>{out}{typing && <span className="caret" />}</span>
            </div>
          )
        })}
      </pre>
    </Tilt>
  )
}
