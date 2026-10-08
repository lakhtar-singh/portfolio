import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const COLS = 5
const shut = [0.76, 0, 0.24, 1]

export default function LoaderV2({ onDone }) {
  const [n, setN] = useState(0)
  const done = useRef(onDone)
  done.current = onDone

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reduce ? 200 : 1300
    let start, raf, timer
    const tick = (t) => {
      start ??= t
      const p = Math.min((t - start) / duration, 1)
      setN(Math.round((1 - Math.pow(1 - p, 2)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else timer = setTimeout(() => done.current(), 200)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); clearTimeout(timer) }
  }, [])

  return (
    <motion.div
      className="v2-loader"
      initial="show"
      animate="show"
      exit="exit"
      variants={{ show: { opacity: 1 }, exit: { opacity: 1, transition: { duration: 1.2 } } }}
    >
      {Array.from({ length: COLS }, (_, i) => (
        <motion.span
          key={i}
          className="v2-shutter"
          style={{ left: `${(i / COLS) * 100}%`, width: `${100 / COLS + 0.2}%` }}
          variants={{ show: { y: '0%' }, exit: { y: '-100%', transition: { duration: 0.8, ease: shut, delay: i * 0.07 } } }}
        />
      ))}
      <motion.div className="v2-loader-text" variants={{ show: { opacity: 1 }, exit: { opacity: 0, transition: { duration: 0.2 } } }}>
        <span className="v2-loader-count">{String(n).padStart(2, '0')}</span>
        <span className="v2-loader-name">Lakhtar Singh<br />Full-stack developer</span>
      </motion.div>
    </motion.div>
  )
}
