import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ArchitectureCanvas from '@/components/3d/ArchitectureCanvas'
import Reveal from '@/components/Reveal'
import { architectureNodes } from '@/data/profile'

export default function AIArchitecture() {
  const [selectedId, setSelectedId] = useState<string>('rag')
  const selected = architectureNodes.find((n) => n.id === selectedId)!

  return (
    <section id="ai-systems" className="relative py-28 lg:py-36 grid-bg">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="section-eyebrow mb-4">AI Architecture</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold tracking-tight mb-4 max-w-2xl">
            AI system architecture
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-paper-500 max-w-lg mb-16">
            An abstract representation of the pipeline concepts behind my
            projects — not a screenshot of any specific workflow.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-stretch">
          <Reveal delay={0.15}>
            <div className="relative glass-panel rounded-2xl h-[420px] lg:h-[520px] overflow-hidden">
              <ArchitectureCanvas activeNodeId={selectedId} className="w-full h-full" />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-col gap-2 h-full">
              {architectureNodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedId(node.id)}
                  onMouseEnter={() => setSelectedId(node.id)}
                  onFocus={() => setSelectedId(node.id)}
                  className={`text-left px-4 py-3 rounded-xl border transition-all duration-300 ${
                    selectedId === node.id
                      ? 'border-cyan/40 bg-white/5'
                      : 'border-transparent hover:border-ink-600'
                  }`}
                  aria-pressed={selectedId === node.id}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span
                      className={`font-display font-medium text-sm transition-colors ${
                        selectedId === node.id ? 'text-cyan' : 'text-paper-100'
                      }`}
                    >
                      {node.label}
                    </span>
                    <span className="font-mono text-[10px] text-paper-700 uppercase whitespace-nowrap">
                      {node.short}
                    </span>
                  </div>
                </button>
              ))}

              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 glass-panel rounded-xl p-4 flex-1"
                >
                  <p className="font-mono text-[10px] uppercase tracking-wide text-cyan mb-2">
                    {selected.label}
                  </p>
                  <p className="text-sm text-paper-300 leading-relaxed">
                    {selected.detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
