import { Mail, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--color-border)', marginTop: 64 }}>
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          padding: '24px 24px',
          fontSize: 13,
          color: 'var(--color-text-secondary)',
        }}
      >
        <span>&copy; {new Date().getFullYear()} RCSoftware</span>
        <div style={{ display: 'flex', gap: 16 }}>
          <a href="mailto:robcawsey@outlook.com" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Mail size={15} />
            robcawsey@outlook.com
          </a>
          <a
            href="https://github.com/rob-cawsey"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <Github size={15} />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
