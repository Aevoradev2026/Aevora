'use client'

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
    label: 'Instagram',
    href: 'https://instagram.com/aevora.dev',
    path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M6.5 2h11A4.5 4.5 0 0122 6.5v11a4.5 4.5 0 01-4.5 4.5h-11A4.5 4.5 0 012 17.5v-11A4.5 4.5 0 016.5 2z',
  },
  {
    label: 'Telegram',
    href: 'https://t.me/aevoradev',
    path: 'M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z',
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
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
                <polygon points="16,2 30,9 30,23 16,30 2,23 2,9" fill="none" stroke="white" strokeWidth="1.4" />
                <polygon points="16,8 24,12.5 24,21.5 16,26 8,21.5 8,12.5" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7" />
                <circle cx="16" cy="16" r="2.8" fill="white" />
              </svg>
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
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', background: 'transparent',
                    transition: 'all 0.25s', color: 'rgba(255,255,255,0.35)',
                    textDecoration: 'none',
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
                </a>
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
