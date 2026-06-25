import React, { useState } from 'react'

const FIELDS = [
  { id: 'name',        label: 'Full Name',     type: 'text',     placeholder: 'Jane Smith',              required: true  },
  { id: 'email',       label: 'Email Address', type: 'email',    placeholder: 'jane@company.com',        required: true  },
  { id: 'phone',       label: 'Phone Number',  type: 'tel',      placeholder: '+1 (555) 000-0000',       required: false },
  { id: 'company',     label: 'Company Name',  type: 'text',     placeholder: 'Acme Corporation',        required: false },
  { id: 'requirement', label: 'Requirement',   type: 'textarea', placeholder: 'Tell us how we can help…', required: false },
]

export default function LeadForm() {
  const [form, setForm]       = useState({ name:'', email:'', phone:'', company:'', requirement:'' })
  const [status, setStatus]   = useState(null) // null | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('')

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || 'Server error')
      }
      const emailFailed = res.headers.get('X-Email-Status') === 'failed'
      setStatus('success')
      setMessage(
        emailFailed
          ? '✅ Lead saved! (Email delivery failed – check SMTP config)'
          : '🎉 Lead saved & confirmation email sent!'
      )
      setForm({ name:'', email:'', phone:'', company:'', requirement:'' })
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Something went wrong.')
    }
  }

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '48px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }} className="fade-in">
        <div style={{
          width: 64, height: 64, borderRadius: 18,
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px', fontSize: 28,
          boxShadow: '0 8px 30px rgba(99,102,241,0.4)',
        }}>🚀</div>
        <h1 className="gradient-text" style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>
          Get in Touch
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 15 }}>
          Fill out the form below and we'll reach out within 24 hours.
        </p>
      </div>

      <div className="glass fade-in" style={{ padding: '36px 32px', animationDelay: '0.1s' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: 20 }}>
            {FIELDS.map(f => (
              <div key={f.id}>
                <label
                  htmlFor={f.id}
                  style={{ display:'block', marginBottom:6, fontSize:13,
                           fontWeight:500, color:'#c4b5fd', letterSpacing:'0.3px' }}
                >
                  {f.label}{f.required && <span style={{ color:'#f87171', marginLeft:3 }}>*</span>}
                </label>
                {f.type === 'textarea' ? (
                  <textarea
                    id={f.id}
                    className="input-field"
                    placeholder={f.placeholder}
                    value={form[f.id]}
                    onChange={handleChange}
                    rows={4}
                    style={{ resize:'vertical' }}
                  />
                ) : (
                  <input
                    id={f.id}
                    type={f.type}
                    className="input-field"
                    placeholder={f.placeholder}
                    value={form[f.id]}
                    onChange={handleChange}
                    required={f.required}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Status banner */}
          {message && (
            <div style={{
              marginTop: 20, padding: '12px 16px', borderRadius: 10, fontSize: 14,
              fontWeight: 500,
              background: status === 'success'
                ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
              border: `1px solid ${status === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
              color: status === 'success' ? '#34d399' : '#f87171',
            }}>
              {message}
            </div>
          )}

          <button
            type="submit"
            id="submit-lead-btn"
            className="btn-primary"
            disabled={status === 'loading'}
            style={{ width:'100%', marginTop:28, fontSize:16 }}
          >
            {status === 'loading'
              ? <span>⏳ Submitting…</span>
              : 'Submit Enquiry →'}
          </button>
        </form>
      </div>

      <p style={{ textAlign:'center', marginTop:24, color:'#475569', fontSize:13 }}>
        🔒 Your information is kept private and secure.
      </p>
    </div>
  )
}
