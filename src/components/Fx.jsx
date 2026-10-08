import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

/** Pulls its child toward the pointer. */
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 })
  const y = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 })
  const move = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const reset = () => { x.set(0); y.set(0) }
  return (
    <motion.div ref={ref} className={`magnetic ${className}`} style={{ x, y }} onPointerMove={move} onPointerLeave={reset}>
      {children}
    </motion.div>
  )
}

/** 3D tilt with a glare that follows the pointer. */
export function Tilt({ children, className = '', max = 8, glare = true, ...rest }) {
  const ref = useRef(null)
  const rx = useSpring(0, { stiffness: 160, damping: 18 })
  const ry = useSpring(0, { stiffness: 160, damping: 18 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const bg = useMotionTemplate`radial-gradient(520px circle at ${gx}% ${gy}%, var(--glare), transparent 55%)`
  const move = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    rx.set((0.5 - py) * max)
    ry.set((px - 0.5) * max)
    gx.set(px * 100)
    gy.set(py * 100)
  }
  const reset = () => { rx.set(0); ry.set(0) }
  return (
    <motion.div
      ref={ref}
      className={`tilt ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={move}
      onPointerLeave={reset}
      {...rest}
    >
      {glare && <motion.div className="tilt-glare" style={{ background: bg }} aria-hidden="true" />}
      {children}
    </motion.div>
  )
}

/** Heading whose words rise out of a mask when scrolled into view. */
export function SplitHeading({ text, as = 'h2', className = '', accent = [] }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
    >
      {text.split(' ').map((w, i) => (
        <span className="mask" key={i} aria-hidden="true">
          <motion.span
            className={accent.includes(i) ? 'accent-word' : undefined}
            variants={{ hidden: { y: '110%' }, show: { y: '0%', transition: { duration: 0.85, ease } } }}
          >
            {w}
          </motion.span>
          {' '}
        </span>
      ))}
    </Tag>
  )
}

export function SectionHead({ path, title, accent, intro }) {
  return (
    <header className="section-head">
      <motion.p
        className="section-path"
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
      >
        <span className="prompt">~/</span>{path}
      </motion.p>
      <SplitHeading text={title} accent={accent} className="section-title" />
      {intro && (
        <motion.p
          className="section-intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          {intro}
        </motion.p>
      )}
    </header>
  )
}

export function Reveal({ children, delay = 0, y = 32, className = '', as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </Tag>
  )
}
