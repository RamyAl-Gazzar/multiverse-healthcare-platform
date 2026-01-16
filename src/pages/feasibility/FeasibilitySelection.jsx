import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, FileEdit, ArrowRight, FileText, Plus, Clock, CheckCircle } from 'lucide-react';
import StudyPreviewModal from '../../components/StudyPreviewModal';

const FeasibilitySelection = () => {
    useEffect(() => {
        document.title = "Feasibility Dashboard | Multiverse Healthcare";
    }, []);

    const [activeTab, setActiveTab] = useState('generated'); // 'drafts' or 'generated'
    const [selectedStudy, setSelectedStudy] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleViewReport = (study) => {
        setSelectedStudy({
            ...study,
            projectTitle: study.name,
            service: study.specialty || 'General Healthcare',
            location: 'Riyadh, KSA',
            budget: '2,500,000 SAR'
        });
        setShowModal(true);
    };

    const handleDownload = () => {
        alert("Downloading Historical Report...");
        setShowModal(false);
    };

    // Mock Data
    const drafts = [
        { id: 1, name: 'Dubai Clinic Expansion', date: '2024-03-10', type: 'Manual' },
        { id: 2, name: 'Cardiology Unit - Cairo', date: '2024-03-12', type: 'Automated' },
    ];

    const generatedStudies = [
        { id: 11, name: 'Riyadh General Hospital', date: '2024-02-28', status: 'Completed', type: 'Automated' },
        { id: 12, name: 'Jeddah Dental Center', date: '2024-03-01', status: 'Completed', type: 'Manual' },
    ];

    return (
        <div className="feasibility-page">
            <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>

                {/* Dashboard Header */}
                <div className="dashboard-header">
                    <div>
                        <span className="badge">Feasibility Manager</span>
                        <h1>Study Dashboard</h1>
                        <p>Manage your feasibility assessments and generate new reports.</p>
                    </div>
                    <button className="btn-create" onClick={() => document.getElementById('creation-section').scrollIntoView({ behavior: 'smooth' })}>
                        <Plus size={20} /> Create New Study
                    </button>
                </div>

                {/* Dashboard Tabs */}
                <div className="dashboard-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'generated' ? 'active' : ''}`}
                        onClick={() => setActiveTab('generated')}
                    >
                        <CheckCircle size={18} /> Generated Studies
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'drafts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('drafts')}
                    >
                        <Clock size={18} /> Saved Drafts
                    </button>
                </div>

                {/* Tab Content */}
                <div className="dashboard-content glass-panel">
                    {activeTab === 'generated' && (
                        <div className="study-list">
                            {generatedStudies.map(study => (
                                <div key={study.id} className="study-item">
                                    <div className="study-info">
                                        <div className="icon-box success"><FileText size={20} /></div>
                                        <div>
                                            <h3>{study.name}</h3>
                                            <span className="meta">{study.date} • {study.type}</span>
                                        </div>
                                    </div>
                                    <button className="btn-action" onClick={() => handleViewReport(study)}>View Report</button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'drafts' && (
                        <div className="study-list">
                            {drafts.map(draft => (
                                <div key={draft.id} className="study-item">
                                    <div className="study-info">
                                        <div className="icon-box draft"><FileEdit size={20} /></div>
                                        <div>
                                            <h3>{draft.name}</h3>
                                            <span className="meta">Last edited: {draft.date} • {draft.type}</span>
                                        </div>
                                    </div>
                                    <button className="btn-action">Continue</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="divider-section" id="creation-section">
                    <h2>Start a New Feasibility Study</h2>
                </div>

                {/* Creation Section (Previously Selection) */}
                <div className="selection-grid">
                    {/* Automated Path */}
                    <div className="selection-card glass-panel">
                        <div className="card-icon auto">
                            <Bot size={48} />
                        </div>
                        <h2>Automated Feasibility</h2>
                        <p>
                            Generate a comprehensive study quickly using our AI-driven engine.
                            Ideal for initial assessments.
                        </p>
                        <div className="service-select-container">
                            <label>Select Service Area:</label>
                            <select className="service-select">
                                <option>General Healthcare</option>
                                <option>Cardiology</option>
                                <option>Dental</option>
                                <option>Rehabilitation</option>
                            </select>
                        </div>
                        <Link to="/feasibility/auto" className="btn-select">Start Automation</Link>
                    </div>

                    {/* Manual Path */}
                    <div className="selection-card glass-panel">
                        <div className="card-icon manual">
                            <FileEdit size={48} />
                        </div>
                        <h2>Manual Creation</h2>
                        <p>
                            Build a highly detailed study with granular control over every financial
                            and operational parameter.
                        </p>
                        <div className="service-select-container">
                            <label>Select Service Area:</label>
                            <select className="service-select">
                                <option>General Healthcare</option>
                                <option>Specialized Clinic</option>
                            </select>
                        </div>
                        <Link to="/feasibility/manual" className="btn-select">Start Manual</Link>
                    </div>
                </div>
            </div>

            <style>{`
        .feasibility-page { min-height: 80vh; }
        .dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .dashboard-header h1 { font-size: 2.5rem; margin: 0.5rem 0; }
        .dashboard-header p { color: var(--text-secondary); margin: 0; }
        
        .btn-create {
            background: var(--primary);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: var(--radius-full);
            border: none;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .btn-create:hover { transform: translateY(-2px); box-shadow: var(--shadow-glow); }

        .dashboard-tabs { display: flex; gap: 1rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 1px; }
        .tab-btn {
            background: none;
            border: none;
            padding: 0.75rem 1.5rem;
            font-weight: 600;
            color: var(--text-secondary);
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            border-bottom: 2px solid transparent;
            transition: all 0.2s;
        }
        .tab-btn.active { color: var(--primary); border-bottom-color: var(--primary); }
        .tab-btn:hover { color: var(--text-primary); }

        .dashboard-content { padding: 0.5rem; border-radius: var(--radius-lg); margin-bottom: 4rem; }
        .study-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .study-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-md);
            transition: background 0.2s;
        }
        .study-item:hover { background: rgba(0,0,0,0.02); }
        .study-info { display: flex; align-items: center; gap: 1rem; }
        .study-info h3 { margin: 0; font-size: 1rem; color: var(--text-primary); }
        .study-info .meta { font-size: 0.85rem; color: var(--text-secondary); }
        .icon-box {
            width: 40px; height: 40px;
            border-radius: 50%;
            display: flex; justify-content: center; align-items: center;
        }
        .icon-box.success { background: hsla(160, 50%, 90%, 1); color: #059669; }
        .icon-box.draft { background: hsla(40, 50%, 90%, 1); color: #B45309; }
        
        .btn-action {
            background: white; border: 1px solid rgba(0,0,0,0.1);
            padding: 0.5rem 1rem; border-radius: var(--radius-full);
            font-size: 0.9rem; font-weight: 500; cursor: pointer;
            transition: all 0.2s;
        }
        .btn-action:hover { border-color: var(--primary); color: var(--primary); }

        .divider-section { text-align: center; margin: 4rem 0 3rem; position: relative; }
        .divider-section::before {
            content: ''; position: absolute; top: 50%; left: 0; right: 0;
            height: 1px; background: rgba(0,0,0,0.1); z-index: -1;
        }
        .divider-section h2 { background: #f8fafc; display: inline-block; padding: 0 2rem; color: var(--text-secondary); font-size: 1.5rem; }

        .selection-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 3rem;
            max-width: 1000px;
            margin: 0 auto;
        }
        .selection-card {
            padding: 2.5rem;
            border-radius: var(--radius-lg);
            text-align: center;
            transition: all 0.3s ease;
            display: flex; flex-direction: column; align-items: center;
        }
        .card-icon {
            width: 80px; height: 80px;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 1.5rem;
        }
        .card-icon.auto { background: hsla(270, 50%, 90%, 1); color: #8b5cf6; }
        .card-icon.manual { background: hsla(195, 50%, 90%, 1); color: var(--primary); }
        .service-select-container { width: 100%; text-align: left; margin: 1.5rem 0; }
        .service-select { width: 100%; padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid rgba(0,0,0,0.1); margin-top: 0.5rem; }
        .btn-select {
            background: var(--secondary); color: white;
            padding: 0.75rem 2rem; border-radius: var(--radius-full);
            font-weight: 600; text-decoration: none; display: inline-block;
            transition: all 0.2s; width: 100%;
        }
        .btn-select:hover { background: var(--primary); transform: translateY(-2px); box-shadow: var(--shadow-glow); }
            `}</style>
        </div>
    );
};

export default FeasibilitySelection;
