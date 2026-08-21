import { Link } from 'react-router-dom'
import { posts } from '../data/posts'
import { getProject } from '../data/projects'

export default function Blog() {
  return (
    <div className="container" style={{ padding: '48px 0 64px' }}>
      <h1 style={{ marginBottom: 8 }}>Blog</h1>
      <p style={{ marginBottom: 32 }}>Notes on building EvoLab, NeuralLab and the emulator project.</p>

      <div>
        {posts.map((post) => {
          const project = getProject(post.projectSlug)
          return (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              style={{
                display: 'flex',
                gap: 16,
                padding: '18px 0',
                borderTop: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  width: 88,
                  height: 60,
                  borderRadius: 'var(--radius)',
                  background: 'var(--color-surface)',
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>
                  {post.date} &middot; {post.readTime} &middot;{' '}
                  <span style={{ color: project?.accentVar }}>{project?.name}</span>
                </div>
                <h3 style={{ marginBottom: 4 }}>{post.title}</h3>
                <p style={{ fontSize: 13.5 }}>{post.excerpt}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
