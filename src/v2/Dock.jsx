import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { scrollToId } from '../lib/scroll'
import { openPalette } from '../lib/events'
import DesignSwitch from '../components/DesignSwitch'

const items = [
  ['skills', 'Stack'],
  ['projects', 'Work'],
  ['experience', 'Career'],
  ['about', 'About'],
  ['contact', 'Contact'],
]

function DockItem({ mouseX, id, label, active }) {
  const ref = useRef(null)
  const dist = useTransform(mouseX, (v) => {
    const r = ref.current?.getBoundingClientRect()
    return r ? v - r.left - r.width / 2 : Infinity
  })
  const scale = useSpring(useTransform(dist, [-130, 0, 130], [1, 1.3, 1]), { stiffness: 320, damping: 20 })
  const y = useTransform(scale, [1, 1.3], [0, -7])
  return (
    <motion.button ref={ref} className={`v2-dock-item ${active ? 'is-active' : ''}`} style={{ scale, y }} onClick={() => scrollToId(id)}>
      {label}
      {active && <motion.span layoutId="dock-dot" className="v2-dock-dot" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
    </motion.button>
  )
}

export default function Dock({ ready }) {
  const mouseX = useMotionValue(Infinity)
  const [active, setActive] = useState('')

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ;['top', ...items.map(([id]) => id)].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  return (
    <motion.nav
      className="v2-dock"
      aria-label="Sections"
      initial={{ y: 120, x: '-50%' }}
      animate={ready ? { y: 0, x: '-50%' } : undefined}
      transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 24 }}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {items.map(([id, label]) => <DockItem key={id} id={id} label={label} mouseX={mouseX} active={active === id} />)}
      <span className="v2-dock-sep" aria-hidden="true" />
      <button className="v2-dock-k" onClick={openPalette} aria-label="Open command menu">⌘K</button>
      <DesignSwitch className="v2-dock-switch" compact />
    </motion.nav>
  )
}
