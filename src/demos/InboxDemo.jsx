import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const seed = [
  {
    id: 1, from: 'Priya M.', subject: 'Where is my order #48213?', intent: 'Order status', confidence: 0.94,
    body: 'Hi, I ordered a week ago and the tracking hasn’t moved since Tuesday. Can you check?',
    reply: 'Hi Priya, thanks for checking in. Order #48213 left our Kitchener warehouse on Tuesday and is now at the FedEx hub in Mississauga. It should reach you Thursday. Your live tracking link is in the order email.',
  },
  {
    id: 2, from: 'Daniel O.', subject: 'Mug arrived broken', intent: 'Return · damaged', confidence: 0.89,
    body: 'The mug in my order came in pieces. Can I get a replacement?',
    reply: 'Hi Daniel, sorry it arrived broken. A replacement ships today, and I’ve attached a prepaid return label (RMA-2207). You don’t need to wait for the return to arrive.',
  },
  {
    id: 3, from: 'Aisha K.', subject: 'Change delivery address?', intent: 'Address change', confidence: 0.91,
    body: 'I just moved. Can you send order #48390 to 22 King St W instead?',
    reply: 'Hi Aisha, done. Order #48390 will now go to 22 King St W. It hasn’t left the warehouse yet, so there’s no delay or extra charge.',
  },
  {
    id: 4, from: 'Mark T.', subject: 'Third time asking. I want a manager.', intent: 'Complaint', confidence: 0.41,
    body: 'Nobody has answered my last two emails about the wrong item. This is unacceptable.',
    reply: null,
  },
]

export default function InboxDemo() {
  const [mails, setMails] = useState(seed.map((m) => ({ ...m, status: 'new' })))
  const [sel, setSel] = useState(1)
  const [typed, setTyped] = useState(0)
  const mail = mails.find((m) => m.id === sel)
  const resolved = mails.filter((m) => m.status === 'sent').length
  const escalated = mails.filter((m) => m.status === 'escalated').length

  const update = (id, status) => setMails((ms) => ms.map((m) => (m.id === id ? { ...m, status } : m)))

  useEffect(() => {
    if (mail?.status !== 'drafting') return
    setTyped(0)
    let n = 0
    const id = setInterval(() => {
      n += 3
      setTyped(n)
      if (n >= mail.reply.length) { clearInterval(id); update(mail.id, 'drafted') }
    }, 18)
    return () => clearInterval(id)
  }, [mail?.status, mail?.id, mail?.reply])

  return (
    <div className="demo inbox-demo">
      <div className="inbox-stats mono small">
        <span>Resolved <b>{resolved}</b></span>
        <span>Escalated <b>{escalated}</b></span>
        <span>Open <b>{mails.length - resolved - escalated}</b></span>
      </div>
      <div className="inbox-layout">
        <ul className="inbox-list">
          {mails.map((m) => (
            <li key={m.id}>
              <button className={`mail-row ${sel === m.id ? 'is-sel' : ''} is-${m.status}`} onClick={() => setSel(m.id)}>
                <span className="mail-from">{m.from}</span>
                <span className="mail-subject">{m.subject}</span>
                <span className="mail-state mono">{m.status === 'sent' ? '✓ sent' : m.status === 'escalated' ? '↑ human' : m.intent}</span>
              </button>
            </li>
          ))}
        </ul>
        <AnimatePresence mode="wait">
          <motion.div key={mail.id} className="mail-view" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
            <p className="mail-view-subject">{mail.subject}</p>
            <p className="mail-body">{mail.body}</p>
            <div className="intent-row">
              <span className={`badge ${mail.confidence > 0.7 ? 'badge-good' : 'badge-warn'}`}>{mail.intent}</span>
              <div className="confidence" aria-label={`Confidence ${Math.round(mail.confidence * 100)}%`}>
                <motion.span initial={{ width: 0 }} animate={{ width: `${mail.confidence * 100}%` }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className={mail.confidence > 0.7 ? '' : 'is-low'} />
              </div>
              <span className="mono small">{Math.round(mail.confidence * 100)}%</span>
            </div>

            {mail.reply ? (
              <>
                {mail.status !== 'new' && (
                  <div className="draft">
                    <span className="draft-label mono">AI draft · review before sending</span>
                    <p>{mail.status === 'drafting' ? mail.reply.slice(0, typed) : mail.reply}{mail.status === 'drafting' && <span className="caret" />}</p>
                  </div>
                )}
                <div className="row-actions">
                  {mail.status === 'new' && <button className="btn btn-accent" onClick={() => update(mail.id, 'drafting')}>Draft reply with AI</button>}
                  {mail.status === 'drafted' && <button className="btn btn-accent" onClick={() => update(mail.id, 'sent')}>Approve and send</button>}
                  {mail.status === 'sent' && <span className="badge badge-good">Sent. Customer replied “thanks!”</span>}
                </div>
              </>
            ) : (
              <div className="row-actions">
                <p className="small muted">Confidence is low, so this one goes to a person instead of the AI.</p>
                {mail.status === 'new'
                  ? <button className="btn btn-ghost" onClick={() => update(mail.id, 'escalated')}>Escalate to an agent</button>
                  : <span className="badge badge-warn">Assigned to Sam, Tier 2</span>}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <button className="link-btn small" onClick={() => { setMails(seed.map((m) => ({ ...m, status: 'new' }))); setSel(1) }}>Reset inbox</button>
    </div>
  )
}
