import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="logo text-gradient" onClick={handleLinkClick} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/src/assets/logo.png" alt="Multiverse Logo" style={{ height: '40px' }} />
          Multiverse Healthcare
        </Link>

        {/* Desktop Nav */}
        <div className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/feasibility"
            className={`nav-link ${location.pathname.includes('feasibility') ? 'active' : ''}`}
          >
            Feasibility
          </Link>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Hi, {user.name.split(' ')[0]}</span>
              <button
                onClick={logout}
                className="btn-primary"
                style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.5rem 1rem' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn-primary">
                Get Started <ChevronRight size={16} />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav */}
        <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="mobile-link"
              onClick={handleLinkClick}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/feasibility"
            className="mobile-link"
            onClick={handleLinkClick}
          >
            Feasibility
          </Link>
          {user ? (
            <>
              <div className="mobile-link">Hi, {user.name}</div>
              <button onClick={() => { logout(); handleLinkClick(); }} className="mobile-link" style={{ textAlign: 'left', background: 'none', border: 'none', padding: 0 }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-link" onClick={handleLinkClick}>Login</Link>
              <Link to="/register" className="mobile-link" onClick={handleLinkClick}>Sign Up</Link>
            </>
          )}
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          display: flex;
          align-items: center;
          z-index: 1000;
          transition: var(--transition-base);
          background: transparent;
        }

        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: var(--shadow-sm);
        }

        .nav-content {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: -0.02em;
        }

        .desktop-nav {
          display: none;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          font-weight: 500;
          color: var(--text-secondary);
          position: relative;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--primary);
        }

        .btn-primary {
          background: var(--primary);
          color: var(--text-light);
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-full);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition-base);
        }

        .btn-primary:hover {
          background: var(--secondary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }

        .mobile-toggle {
          display: block;
          color: var(--text-primary);
        }

        .mobile-nav {
          position: absolute;
          top: 80px;
          left: 0;
          width: 100%;
          padding: 2rem;
          background: white;
          border-bottom: 1px solid var(--bg-secondary);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          transform: translateY(-20px);
          opacity: 0;
          pointer-events: none;
          transition: var(--transition-base);
        }

        .mobile-nav.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
          box-shadow: var(--shadow-lg);
        }

        .mobile-link {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        @media (min-width: 768px) {
          .desktop-nav {
            display: flex;
          }
          .mobile-toggle {
            display: none;
          }
          .mobile-nav {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
