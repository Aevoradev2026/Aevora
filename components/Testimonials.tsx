'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote: 'Aevora rebuilt our entire platform in 8 weeks. Conversion rate jumped 340% in the first month. They think about your business, not just your design — and it shows in every pixel.',
    name: 'Sarah Chen',
    role: 'CEO, Nexus Technologies',
    init: 'SC',
    g1: '#ff8040',
    g2: '#ff50a0',
  },
  {
    quote: 'The AI integration they built processes 10,000 documents per day. What took our team 3 weeks now takes 4 hours. That\'s the kind of ROI that fundamentally changes what your company can do.',
    name: 'Marcus Rodriguez',
    role: 'Founder, Orbis SaaS',
    init: 'MR',
    g1: '#a040ff',
    g2: '#2060ff',
  },
  {
    quote: 'I\'ve worked with agencies on four continents. Aevora is in a completely different category. The quality, communication, and final product are the best I\'ve encountered — by a significant margin.',
    name: 'Alexandra Kim',
    role: 'CTO, MedCore Health',
    init: 'AK',
    g1: '#ff50a0',
    g2: '#a040ff',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive(p => (p + 1) % TESTIMONIALS.length), 5500)
    return () => clearInterval(id)
  }, [paused])

  const t = TESTIMONIALS[active]

  return (
    <section
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
          <span className="section-label" style={{ marginBottom: 20, display: 'inline-flex' }}>
            <span
              style={{
                width: 5, height: 5, borderRadius: '50%',
                background: '#a040ff', display: 'inline-block',
              }}
            />
            Client Stories
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(34px, 5vw, 60px)',
              fontWeight: 800, letterSpacing: '-0.03em',
              color: '#ffffff', marginTop: 20, lineHeight: 1.05,
            }}
          >
            Trusted by{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #a040ff, #2060ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Visionaries
            </span>
          </h2>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            padding: '52px 56px',
            position: 'relative',
            overflow: 'hidden',
            minHeight: 260,
          }}
        >
          {/* Decorative quote mark */}
          <div
            style={{
              position: 'absolute', top: 20, left: 36,
              fontSize: 100, lineHeight: 1,
              color: 'rgba(255,255,255,0.04)',
              fontFamily: 'Georgia, serif', fontWeight: 700,
              pointerEvents: 'none', userSelect: 'none',
            }}
          >
            "
          </div>

          {/* Dynamic background glow matching active testimonial */}
          <div
            style={{
              position: 'absolute', bottom: -60, right: -60,
              width: 220, height: 220, borderRadius: '50%',
              background: `radial-gradient(circle, ${t.g1}12 0%, transparent 70%)`,
              transition: 'all 0.8s ease',
              pointerEvents: 'none',
            }}
          />

          {/* Testimonial content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                style={{
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: 'clamp(16px, 1.8vw, 19px)',
                  lineHeight: 1.78, fontWeight: 300,
                  fontStyle: 'italic', marginBottom: 36,
                  paddingTop: 20,
                  fontFamily: 'var(--font-inter), sans-serif',
                }}
              >
                "{t.quote}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {/* Avatar */}
                <div
                  style={{
                    width: 46, height: 46, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${t.g1}, ${t.g2})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 15, fontWeight: 800, color: '#ffffff',
                    fontFamily: 'var(--font-syne), sans-serif',
                    flexShrink: 0,
                  }}
                >
                  {t.init}
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-syne), sans-serif',
                      fontSize: 15, fontWeight: 700, color: '#ffffff',
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontSize: 13, color: 'rgba(255,255,255,0.32)',
                      marginTop: 3, fontFamily: 'var(--font-inter), sans-serif',
                    }}
                  >
                    {t.role}
                  </div>
                </div>

                {/* Stars */}
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 3 }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={t.g1} stroke="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation dots */}
        <div
          style={{
            display: 'flex', gap: 8, justifyContent: 'center', marginTop: 28,
          }}
        >
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setPaused(true) }}
              style={{
                width: active === i ? 28 : 8,
                height: 8, borderRadius: 100, border: 'none',
                background: active === i
                  ? `linear-gradient(90deg, ${TESTIMONIALS[i].g1}, ${TESTIMONIALS[i].g2})`
                  : 'rgba(255,255,255,0.15)',
                cursor: 'pointer', padding: 0,
                transition: 'all 0.35s ease',
              }}
            />
          ))}
        </div>

        {/* Social proof logos row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            marginTop: 72, paddingTop: 48,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', gap: 48, justifyContent: 'center',
            alignItems: 'center', flexWrap: 'wrap',
          }}
        >
          {['Nexus', 'Orbis', 'Luminary', 'MedCore', 'Vaulta', 'Haven'].map((name, i) => (
            <span
              key={name}
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 16, fontWeight: 800,
                color: 'rgba(255,255,255,0.12)',
                letterSpacing: '-0.01em',
                transition: 'color 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.12)')}
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
