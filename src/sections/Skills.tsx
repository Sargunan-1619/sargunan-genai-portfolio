import Reveal from '@/components/Reveal'
import { skillGroups } from '@/data/profile'

export default function Skills() {
  const primary = skillGroups.filter((g) => g.emphasis)
  const secondary = skillGroups.filter((g) => !g.emphasis)

  return (
    <section id="skills" className="relative py-28 lg:py-36 grid-bg">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="section-eyebrow mb-4">Skills</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold tracking-tight mb-16 max-w-2xl">
            What I know
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 mb-6">
          {primary.map((group, i) => (
            <Reveal key={group.id} delay={0.1 + i * 0.05}>
              <div className="glass-panel rounded-2xl p-6 h-full border border-cyan/10">
                <h3 className="font-display font-semibold text-cyan mb-4 text-sm uppercase tracking-wide">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-3 py-1.5 rounded-lg bg-white/5 text-paper-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {secondary.map((group, i) => (
            <Reveal key={group.id} delay={0.25 + i * 0.05}>
              <div className="rounded-2xl p-6 border border-ink-600">
                <h3 className="font-display font-medium text-paper-500 mb-4 text-sm uppercase tracking-wide">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-3 py-1.5 rounded-lg bg-white/[0.03] text-paper-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
