import React, { useState } from 'react';
import { Bot, ArrowRight, Save, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StudyPreviewModal from '../../components/StudyPreviewModal';
import { useAuth } from '../../context/AuthContext';

const AutomatedFeasibility = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');

    const [formData, setFormData] = useState({
        location: '',
        specialty: '',
        budget: '',
        timeline: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGenerate = async () => {
        if (!user) {
            alert("Please login to generate and save a study.");
            return;
        }
        if (!formData.specialty || !formData.location) {
            alert("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setSaveStatus('Generating AI Report...');

        // Simulate AI Generation delay
        setTimeout(async () => {
            // Mock AI Data generation based on inputs
            const generatedData = {
                ...formData,
                title: `${formData.specialty} Clinic in ${formData.location}`,
                type: 'Automated',
                status: 'Completed',
                data: {
                    projectTitle: `${formData.specialty} Clinic Expansion`,
                    executiveSummary: `Automated feasibility assessment for a ${formData.specialty} facility in ${formData.location} with a budget of ${formData.budget}.`,
                    initialGoNoGo: 'Conditional Go',
                    roiProjection: '18% - 22% (Estimated)',
                    estimatedTimeline: formData.timeline || '12 Months',
                    justification: 'Market analysis suggests high demand but competitive saturation requires niche positioning.',
                    // ... other fields could be mocked here
                }
            };

            try {
                const response = await fetch('http://localhost:5000/api/studies', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                    body: JSON.stringify(generatedData),
                });

                if (response.ok) {
                    setSaveStatus('Report Generated!');
                    setShowModal(true);
                } else {
                    setSaveStatus('Error saving report');
                    alert('Failed to save report');
                }
            } catch (error) {
                console.error("Save failed", error);
                setSaveStatus('Connection Error');
            } finally {
                setLoading(false);
            }
        }, 2000);
    };

    const handleDownload = () => {
        // Logic handled in Modal, this just closes it after 'downloading'
        setShowModal(false);
        navigate('/feasibility');
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
                        <button className="btn-generate" onClick={handleGenerate} disabled={loading}>
                            {loading ? <Loader className="spin" size={24} /> : <Bot size={24} />}
                            {loading ? saveStatus : 'Initialize AI Analysis'}
                        </button>
                        <button
                            className="btn-primary"
                            onClick={handleGenerate} // Changed to handleGenerate
                            disabled={!formData.projectName || loading}
                        >
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
