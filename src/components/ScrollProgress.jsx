import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress({ className = '' }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div className={`scroll-progress ${className}`} style={{ scaleX }} aria-hidden="true" />
}
