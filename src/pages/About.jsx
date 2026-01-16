import React, { useEffect } from 'react';
import { Target, Lightbulb, Users, Globe } from 'lucide-react';

const About = () => {
    useEffect(() => {
        document.title = "About Us | Multiverse Healthcare";
    }, []);

    return (
        <div className="about-page">
            <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
                {/* Header */}
                <div className="section-header">
                    <span className="badge">Our Mission</span>
                    <h1 className="text-gradient">Transforming Healthcare in MENA</h1>
                    <p>
                        We are dedicated to establishing a comprehensive healthcare consulting and technology
                        ecosystem that empowers providers to achieve operational excellence and financial sustainability.
                    </p>
                </div>

                {/* Overview & Objectives */}
                <div className="about-grid">
                    <div className="glass-panel about-card">
                        <h2><Lightbulb className="icon" size={28} /> Strategic Vision</h2>
                        <p>
                            Multiverse Healthcare aims to become the leading partner for hospitals and medical centers
                            navigating the complexities of modern healthcare. We integrate financial, operational, and
                            technological expertise to deliver a unified value proposition.
                        </p>
                    </div>
                    <div className="glass-panel about-card">
                        <h2><Target className="icon" size={28} /> Key Objectives</h2>
                        <ul>
                            <li>Improve healthcare provider performance & financial outcomes</li>
                            <li>Support national accreditation goals (GAHAR)</li>
                            <li>Enable comprehensive digital transformation</li>
                            <li>Enhance decision-making through advanced analytics</li>
                        </ul>
                    </div>
                </div>

                {/* Market Context */}
                <div className="market-section">
                    <div className="market-content">
                        <h2>Why Now?</h2>
                        <p>
                            The Egyptian healthcare sector is undergoing a massive transformation driven by the
                            Universal Health Insurance (UHI) rollout, population growth, and increasing private sector investment.
                            There is a critical gap in the market for integrated support services—specifically in RCM
                            and performance analytics—which Multiverse Healthcare is uniquely positioned to fill.
                        </p>
                    </div>
                    <div className="market-stats">
                        <div className="stat-item">
                            <h3>20%</h3>
                            <p>Projected Annual Demand Growth</p>
                        </div>
                        <div className="stat-item">
                            <h3>GAHAR</h3>
                            <p>Mandatory Accreditation Readiness</p>
                        </div>
                        <div className="stat-item">
                            <h3>UHI</h3>
                            <p>Universal Health Insurance Rollout</p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .section-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 4rem;
        }

        .section-header h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .section-header p {
          color: var(--text-secondary);
          font-size: 1.25rem;
        }

        .about-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 6rem;
        }

        .about-card {
          padding: 2.5rem;
          border-radius: var(--radius-lg);
        }

        .about-card h2 {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          color: var(--secondary);
        }

        .about-card .icon {
          color: var(--primary);
        }

        .about-card p {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 1.1rem;
        }

        .about-card ul {
          list-style: none;
        }

        .about-card li {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
          position: relative;
          color: var(--text-primary);
        }

        .about-card li::before {
          content: "•";
          color: var(--primary);
          font-weight: bold;
          position: absolute;
          left: 0;
        }

        .market-section {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 4rem;
          align-items: center;
          padding: 4rem 0;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
        }

        .market-content h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: var(--secondary);
        }

        .market-content p {
          color: var(--text-secondary);
          font-size: 1.125rem;
          line-height: 1.8;
        }

        .market-stats {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .stat-item {
          background: white;
          padding: 1.5rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          text-align: center;
          border-left: 4px solid var(--accent);
        }

        .stat-item h3 {
          font-size: 2rem;
          color: var(--secondary);
          margin-bottom: 0.5rem;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
        }

        .stat-item p {
          color: var(--text-secondary);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .market-section {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
};

export default About;
