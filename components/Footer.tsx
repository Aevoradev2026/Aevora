'use client'
import Image from 'next/image'

import { motion } from 'framer-motion'

const LINKS = [
  {
    title: 'Services',
    items: ['Website Development', 'Web Applications', 'AI Integrations', 'Automation Solutions'],
  },
  {
    title: 'Company',
    items: ['About', 'Portfolio', 'Process', 'Blog'],
  },
  {
    title: 'Connect',
    items: ['Start a Project', 'Schedule a Call', 'Contact Us', 'Careers'],
  },
]

const SOCIALS = [
  {
    label: 'X / Twitter',
    path: 'M18 6L6 18M6 6l12 12',
  },
  {
    label: 'LinkedIn',
    path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z',
  },
  {
    label: 'GitHub',
    path: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22',
  },
]

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '72px 64px 40px',
        background: '#000000',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Top grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 60,
            marginBottom: 64,
          }}
        >
          {/* Brand column */}
          <div>
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                display: 'flex', alignItems: 'center', gap: 9,
                background: 'none', border: 'none', cursor: 'pointer',
                marginBottom: 20, padding: 0,
              }}
            >
              <Image src="/logo.png" width={64} height={64} alt="Aevora Logo" />
              <span
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontSize: 17, fontWeight: 800, color: '#ffffff',
                  letterSpacing: '-0.01em',
                }}
              >
                AEVORA
              </span>
            </button>

            <p
              style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: 13.5, lineHeight: 1.78,
                maxWidth: 260, fontWeight: 300,
                fontFamily: 'var(--font-inter), sans-serif',
              }}
            >
              Premium web development agency crafting digital experiences that define categories and drive extraordinary results.
            </p>

            {/* Socials */}
            <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
              {SOCIALS.map(s => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', background: 'transparent',
                    transition: 'all 0.25s', color: 'rgba(255,255,255,0.35)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,80,160,0.45)'
                    e.currentTarget.style.color = '#ff80c0'
                    e.currentTarget.style.background = 'rgba(255,80,160,0.07)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.35)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <svg
                    width="14" height="14" fill="none"
                    stroke="currentColor" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d={s.path} />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {LINKS.map(col => (
            <div key={col.title}>
              <div
                style={{
                  fontSize: 10.5, fontWeight: 700,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)',
                  marginBottom: 20,
                  fontFamily: 'var(--font-inter), sans-serif',
                }}
              >
                {col.title}
              </div>
              {col.items.map(item => (
                <div key={item} style={{ marginBottom: 13 }}>
                  <span
                    style={{
                      color: 'rgba(255,255,255,0.38)',
                      fontSize: 13.5, cursor: 'pointer',
                      transition: 'color 0.2s',
                      fontFamily: 'var(--font-inter), sans-serif',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: 28,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <span
            style={{
              color: 'rgba(255,255,255,0.2)',
              fontSize: 12.5,
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            © 2025 Aevora Studio. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
              <span
                key={link}
                style={{
                  color: 'rgba(255,255,255,0.2)',
                  fontSize: 12.5, cursor: 'pointer',
                  transition: 'color 0.2s',
                  fontFamily: 'var(--font-inter), sans-serif',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
              >
                {link}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
