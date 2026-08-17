import Reveal from '@/components/Reveal'
import MagneticButton from '@/components/MagneticButton'
import { profile, timeline, certifications } from '@/data/profile'

export default function Resume() {
  return (
    <section id="resume" className="relative py-28 lg:py-36 grid-bg">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16">
          {/* Resume CTA */}
          <div>
            <Reveal>
              <p className="section-eyebrow mb-4">Resume</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-4xl sm:text-5xl font-display font-semibold tracking-tight mb-5">
                Applied GenAI Engineer — Resume
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-paper-300 leading-relaxed mb-8 max-w-sm">
                A concise overview of my engineering background, AI
                capabilities, projects and technical experience.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-3">
                <MagneticButton href={profile.resumeUrl} download>
                  Download Resume
                </MagneticButton>
                <MagneticButton
                  variant="secondary"
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-12 pt-8 border-t border-ink-600">
                <p className="font-mono text-[10px] uppercase tracking-wide text-paper-700 mb-4">
                  Certifications
                </p>
                <div className="space-y-4">
                  {certifications.map((cert) => (
                    <div key={cert.name}>
                      <p className="text-sm font-medium text-paper-100">{cert.name}</p>
                      <p className="text-xs text-paper-500 mt-0.5">{cert.issuer}</p>
                      {cert.detail && (
                        <p className="text-xs text-paper-500 mt-0.5">{cert.detail}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Timeline */}
          <div>
            <Reveal delay={0.1}>
              <p className="font-mono text-[10px] uppercase tracking-wide text-paper-700 mb-6">
                Journey
              </p>
            </Reveal>
            <div className="relative pl-8 space-y-10">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-ink-600" />
              {timeline.map((item, i) => (
                <Reveal key={item.id} delay={0.15 + i * 0.08}>
                  <div className="relative">
                    <div className="absolute -left-[29px] top-1.5 w-3.5 h-3.5 rounded-full bg-ink-950 border-2 border-cyan" />
                    <p className="font-mono text-[10px] uppercase tracking-wide text-cyan mb-1">
                      {item.kind} · {item.period}
                    </p>
                    <h3 className="font-display font-semibold text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-paper-500 mb-3">
                      {item.org}
                      {item.location ? ` — ${item.location}` : ''}
                    </p>
                    {item.points.length > 0 && (
                      <ul className="space-y-2">
                        {item.points.map((point, idx) => (
                          <li key={idx} className="text-sm text-paper-300 leading-relaxed flex gap-2">
                            <span className="text-paper-700 shrink-0">—</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
