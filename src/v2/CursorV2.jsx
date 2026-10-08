import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const interactive = 'a, button, [data-cursor], input, textarea, select, label, [role="button"], [role="tab"]'

/** A single disc that inverts whatever it passes over. */
export default function CursorV2() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e) => setHover(!!e.target.closest?.(interactive))
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [x, y])

  if (!enabled) return null
  return (
    <motion.div className="v2-cursor" style={{ x: sx, y: sy }} aria-hidden="true">
      <motion.span animate={{ scale: hover ? 3.2 : 1 }} transition={{ type: 'spring', stiffness: 350, damping: 22 }} />
    </motion.div>
  )
}
