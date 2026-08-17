import Reveal from '@/components/Reveal'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/profile'

export default function Projects() {
  return (
    <section id="work" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="section-eyebrow mb-4">Work</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold tracking-tight mb-4 max-w-2xl">
            What I've built
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-paper-500 max-w-lg mb-16">
            Two working GenAI systems, shown with real workflow evidence —
            and the portfolio itself as a third.
          </p>
        </Reveal>

        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={0.1 + i * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
