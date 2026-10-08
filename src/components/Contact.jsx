import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Magnetic, Reveal, SectionHead } from './Fx'
import { profile } from '../data'
import { copyText, toast } from '../lib/events'

function TorontoClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id) }, [])
  const time = now.toLocaleTimeString('en-CA', { timeZone: profile.timezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
  const hour = +now.toLocaleString('en-CA', { timeZone: profile.timezone, hour: '2-digit', hour12: false })
  return <><b className="mono">{time}</b><span className="muted">{hour >= 9 && hour < 19 ? 'Usually replies within a few hours' : 'Replies next morning'}</span></>
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.message) return toast('Add your name and a message first')
    const subject = encodeURIComponent(`Hello from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n${form.name}${form.email ? ` · ${form.email}` : ''}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    toast('Opening your email app…')
  }

  return (
    <section id="contact" data-label="Contact" className="section contact">
      <div className="wrap">
        <SectionHead path="contact" title="Let’s build something people enjoy using" accent={[3]} />
        <div className="contact-grid">
          <div className="contact-left">
            <Magnetic strength={0.2}>
              <button className="email-big" data-cursor="Copy" onClick={() => copyText(profile.email, 'Email copied to clipboard')}>
                <span className="email-text">{profile.email.split('@')[0]}@<wbr />{profile.email.split('@')[1]}</span>
                <span className="email-hint mono">click to copy</span>
              </button>
            </Magnetic>
            <div className="contact-cards">
              <Reveal className="contact-card">
                <span className="card-label">LinkedIn</span>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-link">in/lakhtar-singh ↗</a>
              </Reveal>
              <Reveal className="contact-card" delay={0.08}>
                <span className="card-label">Phone</span>
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="contact-link">{profile.phone}</a>
              </Reveal>
              <Reveal className="contact-card" delay={0.16}>
                <span className="card-label">Toronto time</span>
                <TorontoClock />
              </Reveal>
            </div>
          </div>
          <motion.form
            className="contact-form"
            onSubmit={submit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <label className="float-field">
              <input id="c-name" value={form.name} onChange={set('name')} placeholder=" " autoComplete="name" />
              <span>Your name</span>
            </label>
            <label className="float-field">
              <input id="c-email" type="email" value={form.email} onChange={set('email')} placeholder=" " autoComplete="email" />
              <span>Your email</span>
            </label>
            <label className="float-field">
              <textarea id="c-message" rows="4" value={form.message} onChange={set('message')} placeholder=" " />
              <span>What are you building?</span>
            </label>
            <Magnetic strength={0.15}><button type="submit" className="btn btn-accent btn-block" data-cursor="Send">Send message</button></Magnetic>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
