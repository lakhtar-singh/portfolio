import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const interactive = 'a, button, [data-cursor], input, textarea, select, label, [role="button"], [role="tab"]'

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState({ mode: 'default', label: '' })
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 420, damping: 36, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 420, damping: 36, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    if (!fine.matches) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e) => {
      const t = e.target.closest?.(interactive)
      if (!t) return setState({ mode: 'default', label: '' })
      if (t.matches('input, textarea, select')) return setState({ mode: 'text', label: '' })
      const label = t.dataset.cursor || ''
      setState({ mode: label ? 'label' : 'hover', label })
    }
    const down = () => document.documentElement.classList.add('cursor-down')
    const up = () => document.documentElement.classList.remove('cursor-down')
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [x, y])

  if (!enabled) return null
  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} aria-hidden="true" />
      <motion.div className="cursor-ring-pos" style={{ x: sx, y: sy }} aria-hidden="true">
        <div className={`cursor-ring is-${state.mode}`}>{state.label && <span>{state.label}</span>}</div>
      </motion.div>
    </>
  )
}
