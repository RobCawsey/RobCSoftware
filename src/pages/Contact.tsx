import { useState, type FormEvent } from 'react'
import { Github, Mail } from 'lucide-react'
import { submitContactForm } from '../lib/contact'
import './Contact.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')

  function validate() {
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = 'Enter your name'
    if (!email.trim()) next.email = 'Enter your email'
    else if (!EMAIL_RE.test(email.trim())) next.email = 'Enter a valid email address'
    if (!message.trim()) next.message = 'Enter a message'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    try {
      await submitContactForm({ name: name.trim(), email: email.trim(), message: message.trim() })
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="container" style={{ padding: '48px 0 64px' }}>
      <h1 style={{ marginBottom: 8 }}>Contact</h1>
      <p style={{ marginBottom: 32 }}>Questions, feedback or collaboration ideas — send a message.</p>

      <div className="contact-grid">
        <form onSubmit={handleSubmit} noValidate>
          <label style={fieldLabelStyle}>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            style={inputStyle}
          />
          {errors.name && <div style={errorStyle}>{errors.name}</div>}

          <label style={fieldLabelStyle}>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            style={inputStyle}
          />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}

          <label style={fieldLabelStyle}>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What's on your mind?"
            style={{ ...inputStyle, height: 120, resize: 'vertical' }}
          />
          {errors.message && <div style={errorStyle}>{errors.message}</div>}

          <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }} disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send message'}
          </button>

          {status === 'success' && (
            <div style={{ marginTop: 12, fontSize: 13.5, color: 'var(--accent-evolab)' }}>
              Message sent. Thanks for reaching out.
            </div>
          )}
          {status === 'error' && (
            <div style={{ marginTop: 12, fontSize: 13.5, color: 'var(--accent-emulator)' }}>
              Couldn't send that. Try again, or email me directly below.
            </div>
          )}
        </form>

        <div style={{ fontSize: 13.5, color: 'var(--color-text-secondary)', lineHeight: 1.9 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Mail size={16} />
            <a href="mailto:robcawsey@outlook.com">robcawsey@outlook.com</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Github size={16} />
            <a href="https://github.com/rob-cawsey" target="_blank" rel="noreferrer">
              github.com/rob-cawsey
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const fieldLabelStyle = {
  display: 'block',
  fontSize: 13,
  color: 'var(--color-text-secondary)',
  marginBottom: 4,
}

const inputStyle = {
  width: '100%',
  padding: '9px 12px',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius)',
  marginBottom: 4,
}

const errorStyle = {
  fontSize: 12.5,
  color: 'var(--accent-emulator)',
  marginBottom: 12,
}
