import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  return (
    <section className="container" style={{ padding: '48px 0 64px' }}>
      <h1 style={{ marginBottom: 8 }}>Projects</h1>
      <p style={{ marginBottom: 32 }}>Three tools, three ways of making a hard idea concrete.</p>
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
      </div>
    </section>
  )
}
