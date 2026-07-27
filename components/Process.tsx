'use client'

import { motion } from 'framer-motion'

const STEPS = [
  { n: '01', title: 'Discovery',    color: '#ff8040', desc: 'We map your business goals, audience, and competitive landscape before a single line of code is written. Validated clarity first — no assumptions.' },
  { n: '02', title: 'Strategy',     color: '#ff50a0', desc: 'Architecture, tech stack, conversion paths, and KPIs — all defined upfront and tied to measurable business outcomes.' },
  { n: '03', title: 'Design',       color: '#a040ff', desc: 'A premium visual system: typography, motion language, and micro-interactions that set you apart from every competitor in your market.' },
  { n: '04', title: 'Development',  color: '#6040ff', desc: 'Clean, maintainable code with automated testing at every stage. Performance-first architecture that scales as you grow.' },
  { n: '05', title: 'Launch',       color: '#2060ff', desc: 'Meticulous QA, performance tuning, full SEO setup, and a white-glove handoff with comprehensive documentation.' },
]

export default function Process() {
  return (
    <section
      id="process"
      style={{
        padding: '130px 64px',
        background: '#000000',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'start' }}>

          {/* Left — sticky */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ position: 'sticky', top: 120 }}
          >
            <span className="section-label" style={{ marginBottom: 24, display: 'inline-flex' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#a040ff', display: 'inline-block' }} />
              How We Work
            </span>

            <h2 style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(34px, 4vw, 58px)',
              fontWeight: 800, letterSpacing: '-0.03em',
              color: '#ffffff', marginTop: 20, marginBottom: 20, lineHeight: 1.05,
            }}>
              A Process Built<br />
              <span style={{
                background: 'linear-gradient(135deg, #ff8040, #a040ff)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                for Excellence
              </span>
            </h2>

            <p style={{
              color: 'rgba(255,255,255,0.42)', fontSize: 16.5, lineHeight: 1.72,
              fontWeight: 300, marginBottom: 56,
              fontFamily: 'var(--font-inter), sans-serif',
            }}>
              Five sequential stages, zero shortcuts. Our methodology consistently delivers exceptional results — on time and on budget.
            </p>

            {/* Orbital dial */}
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                width: 188, height: 188, borderRadius: '50%',
                background: 'conic-gradient(from 0deg, rgba(255,128,64,0.18), rgba(255,80,160,0.12), rgba(160,64,255,0.1), rgba(32,96,255,0.08), rgba(255,128,64,0.18))',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'spinOrbit 22s linear infinite',
              }}>
                <div style={{
                  width: 140, height: 140, borderRadius: '50%',
                  background: '#050508',
                  border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'spinReverse 22s linear infinite',
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontFamily: 'var(--font-syne), sans-serif',
                      fontSize: 44, fontWeight: 800, color: '#ffffff', lineHeight: 1,
                    }}>5</div>
                    <div style={{
                      fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em',
                      textTransform: 'uppercase', fontWeight: 600, marginTop: 5,
                      fontFamily: 'var(--font-inter), sans-serif',
                    }}>stages</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — steps */}
          <div style={{ paddingTop: 8 }}>
            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'relative', paddingLeft: 60, marginBottom: 48 }}
              >
                {/* Number circle */}
                <div style={{
                  position: 'absolute', left: 0, top: 0,
                  width: 44, height: 44, borderRadius: '50%',
                  background: `${s.color}12`,
                  border: `1px solid ${s.color}35`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-syne), sans-serif',
                    fontSize: 12, fontWeight: 800, color: s.color,
                  }}>
                    {s.n}
                  </span>
                </div>

                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div style={{
                    position: 'absolute', left: 21, top: 50,
                    width: 1, height: 50,
                    background: `linear-gradient(to bottom, ${s.color}35, ${STEPS[i + 1].color}10)`,
                  }} />
                )}

                <h3 style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontSize: 22, fontWeight: 700,
                  color: '#ffffff', marginBottom: 10, letterSpacing: '-0.01em',
                }}>
                  {s.title}
                </h3>
                <p style={{
                  color: 'rgba(255,255,255,0.42)', fontSize: 14.5, lineHeight: 1.72, fontWeight: 300,
                  fontFamily: 'var(--font-inter), sans-serif',
                }}>
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
