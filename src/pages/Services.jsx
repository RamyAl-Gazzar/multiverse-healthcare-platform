import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  FileSearch,
  Zap,
  ShieldCheck,
  Monitor,
  PieChart,
  BarChart2,
  TrendingUp,
  X,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  useEffect(() => {
    document.title = "Services | Multiverse Healthcare";
  }, []);

  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'rcm',
      title: 'Revenue Cycle Management',
      icon: <DollarSign size={32} />,
      description: 'Optimize financial outcomes through end-to-end RCM services.',
      details: 'Comprehensive management of the financial lifecycle, from patient registration to final payment. We reduce denials, accelerate cash flow, and ensure compliance with regulatory standards.',
      features: ['Claims Processing', 'Denial Management', 'Medical Coding', 'Patient Billing']
    },
    {
      id: 'feasibility',
      title: 'Feasibility Studies',
      icon: <FileSearch size={32} />,
      description: 'Data-driven insights for successful healthcare projects.',
      details: 'In-depth market analysis and financial modeling to assess the viability of new healthcare facilities or service expansions. We minimize risk and maximize investment potential.',
      features: ['Market Analysis', 'Financial Modeling', 'Risk Assessment', 'Site Selection']
    },
    {
      id: 'operational',
      title: 'Operational Excellence',
      icon: <Zap size={32} />,
      description: 'Streamline processes to enhance efficiency and patient care.',
      details: 'Lean Six Sigma methodologies applied to healthcare workflows. We eliminate waste, reduce wait times, and improve overall resource utilization.',
      features: ['Workflow Optimization', 'Lean Implementation', 'Staff Training', 'Resource Management']
    },
    {
      id: 'gahar',
      title: 'GAHAR Accreditation',
      icon: <ShieldCheck size={32} />,
      description: 'Expert guidance for national accreditation compliance.',
      details: 'Full support for General Authority for Healthcare Accreditation and Regulation (GAHAR) standards. We help you prepare, assess, and maintain compliance.',
      features: ['Gap Analysis', 'Mock Surveys', 'Policy Development', 'Staff Education']
    },
    {
      id: 'healthtech',
      title: 'Health Technology',
      icon: <Monitor size={32} />,
      description: 'Digital transformation solutions for modern healthcare.',
      details: 'Implementation of cutting-edge HIS, EMR, and telemedicine platforms. We ensure secure, interoperable, and user-friendly technology infrastructure.',
      features: ['HIS/EMR Integration', 'Telemedicine Setup', 'Cybersecurity', 'Interoperability']
    },
    {
      id: 'performance',
      title: 'Performance Dashboards',
      icon: <PieChart size={32} />,
      description: 'Real-time analytics for informed decision-making.',
      details: 'Customized dashboards that visualize key performance indicators (KPIs). Track clinical outcomes, patient satisfaction, and operational efficiency at a glance.',
      features: ['Real-time Reporting', 'Custom KPIs', 'Data Visualization', 'Trend Analysis']
    },
    {
      id: 'financial-dash',
      title: 'Financial Dashboards',
      icon: <BarChart2 size={32} />,
      description: 'Transparent view of your organization\'s financial health.',
      details: 'Monitor revenue, expenses, and profitability in real-time. Our financial dashboards provide granular insights to support strategic fiscal planning.',
      features: ['Revenue Tracking', 'Expense Monitoring', 'Profitability Analysis', 'Forecasting']
    },
    {
      id: 'sustainability',
      title: 'Financial Sustainability',
      icon: <TrendingUp size={32} />,
      description: 'Long-term strategies for economic stability and growth.',
      details: 'Advisory services to ensure your healthcare organization remains financially viable in a changing market. We focus on cost control, revenue diversification, and investment strategy.',
      features: ['Cost Control', 'Revenue Diversification', 'Strategic Planning', 'ROI Maximization']
    }
  ];

  return (
    <div className="services-page">
      <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
        <div className="section-header">
          <span className="badge">Our Expertise</span>
          <h1 className="text-gradient">Comprehensive Healthcare Solutions</h1>
          <p>
            An integrated portfolio designed to elevate performance, ensure compliance,
            and drive sustainable growth for healthcare providers.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.id}
              className="glass-card service-card"
              onClick={() => setSelectedService(service)}
            >
              <div className="icon-wrapper">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="card-arrow">
                Learn More <span style={{ marginLeft: '5px' }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Details */}
      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedService(null)}>
              <X size={24} />
            </button>

            <div className="modal-header">
              <div className="modal-icon">{selectedService.icon}</div>
              <h2>{selectedService.title}</h2>
            </div>

            <div className="modal-body">
              <p className="modal-description">{selectedService.details}</p>

              <div className="features-list">
                <h4>Key Features</h4>
                <ul>
                  {selectedService.features.map((feature, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} color="var(--accent)" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {selectedService.id === 'gahar' && (
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                  <Link to="/gahar" className="btn-primary" style={{ display: 'inline-flex', justifyContent: 'center' }}>
                    Proceed to Accreditation <ChevronRight size={16} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .service-card {
          padding: 2rem;
          border-radius: var(--radius-lg);
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.6);
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          background: rgba(255, 255, 255, 0.9);
          border-color: var(--primary);
        }

        .icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-md);
          background: hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.1);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .service-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--secondary);
        }

        .service-card p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .card-arrow {
          color: var(--primary);
          font-weight: 600;
          display: flex;
          align-items: center;
          font-size: 0.875rem;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          backdrop-filter: blur(5px);
          padding: 1rem;
        }

        .modal-content {
          background: white;
          width: 100%;
          max-width: 600px;
          border-radius: var(--radius-lg);
          padding: 2.5rem;
          position: relative;
          animation: modalSlide 0.3s ease-out;
        }

        @keyframes modalSlide {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .close-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          color: var(--text-secondary);
          transition: color 0.2s;
        }

        .close-btn:hover {
          color: var(--secondary);
        }

        .modal-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .modal-icon {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-lg);
          background: hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.1);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-header h2 {
          font-size: 2rem;
          color: var(--secondary);
        }

        .modal-description {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.7;
        }

        .features-list h4 {
          margin-bottom: 1rem;
          color: var(--primary);
        }

        .features-list ul {
          list-style: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .features-list li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-primary);
        }

        @media (max-width: 600px) {
          .features-list ul {
            grid-template-columns: 1fr;
          }
          .modal-header {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Services;
