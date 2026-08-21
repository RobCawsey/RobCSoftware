import { NavLink } from 'react-router-dom'
import { CodeXml } from 'lucide-react'
import './Header.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <NavLink to="/" className="site-header__brand">
          <CodeXml size={20} />
          <span>RCSoftware</span>
        </NavLink>
        <nav className="site-header__nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? 'site-header__link site-header__link--active' : 'site-header__link'
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/contact" className="btn btn-primary site-header__cta">
          Get in touch
        </NavLink>
      </div>
    </header>
  )
}
