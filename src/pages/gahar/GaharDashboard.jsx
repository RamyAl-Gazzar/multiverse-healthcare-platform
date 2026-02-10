import React, { useEffect, useState } from 'react';
import { ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const GaharDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [facilityName, setFacilityName] = useState('');

    useEffect(() => {
        document.title = "GAHAR Accreditation | Multiverse Healthcare";
    }, []);

    const handleInitialClick = () => {
        setShowModal(true);
    };

    const handleStartAssessment = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (!facilityName.trim()) {
            alert("Please enter a facility name");
            return;
        }

        setLoading(true);
        try {
            // 1. Create Facility
            const facilityRes = await fetch('http://localhost:5000/api/gahar/facilities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ name: facilityName, type: 'Hospital' })
            });
            const facilityData = await facilityRes.json();

            if (!facilityRes.ok) throw new Error(facilityData.message);

            // 2. Create Assessment
            const assessmentRes = await fetch('http://localhost:5000/api/assessments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    facilityId: facilityData._id,
                    cycleName: '2025 Initial Assessment'
                })
            });
            const assessmentData = await assessmentRes.json();

            if (!assessmentRes.ok) throw new Error(assessmentData.message);

            // 3. Navigate
            setShowModal(false);
            navigate(`/gahar/assessment/${assessmentData._id}`);

        } catch (error) {
            console.error("Error starting assessment:", error);
            alert("Failed to start assessment: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="gahar-dashboard">
            <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
                <div className="dashboard-header">
                    <div className="icon-badge">
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="text-gradient">GAHAR Accreditation Engine</h1>
                    <p>
                        Comprehensive scoring and compliance management for General Authority for Healthcare Accreditation and Regulation standards.
                    </p>
                </div>

                <div className="dashboard-content glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                    <h2>Welcome to the Accreditation Portal</h2>
                    <p style={{ maxWidth: '600px', margin: '1.5rem auto', color: 'var(--text-secondary)' }}>
                        Manage your facility's assessments, track compliance across domains, and generate readiness reports.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginTop: '2rem' }}>
                        {user ? (
                            <button
                                className="btn-primary"
                                onClick={handleInitialClick}
                                disabled={loading}
                            >
                                {loading ? 'Initializing...' : 'Start New Assessment'} <ArrowRight size={18} />
                            </button>
                        ) : (
                            <Link to="/login" className="btn-secondary">
                                Login to Start Assessment
                            </Link>
                        )}
                        <p style={{ fontSize: '0.8rem', color: '#999' }}>
                            Note: This will create a new assessment cycle for your facility.
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content glass-panel">
                        <h3>Start New Assessment</h3>
                        <p>Enter the name of the healthcare facility you are assessing.</p>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="e.g. Cairo General Hospital"
                            value={facilityName}
                            onChange={(e) => setFacilityName(e.target.value)}
                            autoFocus
                        />
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn-primary" onClick={handleStartAssessment} disabled={loading}>
                                {loading ? 'Creating...' : 'Start Assessment'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .dashboard-header {
                    text-align: center;
                    max-width: 800px;
                    margin: 0 auto 3rem;
                }
                .dashboard-header h1 {
                    font-size: 2.5rem;
                    margin: 1rem 0;
                }
                .dashboard-header p {
                    color: var(--text-secondary);
                    font-size: 1.15rem;
                }
                .icon-badge {
                    display: inline-flex;
                    padding: 1rem;
                    border-radius: 50%;
                    background: hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.1);
                    color: var(--primary);
                    margin-bottom: 1rem;
                }
                .btn-primary {
                    background: var(--primary);
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: var(--radius-full);
                    font-weight: 600;
                    border: none;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .btn-primary:disabled {
                    opacity: 0.7;
                    cursor: wait;
                }
                .btn-secondary {
                    padding: 0.75rem 1.5rem;
                    border-radius: var(--radius-full);
                    font-weight: 600;
                    color: var(--primary);
                    border: 1px solid var(--primary);
                    background: transparent;
                    cursor: pointer;
                }
                /* Modal Styles */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    backdrop-filter: blur(4px);
                }
                .modal-content {
                    background: white;
                    padding: 2rem;
                    border-radius: var(--radius-lg);
                    width: 100%;
                    max-width: 400px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.2);
                }
                .modal-content h3 {
                    margin-bottom: 0.5rem;
                }
                .modal-content p {
                    color: #666;
                    margin-bottom: 1.5rem;
                    font-size: 0.9rem;
                }
                .input-field {
                    width: 100%;
                    padding: 0.8rem;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    margin-bottom: 1.5rem;
                    font-size: 1rem;
                }
                .modal-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                }
            `}</style>
        </div>
    );
};

export default GaharDashboard;
