'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function MiniGalaxy() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 3, 7)
    camera.lookAt(0, 0, 0)

    // Mini galaxy — same style as hero but smaller & purely decorative
    const COUNT  = 50000
    const pos    = new Float32Array(COUNT * 3)
    const col    = new Float32Array(COUNT * 3)

    const cA = new THREE.Color('#ff1090')
    const cB = new THREE.Color('#8030ff')
    const cC = new THREE.Color('#1840ff')

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      const r  = Math.pow(Math.random(), 0.6) * 5
      const arm   = i % 3
      const angle = (arm / 3) * Math.PI * 2 + r * 1.5 + (Math.random() - 0.5) * 0.7
      const sc    = Math.pow(Math.random(), 3) * 0.25
      const scA   = Math.random() * Math.PI * 2
      const dy    = (Math.random() - 0.5) * Math.max(0.04, (1 - r / 5) * 0.5)

      pos[i3    ] = Math.cos(angle) * r + Math.cos(scA) * sc * r
      pos[i3 + 1] = dy
      pos[i3 + 2] = Math.sin(angle) * r + Math.sin(scA) * sc * r

      let c: THREE.Color
      if      (r < 1.5) c = cA.clone().lerp(cB, r / 1.5)
      else if (r < 3.5) c = cB.clone().lerp(cC, (r - 1.5) / 2)
      else               c = cC.clone()

      col[i3] = c.r; col[i3 + 1] = c.g; col[i3 + 2] = c.b
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3))

    const mat = new THREE.PointsMaterial({
      size: 0.022, sizeAttenuation: true, depthWrite: false,
      blending: THREE.AdditiveBlending, vertexColors: true,
      transparent: true, opacity: 0.7,
    })

    const galaxy = new THREE.Points(geo, mat)
    scene.add(galaxy)

    let animId: number
    let t = 0
    const animate = () => {
      animId = requestAnimationFrame(animate)
      t += 0.0006
      galaxy.rotation.y = t * 0.2
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      geo.dispose(); mat.dispose(); renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        opacity: 0.55,
      }}
    />
  )
}

export default function CTA() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      style={{
        padding: '130px 64px',
        background: '#000000',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 560,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Galaxy background */}
      <MiniGalaxy />

      {/* Radial overlay so text stays readable */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.7) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 780, margin: '0 auto',
          textAlign: 'center', position: 'relative', zIndex: 10,
          width: '100%',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label" style={{ marginBottom: 28, display: 'inline-flex' }}>
            <span
              style={{
                width: 5, height: 5, borderRadius: '50%',
                background: '#ff50a0', display: 'inline-block',
              }}
            />
            Ready to Begin?
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 'clamp(44px, 7vw, 90px)',
            fontWeight: 800, letterSpacing: '-0.038em',
            color: '#ffffff', lineHeight: 1.0,
            marginTop: 20, marginBottom: 24,
          }}
        >
          Your Vision.
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #ff8040 0%, #ff50a0 45%, #a040ff 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradientShift 5s ease infinite',
            }}
          >
            Our Execution.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: 'clamp(16px, 1.6vw, 19px)',
            lineHeight: 1.7, fontWeight: 300,
            marginBottom: 50,
            fontFamily: 'var(--font-inter), sans-serif',
          }}
        >
          Join 150+ founders who chose Aevora to build their digital future.
          <br />
          Let's create something extraordinary together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.38 }}
          style={{ display: 'flex', gap: 13, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button
            onClick={() => scrollTo('consult')}
            style={{
              background: '#ffffff', color: '#000000',
              padding: '18px 52px', borderRadius: 9,
              fontSize: 17, fontWeight: 700, cursor: 'pointer',
              border: 'none', fontFamily: 'var(--font-inter), sans-serif',
              letterSpacing: '-0.01em', transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 20px 56px rgba(255,255,255,0.22)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = ''
              e.currentTarget.style.boxShadow = ''
            }}
          >
            Start Your Project →
          </button>
          <button
            style={{
              background: 'transparent', color: 'rgba(255,255,255,0.6)',
              padding: '18px 52px', borderRadius: 9,
              fontSize: 17, fontWeight: 500, cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.18)',
              fontFamily: 'var(--font-inter), sans-serif',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
              e.currentTarget.style.color = '#ffffff'
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            Schedule a Call
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            color: 'rgba(255,255,255,0.22)',
            fontSize: 13, marginTop: 28,
            fontFamily: 'var(--font-inter), sans-serif',
          }}
        >
          Free strategy call · No commitment · Response within 24 hours
        </motion.p>
      </div>
    </section>
  )
}
