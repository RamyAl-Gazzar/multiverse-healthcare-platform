import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h2 className="text-gradient logo-text">Multiverse Healthcare</h2>
                        <p>Your partner in operational excellence and digital transformation.</p>
                    </div>

                    <div className="footer-links">
                        <h3>Services</h3>
                        <ul>
                            <li><Link to="/services/rcm">RCM</Link></li>
                            <li><Link to="/services/accreditation">GAHAR Accreditation</Link></li>
                            <li><Link to="/services/bi">Dashboards & BI</Link></li>
                            <li><Link to="/services/feasibility">Feasibility Studies</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h3>Company</h3>
                        <ul>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/careers">Careers</Link></li>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h3>Contact</h3>
                        <p>Cairo, Egypt</p>
                        <p>info@multiverse-health.com</p>
                        <p>+20 123 456 7890</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} Multiverse Healthcare. All rights reserved.</p>
                </div>
            </div>

            <style>{`
        .footer {
          background: var(--secondary);
          color: var(--text-light);
          padding: 4rem 0 2rem;
          margin-top: auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-brand h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .footer-brand p {
          color: rgba(255, 255, 255, 0.7);
          max-width: 300px;
        }

        .footer-links h3, .footer-contact h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          color: var(--primary);
        }

        .footer-links ul {
          list-style: none;
        }

        .footer-links li {
          margin-bottom: 0.75rem;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.7);
          transition: var(--transition-base);
        }

        .footer-links a:hover {
          color: var(--primary);
          padding-left: 5px;
        }

        .footer-contact p {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 0.75rem;
        }

        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr 1fr;
          }
        }
      `}</style>
        </footer>
    );
};

export default Footer;
