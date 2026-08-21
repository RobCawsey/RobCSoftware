import { Link } from 'react-router-dom'
import { Smartphone } from 'lucide-react'
import { projects } from '../data/projects'
import { posts } from '../data/posts'
import ProjectCard from '../components/ProjectCard'
import './Home.css'

export default function Home() {
  const latestPosts = posts.slice(0, 2)

  return (
    <>
      <section style={{ textAlign: 'center', padding: '64px 0 48px' }}>
        <div className="container">
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', letterSpacing: '0.04em', marginBottom: 10 }}>
            SOFTWARE ENGINEERING PORTFOLIO
          </div>
          <h1>Tools that make hard ideas visible</h1>
          <p style={{ maxWidth: 480, margin: '14px auto 24px', fontSize: 16 }}>
            Interactive simulators and emulators for evolutionary robotics, neural networks, and
            classic game hardware.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <Link to="/projects" className="btn btn-primary">
              View projects
            </Link>
            <Link to="/blog" className="btn">
              Read the blog
            </Link>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '32px 0' }}>
        <div style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 16 }}>
          FEATURED PROJECTS
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            marginTop: 16,
          }}
        >
          <div className="mobile-games-spacer" />
          <div className="card" style={{ borderStyle: 'dashed', color: 'var(--color-text-muted)' }}>
            <Smartphone size={22} />
            <h3 style={{ margin: '10px 0 4px', color: 'var(--color-text-muted)' }}>Mobile games</h3>
            <p style={{ fontSize: 13.5 }}>Coming soon.</p>
          </div>
          <div className="mobile-games-spacer" />
        </div>
      </section>

      <section className="container" style={{ padding: '32px 0' }}>
        <div style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 16 }}>
          FROM THE BLOG
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {latestPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} style={{ display: 'block' }}>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>
                {post.date} &middot; {post.readTime}
              </div>
              <h3 style={{ fontWeight: 500 }}>{post.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="container"
        style={{
          padding: '32px 0 56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ fontSize: 16 }}>Have a project idea or a question?</div>
        <Link to="/contact" className="btn btn-primary">
          Contact me
        </Link>
      </section>
    </>
  )
}
