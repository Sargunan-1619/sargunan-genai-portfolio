import { profile } from '@/data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-ink-600 py-12">
      <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="font-display font-semibold text-paper-100">{profile.name}</p>
          <p className="font-mono text-xs text-cyan/80 mt-1">{profile.title}</p>
          <p className="font-mono text-[11px] text-paper-500 mt-3">
            RAG · LLM Applications · AI Agents · AI Automation
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex items-center gap-5">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-paper-500 hover:text-cyan transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-paper-700 text-xs">|</span>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-paper-500 hover:text-cyan transition-colors"
            >
              GitHub
            </a>
            <span className="text-paper-700 text-xs">|</span>
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-xs text-paper-500 hover:text-cyan transition-colors"
            >
              Email
            </a>
          </div>
          <p className="font-mono text-[11px] text-paper-500">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
