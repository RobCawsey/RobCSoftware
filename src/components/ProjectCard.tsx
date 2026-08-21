import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'

export default function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon
  return (
    <Link to={`/projects/${project.slug}`} className="card" style={{ display: 'block' }}>
      <Icon size={22} color={project.accentVar} />
      <h3 style={{ margin: '10px 0 4px' }}>{project.name}</h3>
      <p style={{ fontSize: 13.5 }}>{project.tagline}</p>
      <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {project.techStack.slice(0, 2).map((t) => (
          <span
            key={t}
            className="tag"
            style={{ background: project.accentBgVar, color: project.accentVar }}
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  )
}
