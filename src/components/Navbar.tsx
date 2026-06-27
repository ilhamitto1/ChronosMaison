import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BRAND } from '@/lib/constants'
import { buildWhatsAppUrl } from '@/lib/utils'

const NAV_LINKS = [
  { to: '/about', label: 'Haqqımızda' },
  { to: '/brends', label: 'Brendlər' },
  { to: '/watches', label: 'Saatlar' },
  { to: '/bags', label: 'Çantalar' },
  { to: '/contact', label: 'Əlaqə' },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={() => setMenuOpen(false)}>
          <img src={BRAND.logo} alt={BRAND.name} />
        </Link>

        <button
          type="button"
          className={`toogle_menu ${menuOpen ? 'open' : ''}`}
          aria-label="Menyu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="menu_line" />
          <span className="menu_line" />
          <span className="menu_line" />
        </button>

        <div className={`navbar-collapse ${menuOpen ? 'open' : ''}`}>
          <div className="mobile_lang">
            <ul>
              <li className="active_language">
                <a href="/">az</a>
              </li>
              <li>
                <a href="#">en</a>
              </li>
              <li>
                <a href="#">ru</a>
              </li>
            </ul>
          </div>

          <ul className="navbar-nav">
            {NAV_LINKS.map((link) => (
              <li key={link.to} className="nav-item">
                <Link className="nav-link" to={link.to} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="rightSide">
            <div className="language">
              <div className="active-lan">
                <a href="/" className="active" aria-label="Azərbaycan">
                  <img src="https://flagcdn.com/w40/az.png" alt="AZ" width={24} />
                </a>
                <a href="#" aria-label="English">
                  <img src="https://flagcdn.com/w40/gb.png" alt="EN" width={24} />
                </a>
                <a href="#" aria-label="Russian">
                  <img src="https://flagcdn.com/w40/ru.png" alt="RU" width={24} />
                </a>
              </div>
            </div>

            <a
              className="orderButton"
              target="_blank"
              rel="noopener noreferrer"
              href={buildWhatsAppUrl(BRAND.whatsappText)}
            >
              <span className="line" />
              <span>{BRAND.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
