import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, Download, ExternalLink, PlayCircle } from 'lucide-react'
import { getProject, projects } from '../data/projects'
import { withBase } from '../lib/basePath'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = slug ? getProject(slug) : undefined

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  const Icon = project.icon
  const index = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <div className="container" style={{ padding: '32px 0 64px' }}>
      <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 16 }}>
        <Link to="/">Home</Link> / <Link to="/projects">Projects</Link> / {project.name}
      </div>

      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 10 }}>
          <Icon size={26} color={project.accentVar} />
          <h1>{project.name}</h1>
          <span className="tag" style={{ background: 'var(--color-surface)' }}>
            {project.badge}
          </span>
        </div>

        <p style={{ maxWidth: 560, margin: '0 auto 10px', fontSize: 15.5 }}>{project.description}</p>
        {project.secondaryNote && (
          <p style={{ maxWidth: 560, margin: '0 auto 16px', fontSize: 13.5 }}>{project.secondaryNote}</p>
        )}

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}>
          {project.techStack.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 8 }}>
          {project.embeddable ? (
            <Link to={`/projects/${project.slug}/app`} className="btn btn-primary">
              <PlayCircle size={15} />
              Launch {project.name}
            </Link>
          ) : (
            <a href={project.downloadUrl ?? '#'} className="btn btn-primary">
              <Download size={15} />
              Download build
            </a>
          )}
          {project.embeddable && (
            <a href={withBase(`/apps/${project.slug}/index.html`)} target="_blank" rel="noreferrer" className="btn">
              <ExternalLink size={15} />
              Open in new tab
            </a>
          )}
          <a href={project.sourceUrl} target="_blank" rel="noreferrer" className="btn">
            View source
          </a>
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
          {project.embeddable
            ? 'Runs directly in your browser. Best experienced on desktop.'
            : 'Windows desktop app — download to run locally.'}
        </div>
      </div>

      {project.screenshotSrc ? (
        <figure style={{ margin: '0 0 32px' }}>
          <img
            src={project.screenshotSrc}
            alt={project.screenshotCaption}
            style={{ width: '100%', display: 'block', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}
          />
          <figcaption style={{ fontSize: 12.5, color: 'var(--color-text-muted)', marginTop: 8, textAlign: 'center' }}>
            {project.screenshotCaption}
          </figcaption>
        </figure>
      ) : (
        <div
          className="card"
          style={{
            height: 220,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-muted)',
            fontSize: 13,
            marginBottom: 32,
            background: 'var(--color-surface)',
          }}
        >
          Screenshot — {project.screenshotCaption}
        </div>
      )}

      <div style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 16 }}>
        HIGHLIGHTS
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
        {project.highlights.map((h) => (
          <div key={h.title}>
            <h3 style={{ marginBottom: 4 }}>{h.title}</h3>
            <p style={{ fontSize: 13.5 }}>{h.description}</p>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 48,
          paddingTop: 20,
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 13.5,
          color: 'var(--color-text-secondary)',
        }}
      >
        <span>Next project</span>
        <Link to={`/projects/${next.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {next.name}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
