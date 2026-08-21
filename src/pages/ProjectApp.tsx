import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getProject } from '../data/projects'
import { withBase } from '../lib/basePath'

const MOBILE_BREAKPOINT = 768

export default function ProjectApp() {
  const { slug } = useParams()
  const project = slug ? getProject(slug) : undefined
  const [loaded, setLoaded] = useState(false)
  const [isNarrow, setIsNarrow] = useState(
    typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT
  )

  useEffect(() => {
    const onResize = () => setIsNarrow(window.innerWidth < MOBILE_BREAKPOINT)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (!project || !project.embeddable) {
    return <Navigate to="/projects" replace />
  }

  const appUrl = withBase(`/apps/${project.slug}/index.html`)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 20px',
          borderBottom: '1px solid var(--color-border)',
          flexShrink: 0,
        }}
      >
        <Link
          to={`/projects/${project.slug}`}
          style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--color-text-secondary)' }}
        >
          <ArrowLeft size={16} />
          Back to {project.name} overview
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500 }}>
          <project.icon size={16} color={project.accentVar} />
          {project.name}
        </div>
        <a href={appUrl} target="_blank" rel="noreferrer" className="btn" style={{ padding: '5px 10px', fontSize: 12 }}>
          <ExternalLink size={13} />
          Open in new tab
        </a>
      </div>

      {isNarrow && (
        <div
          style={{
            fontSize: 12.5,
            color: 'var(--color-text-secondary)',
            background: 'var(--color-surface)',
            padding: '8px 20px',
            flexShrink: 0,
          }}
        >
          {project.name} uses drag and slider controls and runs best on a desktop screen.
        </div>
      )}

      <div style={{ position: 'relative', flex: 1 }}>
        {!loaded && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              color: 'var(--color-text-muted)',
            }}
          >
            Loading {project.name}&hellip;
          </div>
        )}
        <iframe
          src={appUrl}
          title={project.name}
          onLoad={() => setLoaded(true)}
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        />
      </div>
    </div>
  )
}
