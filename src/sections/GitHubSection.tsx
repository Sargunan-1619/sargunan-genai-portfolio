import Reveal from '@/components/Reveal'
import MagneticButton from '@/components/MagneticButton'
import { profile, projects } from '@/data/profile'

export default function GitHubSection() {
  return (
    <section className="relative py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="glass-panel rounded-2xl p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div>
                <p className="section-eyebrow mb-4">Engineering in Public</p>
                <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight mb-3">
                  Code lives on GitHub
                </h2>
                <p className="text-paper-500 max-w-md text-sm leading-relaxed">
                  Repositories for the projects shown here, and ongoing work
                  in GenAI and automation.
                </p>
              </div>
              <MagneticButton
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                View GitHub →
              </MagneticButton>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mt-10 pt-8 border-t border-ink-600">
              {projects.map((p) => (
                <a
                  key={p.id}
                  href={p.github ?? profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl p-4 border border-ink-600 hover:border-cyan/40 transition-colors group"
                >
                  <p className="font-mono text-xs text-paper-700 mb-2 group-hover:text-cyan transition-colors">
                    {p.index}
                  </p>
                  <p className="text-sm font-medium text-paper-100 leading-snug mb-2">
                    {p.name}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {p.tech.slice(0, 2).map((t) => (
                      <span key={t} className="font-mono text-[10px] text-paper-500">
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
