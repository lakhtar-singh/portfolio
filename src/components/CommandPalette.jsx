import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects, profile } from '../data'
import { scrollToId, scrollToTop, lockScroll } from '../lib/scroll'
import { copyText, openProject } from '../lib/events'

const isV2 = () => window.location.pathname.replace(/\/$/, '') === '/home-v2'

/** Sections come from the page itself, so the menu works on both designs. */
const buildCommands = () => [
  { group: 'Navigate', label: 'Top of page', run: scrollToTop },
  ...[...document.querySelectorAll('section[id][data-label]')].map((el) => ({
    group: 'Navigate', label: `Go to ${el.dataset.label}`, run: () => scrollToId(el.id),
  })),
  ...projects.map((p) => ({ group: 'Live demos', label: `Open ${p.title}`, hint: p.kind, run: () => { scrollToId('projects'); setTimeout(() => openProject(p.id), 500) } })),
  { group: 'Contact', label: 'Copy email address', hint: profile.email, run: () => copyText(profile.email, 'Email copied to clipboard') },
  { group: 'Contact', label: 'Open LinkedIn', hint: '↗', run: () => window.open(profile.linkedin, '_blank', 'noopener') },
  ...(isV2() ? [] : [{ group: 'Design', label: 'Switch to design v2', hint: '/home-v2', run: () => { window.location.href = '/home-v2' } }]),
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [idx, setIdx] = useState(0)
  const [commands, setCommands] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    const key = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o) }
      if (e.key === 'Escape') setOpen(false)
    }
    const show = () => setOpen(true)
    window.addEventListener('keydown', key)
    window.addEventListener('open-palette', show)
    return () => { window.removeEventListener('keydown', key); window.removeEventListener('open-palette', show) }
  }, [])

  useEffect(() => {
    if (!open) return
    setQ(''); setIdx(0)
    setCommands(buildCommands())
    lockScroll(true)
    setTimeout(() => inputRef.current?.focus(), 30)
    return () => lockScroll(false)
  }, [open])

  const results = useMemo(() => {
    const s = q.trim().toLowerCase()
    return s ? commands.filter((c) => `${c.label} ${c.group} ${c.hint ?? ''}`.toLowerCase().includes(s)) : commands
  }, [q, commands])

  const run = (c) => { setOpen(false); setTimeout(c.run, 120) }
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((i) => Math.min(i + 1, results.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && results[idx]) run(results[idx])
  }

  let lastGroup = null
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="palette-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.div
            className="palette"
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            data-lenis-prevent
            initial={{ y: -20, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -10, scale: 0.97, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="palette-input">
              <span className="mono prompt">›</span>
              <input
                id="palette-search"
                ref={inputRef}
                value={q}
                onChange={(e) => { setQ(e.target.value); setIdx(0) }}
                onKeyDown={onKey}
                placeholder="Jump to a section, open a demo, copy my email…"
                aria-label="Search commands"
              />
              <kbd>esc</kbd>
            </div>
            <ul className="palette-list" role="listbox">
              {results.length === 0 && <li className="palette-empty">No matches. Try “demo” or “email”.</li>}
              {results.map((c, i) => {
                const head = c.group !== lastGroup
                lastGroup = c.group
                return (
                  <li key={c.label} role="option" aria-selected={i === idx}>
                    {head && <p className="palette-group">{c.group}</p>}
                    <button className={`palette-item ${i === idx ? 'is-active' : ''}`} onMouseEnter={() => setIdx(i)} onClick={() => run(c)}>
                      {i === idx && <motion.span layoutId="palette-hl" className="palette-hl" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />}
                      <span>{c.label}</span>
                      {c.hint && <span className="palette-hint mono">{c.hint}</span>}
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
