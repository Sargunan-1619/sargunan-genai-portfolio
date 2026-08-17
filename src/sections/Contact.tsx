import { useState, type FormEvent } from 'react'
import Reveal from '@/components/Reveal'
import MagneticButton from '@/components/MagneticButton'
import { profile } from '@/data/profile'

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // No backend is wired up — route to a real mailto so the message
    // reliably reaches the inbox rather than silently going nowhere.
    const subject = encodeURIComponent(`Portfolio contact from ${formState.name || 'a visitor'}`)
    const body = encodeURIComponent(
      `${formState.message}\n\n— ${formState.name} (${formState.email})`,
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setStatus('sent')
  }

  return (
    <section id="contact" className="relative py-28 lg:py-40">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <Reveal>
              <p className="section-eyebrow mb-6">Contact</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-tight leading-[1.05] mb-6">
                Let's build something intelligent.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg text-paper-300 leading-relaxed mb-10 max-w-md">
                Have an AI product, workflow, or automation problem? Let's
                turn it into a working system.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-3 mb-10">
                <MagneticButton href={`mailto:${profile.email}`}>
                  Let's Connect
                </MagneticButton>
                <MagneticButton
                  variant="secondary"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </MagneticButton>
                <MagneticButton
                  variant="secondary"
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <a
                href={`mailto:${profile.email}`}
                className="font-mono text-sm text-paper-500 hover:text-cyan transition-colors"
              >
                {profile.email}
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 lg:p-8 space-y-5">
              <div>
                <label htmlFor="name" className="font-mono text-xs uppercase tracking-wide text-paper-500 mb-2 block">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                  className="w-full bg-white/5 border border-ink-600 rounded-xl px-4 py-3 text-sm text-paper-100 focus:border-cyan/50 outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="font-mono text-xs uppercase tracking-wide text-paper-500 mb-2 block">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                  className="w-full bg-white/5 border border-ink-600 rounded-xl px-4 py-3 text-sm text-paper-100 focus:border-cyan/50 outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="font-mono text-xs uppercase tracking-wide text-paper-500 mb-2 block">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                  className="w-full bg-white/5 border border-ink-600 rounded-xl px-4 py-3 text-sm text-paper-100 focus:border-cyan/50 outline-none transition-colors resize-none"
                  placeholder="Tell me about your project or opportunity"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-body text-sm font-medium bg-paper-100 text-ink-950 hover:bg-cyan transition-colors duration-300"
              >
                {status === 'sent' ? 'Opening your email app…' : 'Send Message'}
              </button>
              <p className="text-xs text-paper-500 text-center">
                Opens your email app with this message pre-filled.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
