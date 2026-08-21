import { Link, Navigate, useParams } from 'react-router-dom'
import { getPost } from '../data/posts'
import { getProject } from '../data/projects'

export default function BlogPost() {
  const { slug } = useParams()
  const post = slug ? getPost(slug) : undefined

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const project = getProject(post.projectSlug)

  return (
    <article className="container" style={{ padding: '32px 0 64px', maxWidth: 680 }}>
      <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 16 }}>
        <Link to="/">Home</Link> / <Link to="/blog">Blog</Link>
      </div>

      <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>
        {post.date} &middot; {post.readTime} &middot;{' '}
        {project && (
          <Link to={`/projects/${project.slug}`} style={{ color: project.accentVar }}>
            {project.name}
          </Link>
        )}
      </div>

      <h1 style={{ marginBottom: 24 }}>{post.title}</h1>

      {post.body.map((paragraph, i) => (
        <p key={i} style={{ fontSize: 15.5, marginBottom: 18, color: 'var(--color-text)' }}>
          {paragraph}
        </p>
      ))}

      <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--color-border)' }}>
        <Link to="/blog" style={{ fontSize: 13.5, color: 'var(--color-text-secondary)' }}>
          &larr; Back to blog
        </Link>
      </div>
    </article>
  )
}
