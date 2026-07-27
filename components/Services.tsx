'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView] as const
}

const SERVICES = [
  {
    accent: '#ff8040',
    title: 'Website Development',
    desc: 'Pixel-perfect, blazing-fast websites that convert visitors into customers. Built with Next.js for peak performance, SEO, and long-term scalability.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    icon: (
      <svg width="22" height="22" fill="none" stroke="#ff8040" strokeWidth="1.5" strokeLinecap="round" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    accent: '#ff50a0',
    title: 'Web Applications',
    desc: 'Scalable SaaS platforms, dashboards, and business tools with real-time features and enterprise-grade architecture that grows with you.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    icon: (
      <svg width="22" height="22" fill="none" stroke="#ff50a0" strokeWidth="1.5" strokeLinecap="round" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    accent: '#a040ff',
    title: 'AI Integrations',
    desc: 'Embed GPT-4, Claude, and custom models into your product — from intelligent chatbots to fully automated content and data pipelines.',
    tags: ['OpenAI', 'Anthropic', 'LangChain'],
    icon: (
      <svg width="22" height="22" fill="none" stroke="#a040ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    accent: '#2060ff',
    title: 'Automation Solutions',
    desc: 'End-to-end workflow automation that eliminates bottlenecks, cuts operational costs, and frees your team to focus on high-value work.',
    tags: ['n8n', 'Make.com', 'Zapier'],
    icon: (
      <svg width="22" height="22" fill="none" stroke="#2060ff" strokeWidth="1.5" strokeLinecap="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12H5M19 12h3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
  },
]

function ServiceCard({ s, i }: { s: typeof SERVICES[0]; i: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(255,255,255,0.045)' : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? `${s.accent}40` : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 16,
        padding: '36px',
        cursor: 'default',
        transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
        transform: hovered ? 'translateY(-6px)' : 'none',
        boxShadow: hovered ? `0 24px 60px ${s.accent}18` : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle corner glow on hover */}
      {hovered && (
        <div style={{
          position: 'absolute', bottom: -50, right: -50,
          width: 180, height: 180, borderRadius: '50%',
          background: `radial-gradient(circle, ${s.accent}20 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
      )}

      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 13,
        background: `${s.accent}12`,
        border: `1px solid ${s.accent}25`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24,
        transition: 'all 0.3s',
        boxShadow: hovered ? `0 0 20px ${s.accent}30` : 'none',
      }}>
        {s.icon}
      </div>

      <h3 style={{
        fontFamily: 'var(--font-syne), sans-serif',
        fontSize: 20, fontWeight: 700,
        color: '#ffffff', marginBottom: 12, letterSpacing: '-0.01em',
      }}>
        {s.title}
      </h3>
      <p style={{
        color: 'rgba(255,255,255,0.44)', fontSize: 14.5,
        lineHeight: 1.72, marginBottom: 22, fontWeight: 300,
        fontFamily: 'var(--font-inter), sans-serif',
      }}>
        {s.desc}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {s.tags.map(tag => (
          <span key={tag} style={{
            background: `${s.accent}0e`,
            border: `1px solid ${s.accent}22`,
            color: 'rgba(255,255,255,0.38)',
            fontSize: 11, padding: '3px 10px', borderRadius: 100,
            fontWeight: 600, letterSpacing: '0.04em',
            fontFamily: 'var(--font-inter), sans-serif',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Services() {
  const [headerRef, headerInView] = useInView()

  return (
    <section id="services" style={{ padding: '130px 64px', background: '#000000' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: 72 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 20 }}
          >
            <span className="section-label">
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#ff8040', display: 'inline-block' }} />
              What We Build
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800, letterSpacing: '-0.03em',
              color: '#ffffff', marginBottom: 16, lineHeight: 1.05,
            }}
          >
            Services Built for<br />
            <span style={{
              background: 'linear-gradient(135deg, #ff8040, #ff50a0)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Market Leaders
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              color: 'rgba(255,255,255,0.42)', fontSize: 17,
              maxWidth: 500, lineHeight: 1.68, fontWeight: 300,
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            From design to deployment — premium digital products that drive measurable business results.
          </motion.p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: 18,
        }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
