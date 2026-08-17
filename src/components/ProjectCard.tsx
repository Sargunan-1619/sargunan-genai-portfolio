import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '@/data/profile'

const STAGES: { key: keyof Project; label: string }[] = [
  { key: 'problem', label: 'Problem' },
  { key: 'approach', label: 'Approach' },
  { key: 'architecture', label: 'Architecture' },
  { key: 'implementation', label: 'Implementation' },
  { key: 'decisions', label: 'AI / Engineering Decisions' },
  { key: 'result', label: 'Result' },
]

// Static import map so Vite can resolve the screenshot assets at build time.
import ragScreenshot from '@/assets/images/project-rag-screenshot.png'
import rfqScreenshot from '@/assets/images/project-rfq-screenshot.png'

const SCREENSHOT_MAP: Record<string, string> = {
  'project-rag-screenshot.png': ragScreenshot,
  'project-rfq-screenshot.png': rfqScreenshot,
}

export default function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false)
  const screenshotSrc = project.screenshot ? SCREENSHOT_MAP[project.screenshot] : null

  return (
    <article className="glass-panel rounded-2xl overflow-hidden">
      <div className="grid lg:grid-cols-[1.1fr_1fr]">
        {/* Real screenshot evidence, framed as an authentic workflow canvas */}
        <div className="relative bg-ink-900 p-4 lg:p-6 flex flex-col">
          {screenshotSrc ? (
            <>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase tracking-wide text-paper-700">
                  Real project evidence
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-ink-600" />
                  <span className="w-2 h-2 rounded-full bg-ink-600" />
                  <span className="w-2 h-2 rounded-full bg-ink-600" />
                </div>
              </div>
              <div className="rounded-lg overflow-hidden border border-ink-600 flex-1">
                <img
                  src={screenshotSrc}
                  alt={project.screenshotAlt ?? project.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <p className="font-mono text-[10px] text-paper-500 mt-2">
                Actual n8n workflow — {project.name}
              </p>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[240px] text-center px-6 gap-3">
              <span className="font-mono text-[10px] uppercase tracking-wide text-paper-500">
                You're looking at it
              </span>
              <p className="text-paper-300 text-sm leading-relaxed max-w-xs">
                This portfolio is itself the working implementation —
                built and deployed, not a mockup.
              </p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8 flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-3">
            <span className="font-mono text-xs text-cyan">{project.index}</span>
            <div className="flex flex-wrap gap-1.5 justify-end">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-full bg-white/5 text-paper-500 whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-display font-semibold tracking-tight mb-3">
            {project.name}
          </h3>

          <p className="text-paper-300 text-sm leading-relaxed mb-5">
            {project.approach}
          </p>

          {project.pipeline.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mb-6 font-mono text-[10px] text-paper-500">
              {project.pipeline.map((step, i) => (
                <span key={step} className="flex items-center gap-1.5">
                  <span className="px-2 py-1 rounded-md bg-white/5 border border-ink-600">
                    {step}
                  </span>
                  {i < project.pipeline.length - 1 && <span className="text-paper-700">→</span>}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto flex flex-wrap items-center gap-3">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="text-sm font-medium text-paper-100 hover:text-cyan transition-colors flex items-center gap-1.5"
              aria-expanded={expanded}
            >
              {expanded ? 'Hide details' : 'View case study'}
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ↓
              </motion.span>
            </button>
            {project.liveDemo === 'self' && (
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="text-sm text-paper-500 hover:text-cyan transition-colors"
              >
                View Live →
              </a>
            )}
            {project.liveDemo !== null && project.liveDemo !== 'self' && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-paper-500 hover:text-cyan transition-colors"
              >
                View Live →
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-paper-500 hover:text-cyan transition-colors"
              >
                View GitHub →
              </a>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-ink-600"
          >
            <div className="p-6 lg:p-8 grid sm:grid-cols-2 gap-6">
              {STAGES.map((stage) => {
                const content = project[stage.key]
                if (!content || typeof content !== 'string') return null
                return (
                  <div key={String(stage.key)}>
                    <p className="font-mono text-[10px] uppercase tracking-wide text-cyan mb-2">
                      {stage.label}
                    </p>
                    <p className="text-sm text-paper-300 leading-relaxed">{content}</p>
                  </div>
                )
              })}
              <div className="sm:col-span-2 pt-2 border-t border-ink-600">
                <p className="font-mono text-[10px] uppercase tracking-wide text-paper-700 mb-2">
                  Technology
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-2 py-1 rounded-md bg-white/5 text-paper-500 border border-ink-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}
