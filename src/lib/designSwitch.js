import { useEffect } from 'react'
import { getLenis } from './scroll'
import { sectionOrder } from '../data'

const MAIN = '/'
const CLASSIC = '/home-v2'
const KEY = 'ls-design-switch'

export const isClassicPath = () => window.location.pathname.replace(/\/$/, '') === CLASSIC

/** Which section the reader is looking at right now. */
function currentSection() {
  let current = 'top'
  for (const id of sectionOrder) {
    const el = document.getElementById(id)
    if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id
  }
  return current
}

/** Set once per page load: present when the reader arrived by switching designs. */
export const arrival = (() => {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return null
    sessionStorage.removeItem(KEY)
    const data = JSON.parse(raw)
    return Date.now() - data.t < 15000 ? data : null
  } catch {
    return null
  }
})()

/** Wipe the screen in the other design's colour, then load it at the same section. */
export function switchDesign(fromEl) {
  const toClassic = !isClassicPath()
  const target = toClassic ? CLASSIC : MAIN
  try { sessionStorage.setItem(KEY, JSON.stringify({ id: currentSection(), t: Date.now() })) } catch { /* private mode: still switch */ }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.location.href = target
    return
  }
  const r = fromEl?.getBoundingClientRect()
  const x = r ? r.left + r.width / 2 : window.innerWidth / 2
  const y = r ? r.top + r.height / 2 : window.innerHeight / 2
  const wipe = document.createElement('div')
  Object.assign(wipe.style, {
    position: 'fixed', inset: '0', zIndex: '9999', pointerEvents: 'none',
    background: toClassic ? '#08161a' : '#e9ecef',
    clipPath: `circle(0px at ${x}px ${y}px)`,
    transition: 'clip-path 0.75s cubic-bezier(0.76, 0, 0.24, 1)',
  })
  document.body.appendChild(wipe)
  requestAnimationFrame(() => requestAnimationFrame(() => { wipe.style.clipPath = `circle(150vmax at ${x}px ${y}px)` }))
  setTimeout(() => { window.location.href = target }, 760)
}

/** After a switch, jump straight to the section the reader came from. */
export function useArrivalScroll() {
  useEffect(() => {
    const id = arrival?.id
    if (!id || id === 'top') return
    let landed = null
    const go = () => {
      const el = document.getElementById(id)
      if (!el) return
      const y = el.getBoundingClientRect().top + window.scrollY
      const lenis = getLenis()
      if (lenis) {
        lenis.resize() // the page grew after Lenis first measured it
        lenis.scrollTo(y, { immediate: true, force: true })
      } else {
        window.scrollTo(0, y)
      }
      landed = window.scrollY
    }
    const first = setTimeout(go, 90)
    // Layout can still shift (fonts, measured galleries); settle once more unless the reader has scrolled.
    const settle = setTimeout(() => { if (landed !== null && Math.abs(window.scrollY - landed) < 4) go() }, 650)
    return () => { clearTimeout(first); clearTimeout(settle) }
  }, [])
}
