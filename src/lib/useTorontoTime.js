import { useEffect, useState } from 'react'
import { profile } from '../data'

/** Live Toronto clock plus a reply-time hint for the contact sections. */
export function useTorontoTime() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id) }, [])
  const time = now.toLocaleTimeString('en-CA', { timeZone: profile.timezone, hour: '2-digit', minute: '2-digit', hour12: false })
  const hour = +now.toLocaleString('en-CA', { timeZone: profile.timezone, hour: '2-digit', hour12: false })
  return { time, hint: hour >= 9 && hour < 19 ? 'Usually replies within a few hours' : 'Replies next morning' }
}
