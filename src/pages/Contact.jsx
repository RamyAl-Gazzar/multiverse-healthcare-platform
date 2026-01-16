import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    useEffect(() => {
        document.title = "Contact | Multiverse Healthcare";
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send data to backend
        alert('Thank you for your message. We will contact you shortly.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="contact-page">
            <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
                <div className="section-header">
                    <span className="badge">Get in Touch</span>
                    <h1 className="text-gradient">Start Your Transformation</h1>
                    <p>
                        Ready to enhance your healthcare facility's performance? Contact our team
                        of experts for a consultation.
                    </p>
                </div>

                <div className="contact-grid">
                    {/* Contact Info */}
                    <div className="contact-info">
                        <div className="glass-panel info-card">
                            <h3>Contact Information</h3>
                            <div className="info-item">
                                <MapPin className="icon" size={24} />
                                <div>
                                    <h4>Visit Us</h4>
                                    <p>Cairo, Egypt</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <Mail className="icon" size={24} />
                                <div>
                                    <h4>Email Us</h4>
                                    <p>info@multiverse-health.com</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <Phone className="icon" size={24} />
                                <div>
                                    <h4>Call Us</h4>
                                    <p>+20 123 456 7890</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-wrapper">
                        <form className="glass-panel contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Dr. John Doe"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="john@hospital.com"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a Topic</option>
                                    <option value="RCM">Revenue Cycle Management</option>
                                    <option value="Accreditation">GAHAR Accreditation</option>
                                    <option value="Feasibility">Feasibility Study</option>
                                    <option value="General">General Inquiry</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <button type="submit" className="btn-submit">
                                Send Message <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <style>{`
        .section-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 4rem;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 4rem;
          align-items: start;
        }

        .info-card {
          padding: 2.5rem;
          border-radius: var(--radius-lg);
        }

        .info-card h3 {
          margin-bottom: 2rem;
          font-size: 1.5rem;
          color: var(--secondary);
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .info-item:last-child {
          margin-bottom: 0;
        }

        .info-item .icon {
          color: var(--primary);
          padding: 10px;
          background: hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.1);
          border-radius: var(--radius-full);
          box-sizing: content-box;
        }

        .info-item h4 {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 0.25rem;
        }

        .info-item p {
          font-weight: 600;
          color: var(--text-primary);
        }

        .contact-form {
          padding: 2.5rem;
          border-radius: var(--radius-lg);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--secondary);
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: var(--radius-md);
          font-family: inherit;
          font-size: 1rem;
          transition: var(--transition-base);
          background: rgba(255, 255, 255, 0.8);
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.1);
        }

        .btn-submit {
          width: 100%;
          background: var(--primary);
          color: white;
          padding: 1rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition-base);
        }

        .btn-submit:hover {
          background: var(--secondary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
};

export default Contact;
