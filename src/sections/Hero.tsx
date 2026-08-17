import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ArchitectureCanvas from '@/components/3d/ArchitectureCanvas'
import MagneticButton from '@/components/MagneticButton'
import { profile } from '@/data/profile'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150)
    return () => clearTimeout(t)
  }, [])

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden grid-bg"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-violet/10 blur-[120px]" />
      </div>

      {/* 3D system, positioned right on desktop, behind content on mobile */}
      <div className="absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-[48%]">
        <ArchitectureCanvas activeNodeId="rag" className="w-full h-full opacity-70 lg:opacity-100" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 w-full pt-24 pb-16">
        <div className="max-w-2xl">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-eyebrow mb-6"
          >
            Applied GenAI Engineer
          </motion.p>

          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-semibold tracking-tight leading-[1.02] mb-6"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg sm:text-xl text-paper-300 leading-relaxed mb-5 max-w-xl"
          >
            I build practical AI systems with LLMs, RAG, AI agents, and
            workflow automation.
          </motion.p>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="font-mono text-xs sm:text-sm tracking-wide text-cyan/80 mb-10"
          >
            RAG · LLM Applications · AI Agents · n8n Automation
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton onClick={scrollToWork}>
              Explore My Work
            </MagneticButton>
            <MagneticButton
              variant="secondary"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-paper-700"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-paper-700 to-transparent" />
      </motion.div>
    </section>
  )
}
