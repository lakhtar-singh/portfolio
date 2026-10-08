import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { SectionHeadV2 } from './Shared'
import { Magnetic } from '../components/Fx'
import { profile, sectionCopy } from '../data'
import { useTorontoTime } from '../lib/useTorontoTime'
import { copyText, toast } from '../lib/events'

const topics = ['A full-stack role', 'A team lead role', 'A freelance project', 'Just saying hi']
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export default function ChatContact() {
  const ref = useRef(null)
  const scroller = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const [msgs, setMsgs] = useState([])
  const [typing, setTyping] = useState(false)
  const [stage, setStage] = useState('intro')
  const [input, setInput] = useState('')
  const [form, setForm] = useState({ name: '', topic: '', email: '' })
  const timers = useRef([])
  const toronto = useTorontoTime()

  const say = (texts, next) => {
    let t = 0
    texts.forEach((text, i) => {
      timers.current.push(setTimeout(() => setTyping(true), t))
      t += 650 + Math.min(text.length * 9, 700)
      timers.current.push(setTimeout(() => {
        setTyping(false)
        setMsgs((m) => [...m, { from: 'me', text, id: `${Date.now()}-${i}` }])
        if (i === texts.length - 1 && next) setStage(next)
      }, t))
      t += 250
    })
  }
  const you = (text) => setMsgs((m) => [...m, { from: 'you', text, id: `${Date.now()}-y` }])

  useEffect(() => {
    if (!inView) return
    say(['Hi, I’m Lakhtar. I build full-stack products and I’ve led the team that ships them.', 'What should I call you?'], 'name')
  }, [inView])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  useEffect(() => { scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' }) }, [msgs, typing])

  const submit = (e) => {
    e.preventDefault()
    const v = input.trim()
    if (!v) return
    setInput('')
    if (stage === 'name') {
      you(v)
      setForm((f) => ({ ...f, name: v }))
      setStage('wait')
      say([`Nice to meet you, ${v}. What brings you here?`], 'topic')
    } else if (stage === 'topic') {
      chooseTopic(v)
    } else if (stage === 'email') {
      you(v)
      if (!emailOk(v)) { setStage('wait'); say(['That doesn’t look like an email address. Mind checking it?'], 'email'); return }
      setForm((f) => ({ ...f, email: v }))
      setStage('wait')
      say([`Thanks, ${form.name}. Press send and your email app opens with all of this filled in. I usually reply within a day.`], 'done')
    }
  }

  const chooseTopic = (t) => {
    you(t)
    setForm((f) => ({ ...f, topic: t }))
    setStage('wait')
    say(['Good to hear. What email should I reply to?'], 'email')
  }

  const send = () => {
    const subject = encodeURIComponent(`${form.topic} · from ${form.name}`)
    const body = encodeURIComponent(`Hi Lakhtar,\n\nI'm reaching out about: ${form.topic}.\n\n${form.name}\n${form.email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    toast('Opening your email app…')
  }

  const restart = () => {
    timers.current.forEach(clearTimeout)
    setMsgs([]); setForm({ name: '', topic: '', email: '' }); setStage('intro')
    say(['Let’s start again. What should I call you?'], 'name')
  }

  const placeholder = { name: 'Type your name…', topic: 'Or type your own reason…', email: 'you@company.com' }[stage]

  return (
    <section id="contact" data-label={sectionCopy.contact.label} className="v2-section v2-contact" ref={ref}>
      <div className="v2-wrap">
        <SectionHeadV2 label={sectionCopy.contact.label} title={sectionCopy.contact.title} accent={sectionCopy.contact.accent} intro={sectionCopy.contact.intro} />
        <div className="v2-contact-grid">
          <div className="v2-chat">
            <div className="v2-chat-head">
              <span className="v2-avatar">LS</span>
              <div><b>Lakhtar Singh</b><span>{typing ? 'typing…' : 'Usually replies within a day'}</span></div>
            </div>
            <div className="v2-chat-body" ref={scroller} data-lenis-prevent>
              <AnimatePresence initial={false}>
                {msgs.map((m) => (
                  <motion.p
                    key={m.id}
                    className={`v2-bubble from-${m.from}`}
                    initial={{ opacity: 0, y: 16, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  >
                    {m.text}
                  </motion.p>
                ))}
                {typing && (
                  <motion.p key="typing" className="v2-bubble from-me v2-typing" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                    <i /><i /><i />
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {stage === 'topic' && (
              <div className="v2-quick">
                {topics.map((t, i) => (
                  <motion.button key={t} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} onClick={() => chooseTopic(t)}>{t}</motion.button>
                ))}
              </div>
            )}

            {stage === 'done' ? (
              <div className="v2-chat-actions">
                <button className="v2-btn" onClick={send}>Send email</button>
                <button className="v2-btn v2-btn-ghost" onClick={restart}>Start over</button>
              </div>
            ) : (
              <form className="v2-chat-input" onSubmit={submit}>
                <input
                  id="v2-chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={placeholder ?? 'One moment…'}
                  disabled={!['name', 'topic', 'email'].includes(stage)}
                  type={stage === 'email' ? 'email' : 'text'}
                  aria-label="Your reply"
                  autoComplete={stage === 'email' ? 'email' : stage === 'name' ? 'name' : 'off'}
                />
                <button className="v2-send" disabled={!input.trim()} aria-label="Send reply">↑</button>
              </form>
            )}
          </div>

          <div className="v2-direct">
            <Magnetic strength={0.15} className="v2-mag-block">
              <button className="v2-email" onClick={() => copyText(profile.email, 'Email copied to clipboard')}>
                <span className="v2-label">Email · click to copy</span>
                <b>{profile.email}</b>
              </button>
            </Magnetic>
            <a className="v2-direct-row" href={profile.linkedin} target="_blank" rel="noreferrer"><span className="v2-label">LinkedIn</span><b>in/lakhtar-singh ↗</b></a>
            <a className="v2-direct-row" href={`tel:${profile.phone.replace(/\s/g, '')}`}><span className="v2-label">Phone</span><b>{profile.phone}</b></a>
            <div className="v2-direct-row"><span className="v2-label">Toronto time</span><b>{toronto.time} <span className="v2-direct-hint">{toronto.hint}</span></b></div>
            <div className="v2-direct-row"><span className="v2-label">Status</span><b>{profile.status}</b></div>
          </div>
        </div>
      </div>
    </section>
  )
}
