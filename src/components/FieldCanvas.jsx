import { useEffect, useRef } from 'react'

/** Dot grid that ripples gently and scatters away from the pointer. */
export default function FieldCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse = { x: -9999, y: -9999 }
    let w = 0, h = 0, pts = [], raf = 0, visible = true

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = canvas.getBoundingClientRect()
      w = r.width; h = r.height
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const gap = w < 640 ? 28 : 34
      pts = []
      for (let y = gap / 2; y < h; y += gap)
        for (let x = gap / 2; x < w; x += gap) pts.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 })
    }

    const frame = (t) => {
      ctx.clearRect(0, 0, w, h)
      const R = 170
      for (const p of pts) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y
        const d = Math.hypot(dx, dy) || 1
        if (d < R) {
          const f = (1 - d / R) * 2.4
          p.vx += (dx / d) * f; p.vy += (dy / d) * f
        }
        const wave = reduce ? 0 : Math.sin(t * 0.0012 + p.ox * 0.012 + p.oy * 0.016) * 3
        p.vx += (p.ox - p.x) * 0.06; p.vy += (p.oy + wave - p.y) * 0.06
        p.vx *= 0.82; p.vy *= 0.82
        p.x += p.vx; p.y += p.vy
        const near = Math.max(0, 1 - d / (R * 1.25))
        if (near > 0.45) {
          ctx.strokeStyle = `rgba(255,180,84,${(near - 0.45) * 0.5})`
          ctx.lineWidth = 0.6
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
        }
        const s = 1.3 + near * 2.6
        ctx.fillStyle = near > 0 ? `rgba(255,180,84,${0.25 + near * 0.75})` : 'rgba(125,211,192,0.2)'
        ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s)
      }
      if (visible) raf = requestAnimationFrame(frame)
    }

    const move = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
    }
    const leave = () => { mouse.x = -9999; mouse.y = -9999 }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(frame)
    })

    resize()
    io.observe(canvas)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(raf); io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [])

  return <canvas ref={ref} className="field-canvas" aria-hidden="true" />
}
