import { Smartphone } from 'lucide-react'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  return (
    <section className="container" style={{ padding: '48px 0 64px' }}>
      <h1 style={{ marginBottom: 8 }}>Projects</h1>
      <p style={{ marginBottom: 32 }}>What I've built, and what's coming next.</p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
        <div
          className="card"
          style={{ borderStyle: 'dashed', color: 'var(--color-text-muted)' }}
        >
          <Smartphone size={22} />
          <h3 style={{ margin: '10px 0 4px', color: 'var(--color-text-muted)' }}>Mobile games</h3>
          <p style={{ fontSize: 13.5 }}>Coming soon.</p>
        </div>
      </div>
    </section>
  )
}
