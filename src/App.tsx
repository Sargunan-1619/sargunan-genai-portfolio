import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import AIArchitecture from '@/sections/AIArchitecture'
import Process from '@/sections/Process'
import Projects from '@/sections/Projects'
import Skills from '@/sections/Skills'
import GitHubSection from '@/sections/GitHubSection'
import Resume from '@/sections/Resume'
import Contact from '@/sections/Contact'
import { useActiveSection } from '@/hooks/useActiveSection'

const SECTION_IDS = ['hero', 'work', 'ai-systems', 'about', 'skills', 'resume', 'contact'] as const

export default function App() {
  const activeId = useActiveSection(SECTION_IDS)

  return (
    <div className="relative min-h-screen">
      <Navigation activeId={activeId} />
      <main>
        <Hero />
        <Projects />
        <AIArchitecture />
        <Process />
        <About />
        <Skills />
        <GitHubSection />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
