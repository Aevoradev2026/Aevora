'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const inp: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding: '14px 18px',
  color: '#ffffff',
  fontSize: 15,
  fontFamily: 'var(--font-inter), sans-serif',
  outline: 'none',
  transition: 'border-color 0.3s, box-shadow 0.3s',
}

const lbl: React.CSSProperties = {
  display: 'block',
  color: 'rgba(255,255,255,0.3)',
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  marginBottom: 8,
  fontFamily: 'var(--font-inter), sans-serif',
}

export default function Consult() {
  const [form, setForm] = useState({ name: '', email: '', type: '', budget: '', desc: '' })
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')
  const [done, setDone] = useState(false)

  const fi = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(255,80,160,0.5)'
    e.target.style.boxShadow = '0 0 0 3px rgba(255,80,160,0.1)'
  }
  const fo = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.1)'
    e.target.style.boxShadow = 'none'
  }

  const submit = async () => {
    if (!form.name || !form.email || !form.desc) return
    setLoading(true)
    setResponse('')
    try {
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          type: form.type,
          budget: form.budget,
          description: form.desc,
        }),
      })
      const data = await res.json()
      setResponse(data.response || '')
      setDone(true)
    } catch {
      setResponse('Thank you for reaching out. Our team will contact you within 24 hours.\n\n— The Aevora Team')
      setDone(true)
    }
    setLoading(false)
  }

  return (
    <section
      id="consult"
      style={{
        padding: '130px 64px',
        background: '#000000',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <span className="section-label" style={{ marginBottom: 24, display: 'inline-flex' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#ff50a0', display: 'inline-block', animation: 'dotPulse 2s ease infinite' }} />
            AI-Powered Consultation
          </span>
          <h2 style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 'clamp(34px, 5vw, 62px)',
            fontWeight: 800, letterSpacing: '-0.03em',
            color: '#ffffff', marginTop: 20, marginBottom: 16, lineHeight: 1.05,
          }}>
            Describe Your Project.
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #ff8040, #ff50a0, #a040ff)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Get a Strategy Instantly.
            </span>
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.4)', fontSize: 17, lineHeight: 1.68,
            fontWeight: 300, maxWidth: 500, margin: '0 auto',
            fontFamily: 'var(--font-inter), sans-serif',
          }}>
            Submit your brief and Claude AI generates a personalized strategic response in seconds. Our team follows up within 24 hours.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20, padding: 48, position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Top accent line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,80,160,0.5), rgba(160,64,255,0.4), transparent)',
          }} />

          {/* Background glow */}
          <div style={{
            position: 'absolute', top: -80, right: -80, width: 260, height: 260,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,80,160,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Row 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
            {[
              { l: 'Your Name', k: 'name', ph: 'John Smith', t: 'text' },
              { l: 'Email Address', k: 'email', ph: 'john@company.com', t: 'email' },
            ].map(({ l, k, ph, t }) => (
              <div key={k}>
                <label style={lbl}>{l}</label>
                <input
                  type={t} placeholder={ph}
                  value={form[k as keyof typeof form]}
                  onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))}
                  style={{ ...inp }}
                  onFocus={fi} onBlur={fo}
                />
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
            {[
              { l: 'Project Type', k: 'type', opts: [['', 'Select type…'], ['website', 'Website Development'], ['webapp', 'Web Application'], ['ai', 'AI Integration'], ['automation', 'Automation'], ['other', 'Other']] },
              { l: 'Budget Range',  k: 'budget', opts: [['', 'Select budget…'], ['5-15k', '$5k – $15k'], ['15-50k', '$15k – $50k'], ['50-150k', '$50k – $150k'], ['150k+', '$150k+']] },
            ].map(({ l, k, opts }) => (
              <div key={k}>
                <label style={lbl}>{l}</label>
                <select
                  value={form[k as keyof typeof form]}
                  onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))}
                  style={{ ...inp, cursor: 'pointer', color: form[k as keyof typeof form] ? '#ffffff' : 'rgba(255,255,255,0.3)' }}
                  onFocus={fi} onBlur={fo}
                >
                  {opts.map(([v, lbl]) => (
                    <option key={v} value={v} style={{ background: '#050508', color: '#ffffff' }}>{lbl}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Description */}
          <div style={{ marginBottom: 28 }}>
            <label style={lbl}>Project Description</label>
            <textarea
              rows={4}
              placeholder="Describe your project, goals, timeline, and any specific requirements…"
              value={form.desc}
              onChange={e => setForm(p => ({ ...p, desc: e.target.value }))}
              style={{ ...inp, resize: 'vertical', minHeight: 100 }}
              onFocus={fi} onBlur={fo}
            />
          </div>

          {/* Submit */}
          <button
            onClick={submit}
            disabled={loading || done}
            style={{
              width: '100%', padding: '18px', fontSize: 16, borderRadius: 10,
              fontWeight: 700, fontFamily: 'var(--font-inter), sans-serif',
              letterSpacing: '-0.01em', cursor: loading ? 'wait' : 'pointer',
              border: 'none', color: '#000000',
              background: done
                ? 'linear-gradient(135deg, #20b060, #10803a)'
                : 'linear-gradient(135deg, #ffffff, #e0e0e0)',
              opacity: loading ? 0.7 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { if (!loading && !done) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(255,255,255,0.18)' } }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
          >
            {loading ? (
              <>
                <div style={{ width: 18, height: 18, border: '2.5px solid rgba(0,0,0,0.2)', borderTopColor: '#000000', borderRadius: '50%', animation: 'spinFast 0.65s linear infinite' }} />
                Generating Your Strategy…
              </>
            ) : done ? (
              <>
                <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>
                Strategy Generated
              </>
            ) : (
              <>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                Get AI Strategy →
              </>
            )}
          </button>

          {/* AI Response */}
          {response && (
            <div style={{
              marginTop: 28, padding: 28,
              background: 'rgba(255,80,160,0.06)',
              border: '1px solid rgba(255,80,160,0.2)',
              borderRadius: 14, animation: 'aiSlideIn 0.5s ease',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff8040, #ff50a0, #a040ff)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  animation: 'glowRing 3s ease infinite',
                }}>
                  <svg width="15" height="15" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: '#ff80c0', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-inter), sans-serif' }}>
                  Aevora AI Strategy
                </span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: 15.5, lineHeight: 1.84, fontWeight: 300, whiteSpace: 'pre-line', fontFamily: 'var(--font-inter), sans-serif' }}>
                {response}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
