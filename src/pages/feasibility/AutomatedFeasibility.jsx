import React, { useState, useEffect } from 'react';
import { Bot, Save, ArrowRight } from 'lucide-react';
import StudyPreviewModal from '../../components/StudyPreviewModal';

const AutomatedFeasibility = () => {
    useEffect(() => {
        document.title = "Automated Feasibility | Multiverse Healthcare";
    }, []);

    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        projectName: '',
        location: '',
        specialty: '',
        budget: '',
        timeline: '12 Months'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGeneratePPT = () => {
        setLoading(true);
        // Simulate AI generation time
        setTimeout(() => {
            console.log("PPT Generation - Library Disabled");
            setLoading(false);
            setShowModal(true);
        }, 1500);
    };

    const handleDownload = () => {
        alert("Downloading PowerPoint...");
        setShowModal(false);
    };

    return (
        <div className="feasibility-form-page">
            <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
                <div className="form-header">
                    <div className="icon-wrapper auto">
                        <Bot size={32} />
                    </div>
                    <h1>Automated Feasibility</h1>
                    <p>Provide basic project details, and our AI engine will generate a preliminary study with projected financial and operational metrics.</p>
                </div>

                <div className="glass-panel form-container">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Project Name</label>
                            <input
                                type="text"
                                name="projectName"
                                value={formData.projectName}
                                onChange={handleChange}
                                placeholder="e.g. Cairo Specialist Clinic"
                            />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="City, Country"
                            />
                        </div>
                        <div className="form-group">
                            <label>Primary Specialty</label>
                            <select name="specialty" value={formData.specialty} onChange={handleChange}>
                                <option value="">Select Specialty</option>
                                <option value="General Hospital">General Hospital</option>
                                <option value="Cardiology Center">Cardiology Center</option>
                                <option value="Dental Clinic">Dental Clinic</option>
                                <option value="Rehabilitation">Rehabilitation Center</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Estimated Budget (USD)</label>
                            <input
                                type="number"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                placeholder="500000"
                            />
                        </div>
                    </div>

                    <div className="action-bar">
                        <button className="btn-secondary">
                            <Save size={18} /> Save Draft
                        </button>
                        <button
                            className="btn-primary"
                            onClick={handleGeneratePPT}
                            disabled={!formData.projectName || loading}
                        >
                            {loading ? '...' : <Save size={18} />}
                            {loading ? 'Generating...' : 'Generate Study'}
                        </button>
                    </div>
                </div>
            </div>

            <StudyPreviewModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                data={formData}
                onDownload={handleDownload}
            />

            <style>{`
                .form-header {
                    text-align: center;
                    margin-bottom: 3rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .icon-wrapper.auto {
                    background: hsla(270, 50%, 90%, 1);
                    color: #8b5cf6;
                    padding: 1rem;
                    border-radius: 50%;
                    margin-bottom: 1rem;
                }
                .form-header h1 {
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                    color: var(--secondary);
                }
                .form-header p {
                    color: var(--text-secondary);
                    max-width: 600px;
                }
                .form-container {
                    padding: 3rem;
                    border-radius: var(--radius-lg);
                    max-width: 800px;
                    margin: 0 auto;
                }
                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    margin-bottom: 3rem;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: var(--secondary);
                }
                .form-group input, .form-group select {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid rgba(0,0,0,0.1);
                    border-radius: var(--radius-md);
                    font-size: 1rem;
                }
                .action-bar {
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    padding-top: 2rem;
                    border-top: 1px solid rgba(0,0,0,0.05);
                }
                .btn-primary, .btn-secondary {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.5rem;
                    border-radius: var(--radius-full);
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: none;
                }
                .btn-primary {
                    background: var(--primary);
                    color: white;
                }
                .btn-secondary {
                    background: transparent;
                    border: 1px solid var(--secondary);
                    color: var(--secondary);
                }
                .btn-primary:hover {
                    background: var(--secondary);
                    transform: translateY(-2px);
                }
                .btn-primary:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none;
                }
                .spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @media (max-width: 768px) {
                    .form-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
};

export default AutomatedFeasibility;
