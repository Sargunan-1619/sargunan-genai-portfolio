import Reveal from '@/components/Reveal'

const STEPS = [
  {
    n: '01',
    title: 'Understand',
    detail: 'Define the problem and required output.',
  },
  {
    n: '02',
    title: 'Retrieve',
    detail: 'Connect relevant data and context.',
  },
  {
    n: '03',
    title: 'Reason',
    detail: 'Use LLMs and structured generation.',
  },
  {
    n: '04',
    title: 'Connect',
    detail: 'Integrate APIs, tools and external services.',
  },
  {
    n: '05',
    title: 'Automate',
    detail: 'Orchestrate workflows with n8n.',
  },
  {
    n: '06',
    title: 'Validate',
    detail: 'Validate structured outputs and system behavior.',
  },
] as const

export default function Process() {
  return (
    <section className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="section-eyebrow mb-4">Process</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold tracking-tight mb-16 max-w-2xl">
            How I build AI systems
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-600 rounded-2xl overflow-hidden">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={0.08 + i * 0.04}>
              <div className="bg-ink-950 p-6 lg:p-8 h-full hover:bg-ink-900 transition-colors duration-300">
                <span className="font-mono text-xs text-cyan/70">{step.n}</span>
                <h3 className="font-display font-semibold text-lg mt-3 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-paper-500 leading-relaxed">
                  {step.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
