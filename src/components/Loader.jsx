import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const ease = [0.76, 0, 0.24, 1]

export default function Loader({ onDone }) {
  const [n, setN] = useState(0)
  const done = useRef(onDone)
  done.current = onDone

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reduce ? 200 : 1500
    let start, raf, timer
    const tick = (t) => {
      start ??= t
      const p = Math.min((t - start) / duration, 1)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else timer = setTimeout(() => done.current(), 250)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); clearTimeout(timer) }
  }, [])

  return (
    <motion.div className="loader" exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.9, ease }}>
      <div className="loader-inner">
        <div className="loader-name" aria-label="Lakhtar Singh">
          {'LAKHTAR SINGH'.split('').map((ch, i) => (
            <span className="mask" key={i} aria-hidden="true">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.04 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {ch === ' ' ? ' ' : ch}
              </motion.span>
            </span>
          ))}
        </div>
        <div className="loader-meta">
          <span>npm run portfolio</span>
          <span className="loader-count">{String(n).padStart(3, '0')}%</span>
        </div>
        <div className="loader-bar"><span style={{ transform: `scaleX(${n / 100})` }} /></div>
      </div>
    </motion.div>
  )
}
