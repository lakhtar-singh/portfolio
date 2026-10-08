import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Toast() {
  const [msg, setMsg] = useState(null)
  useEffect(() => {
    let timer
    const show = (e) => {
      setMsg({ text: e.detail, id: Date.now() })
      clearTimeout(timer)
      timer = setTimeout(() => setMsg(null), 2400)
    }
    window.addEventListener('toast', show)
    return () => { window.removeEventListener('toast', show); clearTimeout(timer) }
  }, [])
  return (
    <div className="toast-region" role="status" aria-live="polite">
      <AnimatePresence>
        {msg && (
          <motion.div
            key={msg.id}
            className="toast"
            initial={{ y: 30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          >
            <span className="toast-dot" />{msg.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
