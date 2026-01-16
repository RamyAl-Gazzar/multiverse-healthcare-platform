import React, { useEffect } from 'react';
import { ChevronRight, Activity, ShieldCheck, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    useEffect(() => {
        document.title = "Multiverse Healthcare | Integrated Solutions";
    }, []);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-content">
                    <div className="hero-text">
                        <span className="badge">Integrated Healthcare Solutions</span>
                        <h1 className="text-gradient">Elevating Healthcare Performance</h1>
                        <p>
                            We integrate operational excellence, financial sustainability, and digital transformation
                            to empower healthcare providers across the MENA region.
                        </p>
                        <div className="hero-actions">
                            <Link to="/services" className="btn-primary">
                                Explore Services <ChevronRight size={18} />
                            </Link>
                            <Link to="/contact" className="btn-secondary">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="glass-card stat-card c1">
                            <Activity size={24} color="var(--accent)" />
                            <div>
                                <h4>Operational</h4>
                                <p>Excellence</p>
                            </div>
                        </div>
                        <div className="glass-card stat-card c2">
                            <ShieldCheck size={24} color="var(--primary)" />
                            <div>
                                <h4>GAHAR</h4>
                                <p>Accreditation</p>
                            </div>
                        </div>
                        <div className="glass-card stat-card c3">
                            <BarChart3 size={24} color="#8b5cf6" />
                            <div>
                                <h4>Financial</h4>
                                <p>Sustainability</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-bg"></div>
            </section>

            {/* Executive Summary Section */}
            <section className="section summary">
                <div className="container">
                    <div className="glass-panel summary-card">
                        <h2>Why Multiverse Healthcare?</h2>
                        <p>
                            The healthcare sector is evolving rapidly. We provide a comprehensive portfolio of services
                            ranging from <strong>Revenue Cycle Management (RCM)</strong> and <strong>Feasibility Studies</strong> to
                            <strong>Health Tech Solutions</strong> and <strong>Performance Dashboards</strong>.
                            Our mission is to support your journey towards national accreditation and long-term financial health.
                        </p>
                    </div>
                </div>
            </section>

            <style>{`
        .hero {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          padding-top: 80px;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 70% 30%, hsla(var(--primary-h), var(--primary-s), 95%, 1) 0%, transparent 60%),
                      radial-gradient(circle at 30% 70%, hsla(var(--secondary-h), var(--secondary-s), 95%, 1) 0%, transparent 60%);
          z-index: -1;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-text {
          max-width: 600px;
        }

        .badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.1);
          color: var(--primary);
          border-radius: var(--radius-full);
          font-weight: 600;
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
        }

        .hero-text h1 {
          font-size: 3.5rem;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
          line-height: 1.1;
        }

        .hero-text p {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
          max-width: 90%;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
        }

        .btn-secondary {
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-full);
          font-weight: 600;
          color: var(--secondary);
          border: 1px solid var(--secondary);
          background: transparent;
          transition: var(--transition-base);
        }

        .btn-secondary:hover {
          background: hsla(var(--secondary-h), var(--secondary-s), var(--secondary-l), 0.05);
        }

        .hero-visual {
          position: relative;
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: var(--shadow-md);
          display: flex;
          align-items: center;
          gap: 1rem;
          position: absolute;
          width: 200px;
          transition: transform 0.3s ease;
        }

        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .stat-card.c1 {
          top: 10%;
          left: 10%;
          animation: float 6s ease-in-out infinite;
        }
        .stat-card.c2 {
          top: 40%;
          right: 5%;
          animation: float 6s ease-in-out infinite 1s;
        }
        .stat-card.c3 {
          bottom: 10%;
          left: 20%;
          animation: float 6s ease-in-out infinite 2s;
        }

        .stat-card h4 {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        .stat-card p {
          font-size: 1rem;
          font-weight: 700;
          color: var(--secondary);
        }

        .summary {
          padding: 4rem 0;
        }

        .summary-card {
          padding: 3rem;
          border-radius: var(--radius-lg);
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .summary-card h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: var(--secondary);
        }

        .summary-card p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.8;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @media (min-width: 768px) {
          .hero-content {
            grid-template-columns: 1.2fr 1fr;
          }
        }
      `}</style>
        </div>
    );
};

export default Home;
