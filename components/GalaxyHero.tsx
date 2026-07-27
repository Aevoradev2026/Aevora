'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

export default function GalaxyHero() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 1)
    mount.appendChild(renderer.domElement)

    // ── Scene & Camera ────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      200
    )
    camera.position.set(0, 4.5, 10)
    camera.lookAt(0, 0, 0)

    // ── Galaxy Particle System ─────────────────────────────────
    // Matching the reference video: hot pink/magenta center → blue outer
    const PARTICLE_COUNT = 150000

    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors    = new Float32Array(PARTICLE_COUNT * 3)
    const sizes     = new Float32Array(PARTICLE_COUNT)

    // Color stops (matching frames 10-11 of reference video)
    const cCore  = new THREE.Color('#ffffff')  // white-hot core
    const cInner = new THREE.Color('#ff1090')  // hot magenta/pink
    const cMid   = new THREE.Color('#9030ff')  // deep violet
    const cOuter = new THREE.Color('#1840ff')  // cool deep blue

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3

      // Radius — square-root distribution gives denser core
      const radius = Math.pow(Math.random(), 0.55) * 7.5

      // 3 spiral arms
      const arm      = i % 3
      const armAngle = (arm / 3) * Math.PI * 2

      // Spin amount increases with radius (tighter inner, looser outer)
      const spin  = radius * 1.55
      const theta = armAngle + spin

      // Scatter — wider near center, tightens toward outer edge
      const scatterMag   = Math.pow(Math.random(), 2.8) * radius * 0.28
      const scatterTheta = Math.random() * Math.PI * 2

      // Disk thickness — very flat, thicker near core
      const diskHeight =
        (Math.random() - 0.5) * Math.max(0.04, (1 - radius / 8) * 0.7)

      positions[i3    ] =
        Math.cos(theta) * radius + Math.cos(scatterTheta) * scatterMag
      positions[i3 + 1] = diskHeight
      positions[i3 + 2] =
        Math.sin(theta) * radius + Math.sin(scatterTheta) * scatterMag

      // Color mapping
      let c: THREE.Color
      if (radius < 0.4) {
        c = cCore.clone()
      } else if (radius < 1.8) {
        c = cCore.clone().lerp(cInner, (radius - 0.4) / 1.4)
      } else if (radius < 4.2) {
        c = cInner.clone().lerp(cMid, (radius - 1.8) / 2.4)
      } else {
        c = cMid.clone().lerp(cOuter, Math.min((radius - 4.2) / 3.3, 1))
      }

      colors[i3    ] = c.r
      colors[i3 + 1] = c.g
      colors[i3 + 2] = c.b

      // Particle size — slightly larger near core
      sizes[i] = Math.random() * 1.4 + (radius < 1 ? 1.2 : 0.4)
    }

    const galaxyGeo = new THREE.BufferGeometry()
    galaxyGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    galaxyGeo.setAttribute('color',    new THREE.BufferAttribute(colors,    3))
    galaxyGeo.setAttribute('size',     new THREE.BufferAttribute(sizes,     1))

    const galaxyMat = new THREE.PointsMaterial({
      size:            0.018,
      sizeAttenuation: true,
      depthWrite:      false,
      blending:        THREE.AdditiveBlending,
      vertexColors:    true,
      transparent:     true,
      opacity:         0.92,
    })

    const galaxy = new THREE.Points(galaxyGeo, galaxyMat)
    scene.add(galaxy)

    // ── Core Glow (bright center) ──────────────────────────────
    const coreCount = 3000
    const corePos   = new Float32Array(coreCount * 3)
    const coreCol   = new Float32Array(coreCount * 3)

    for (let i = 0; i < coreCount; i++) {
      const i3 = i * 3
      const r  = Math.pow(Math.random(), 2) * 0.8
      const a  = Math.random() * Math.PI * 2
      const b  = Math.random() * Math.PI * 2
      corePos[i3    ] = Math.sin(a) * Math.cos(b) * r
      corePos[i3 + 1] = Math.sin(b) * r * 0.3
      corePos[i3 + 2] = Math.cos(a) * Math.cos(b) * r

      const t  = Math.random()
      const cc = new THREE.Color('#ffffff').lerp(new THREE.Color('#ff80c0'), t)
      coreCol[i3    ] = cc.r
      coreCol[i3 + 1] = cc.g
      coreCol[i3 + 2] = cc.b
    }

    const coreGeo = new THREE.BufferGeometry()
    coreGeo.setAttribute('position', new THREE.BufferAttribute(corePos, 3))
    coreGeo.setAttribute('color',    new THREE.BufferAttribute(coreCol, 3))

    const coreMat = new THREE.PointsMaterial({
      size:            0.035,
      sizeAttenuation: true,
      depthWrite:      false,
      blending:        THREE.AdditiveBlending,
      vertexColors:    true,
      transparent:     true,
      opacity:         1.0,
    })

    scene.add(new THREE.Points(coreGeo, coreMat))

    // ── Background Stars ──────────────────────────────────────
    const STAR_COUNT = 6000
    const starPos    = new Float32Array(STAR_COUNT * 3)

    for (let i = 0; i < STAR_COUNT; i++) {
      const i3 = i * 3
      starPos[i3    ] = (Math.random() - 0.5) * 120
      starPos[i3 + 1] = (Math.random() - 0.5) * 120
      starPos[i3 + 2] = (Math.random() - 0.5) * 120
    }

    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))

    const starMat = new THREE.PointsMaterial({
      size:            0.08,
      color:           '#ffffff',
      sizeAttenuation: true,
      depthWrite:      false,
      transparent:     true,
      opacity:         0.55,
      blending:        THREE.AdditiveBlending,
    })

    scene.add(new THREE.Points(starGeo, starMat))

    // ── Mouse Tracking ────────────────────────────────────────
    let targetX = 0
    let targetY = 4.5

    const onMouseMove = (e: MouseEvent) => {
      targetX = ((e.clientX / window.innerWidth)  - 0.5) * 2.5
      targetY = 4.5 + ((e.clientY / window.innerHeight) - 0.5) * -2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Resize ───────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // ── Animation Loop ────────────────────────────────────────
    let animId: number
    let elapsed = 0

    const animate = () => {
      animId  = requestAnimationFrame(animate)
      elapsed += 0.0008

      // Galaxy slow rotation
      galaxy.rotation.y = elapsed * 0.18

      // Gentle camera drift following mouse
      camera.position.x += (targetX - camera.position.x) * 0.018
      camera.position.y += (targetY - camera.position.y) * 0.018
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    // ── Cleanup ───────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
      galaxyGeo.dispose()
      galaxyMat.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      starGeo.dispose()
      starMat.dispose()
      renderer.dispose()
    }
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 700,
        background: '#000000',
        overflow: 'hidden',
      }}
    >
      {/* Three.js canvas mount */}
      <div
        ref={mountRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {/* Bottom fade to black (so content sections connect seamlessly) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          background:
            'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.6) 60%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top fade */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '20%',
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Hero Content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 clamp(20px, 5vw, 64px)',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ marginBottom: 28 }}
        >
          <span className="section-label">
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#ff50a0',
                display: 'inline-block',
                animation: 'dotPulse 2s ease infinite',
              }}
            />
            Premium Web Development Agency
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 'clamp(30px, 7vw, 90px)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
            color: '#ffffff',
            marginBottom: 28,
            maxWidth: 780,
          }}
        >
          Digital Experiences
          <br />
          That{' '}
          <span
            style={{
              background:
                'linear-gradient(135deg, #ff8040 0%, #ff50a0 45%, #8040ff 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradientShift 5s ease infinite',
            }}
          >
            Redefine the Possible.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          style={{
            fontSize: 'clamp(14px, 3.5vw, 19px)',
            color: 'rgba(255,255,255,0.48)',
            maxWidth: 520,
            lineHeight: 1.78,
            fontWeight: 300,
            marginBottom: 48,
            fontFamily: 'var(--font-inter), sans-serif',
          }}
        >
          We build premium websites, web applications, and AI-powered systems
          for companies that demand the extraordinary.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
        >
          <button
            onClick={() => scrollTo('consult')}
            style={{
              background: '#ffffff',
              color: '#000000',
              padding: '15px 38px',
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              fontFamily: 'var(--font-inter), sans-serif',
              letterSpacing: '-0.01em',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow =
                '0 16px 48px rgba(255,255,255,0.18)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = ''
              e.currentTarget.style.boxShadow = ''
            }}
          >
            Start Your Project →
          </button>

        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{
            display: 'flex',
            gap: 52,
            marginTop: 72,
            paddingTop: 40,
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {[
            ['150+', 'Projects Built'],
            ['$40M+', 'Revenue Generated'],
            ['98%', 'Client Retention'],
          ].map(([num, label]) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontSize: 'clamp(22px, 2.5vw, 30px)',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '-0.025em',
                  lineHeight: 1,
                }}
              >
                {num}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.32)',
                  marginTop: 7,
                  letterSpacing: '0.09em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontFamily: 'var(--font-inter), sans-serif',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 20,
          animation: 'float 2.8s ease-in-out infinite',
        }}
      >
        <span
          style={{
            fontSize: 10,
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-inter), sans-serif',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 36,
            background:
              'linear-gradient(to bottom, rgba(255,80,160,0.7), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
