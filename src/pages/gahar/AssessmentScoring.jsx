import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ChevronDown, ChevronRight, Save, Upload, AlertCircle } from 'lucide-react';

const AssessmentScoring = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    // State
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [assessment, setAssessment] = useState(null);
    const [domains, setDomains] = useState([]);
    const [expandedDomain, setExpandedDomain] = useState(null);
    const [scores, setScores] = useState({}); // { [standardId]: { score: 0, isNA: false, notes: '' } }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Assessment to get existing scores
                const resAssessment = await fetch(`http://localhost:5000/api/assessments/${id}`, {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                const assessmentData = await resAssessment.json();
                setAssessment(assessmentData);

                // Initialize scores from assessment data
                const initialScores = {};
                if (assessmentData.scores) {
                    assessmentData.scores.forEach(s => {
                        // Standard might be populated or just ID depending on backend. 
                        // Our controller populates scores.standard.
                        const stdId = typeof s.standard === 'object' ? s.standard._id : s.standard;
                        initialScores[stdId] = {
                            score: s.score,
                            isNA: s.isNA,
                            notes: s.notes
                        };
                    });
                }
                setScores(initialScores);

                // Fetch Domains & Standards
                const resDomains = await fetch('http://localhost:5000/api/gahar/domains');
                const domainsData = await resDomains.json();

                // Fetch Standards for each domain
                const enrichedDomains = await Promise.all(domainsData.map(async (domain) => {
                    const resStandards = await fetch(`http://localhost:5000/api/gahar/domains/${domain._id}/standards`);
                    const standards = await resStandards.json();
                    return { ...domain, standards };
                }));

                setDomains(enrichedDomains);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data", error);
                setLoading(false);
            }
        };

        if (user) fetchData();
    }, [id, user]);

    const handleScoreChange = (standardId, value) => {
        setScores(prev => ({
            ...prev,
            [standardId]: {
                ...prev[standardId],
                score: value === 'NA' ? null : parseInt(value),
                isNA: value === 'NA'
            }
        }));
    };

    const saveProgress = async () => {
        setSaving(true);
        try {
            // Transform scores state to array for API
            const scoresArray = Object.entries(scores).map(([standardId, data]) => ({
                standardId,
                score: data.score,
                isNA: data.isNA,
                notes: data.notes
            }));

            const res = await fetch(`http://localhost:5000/api/assessments/${id}/scores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ scores: scoresArray })
            });

            if (!res.ok) throw new Error('Failed to save progress');

            alert('Progress saved successfully!');
        } catch (error) {
            console.error(error);
            alert('Error saving progress');
        } finally {
            setSaving(false);
        }
    };

    // Calculate Progress (Client-side approximation)
    const calculateProgressProperties = () => {
        let totalStandards = 0;
        let scoredStandards = 0;
        let totalWeightedScore = 0;

        domains.forEach(d => {
            const domainWeight = d.weight || 0;
            const standards = d.standards || [];
            let domainScoreSum = 0;
            let domainMaxScoreSum = 0;

            standards.forEach(s => {
                totalStandards++;
                const scoreData = scores[s._id];
                if (scoreData && (scoreData.score !== undefined || scoreData.isNA)) {
                    scoredStandards++;
                    if (!scoreData.isNA && scoreData.score !== null) {
                        domainScoreSum += scoreData.score;
                        domainMaxScoreSum += (s.maxScore || 3);
                    }
                }
            });

            // Domain contribution
            if (domainMaxScoreSum > 0) {
                const domainPercentage = domainScoreSum / domainMaxScoreSum;
                totalWeightedScore += (domainPercentage * domainWeight);
            }
        });

        const distinctPercent = Math.round(totalWeightedScore);

        return { percent: distinctPercent, completed: scoredStandards, total: totalStandards };
    };

    if (loading) return <div className="container" style={{ paddingTop: '8rem' }}>Loading Assessment...</div>;

    const stats = calculateProgressProperties();

    const toggleDomain = (domainId) => {
        setExpandedDomain(expandedDomain === domainId ? null : domainId);
    };

    return (
        <div className="assessment-page">
            <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
                <header className="assessment-header glass-panel">
                    <div>
                        <h1>Assessment Scorer</h1>
                        <p className="text-secondary">Reference ID: {id}</p>
                    </div>
                    <div className="header-actions">
                        <button className="btn-secondary" onClick={() => navigate('/gahar')}>Back to Dashboard</button>
                        <button className="btn-primary" onClick={saveProgress} disabled={saving}>
                            <Save size={18} /> {saving ? 'Saving...' : 'Save Progress'}
                        </button>
                    </div>
                </header>

                <div className="assessment-layout">
                    {/* Main Content - Accordion */}
                    <div className="domains-column">
                        {domains.map(domain => (
                            <div key={domain._id} className={`domain-card glass-panel ${expandedDomain === domain._id ? 'expanded' : ''}`}>
                                <div className="domain-header" onClick={() => toggleDomain(domain._id)}>
                                    <div className="domain-title">
                                        <h3>{domain.name} <span className="weight-badge">{domain.weight}%</span></h3>
                                        <p>{domain.description}</p>
                                    </div>
                                    <div className="domain-status">
                                        {expandedDomain === domain._id ? <ChevronDown /> : <ChevronRight />}
                                    </div>
                                </div>

                                {expandedDomain === domain._id && (
                                    <div className="domain-content">
                                        <table className="standards-table">
                                            <thead>
                                                <tr>
                                                    <th>Code</th>
                                                    <th>Standard</th>
                                                    <th>Score</th>
                                                    <th>Evidence</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {domain.standards.map(std => {
                                                    const scoreVal = scores[std._id]?.isNA ? 'NA' : (scores[std._id]?.score ?? '');
                                                    return (
                                                        <tr key={std._id}>
                                                            <td className="code-cell">{std.code}</td>
                                                            <td>
                                                                <strong>{std.title}</strong>
                                                                <p className="std-desc">{std.description}</p>
                                                            </td>
                                                            <td style={{ minWidth: '120px' }}>
                                                                <select
                                                                    className="score-select"
                                                                    value={scoreVal}
                                                                    onChange={(e) => handleScoreChange(std._id, e.target.value)}
                                                                >
                                                                    <option value="" disabled>Select</option>
                                                                    <option value="0">0 - Not Met</option>
                                                                    <option value="1">1 - Partial</option>
                                                                    <option value="2">2 - Largely</option>
                                                                    <option value="3">3 - Fully Met</option>
                                                                    <option value="NA">N/A</option>
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <button className="btn-icon">
                                                                    <Upload size={16} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right Panel - Dashboard */}
                    <div className="score-sidebar">
                        <div className="glass-panel sticky-panel">
                            <h3>Live Score</h3>
                            <div className="overall-score">
                                <span className="big-score">{stats.percent}%</span>
                                <span className="status-badge" style={{
                                    background: stats.percent >= 80 ? '#dcfce7' : '#fee2e2',
                                    color: stats.percent >= 80 ? '#166534' : '#991b1b',
                                    padding: '4px 12px',
                                    borderRadius: '12px',
                                    fontSize: '0.9rem',
                                    marginTop: '8px',
                                    display: 'inline-block'
                                }}>
                                    {stats.percent >= 80 ? 'Accredited' : 'Pending'}
                                </span>
                            </div>
                            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                                {stats.completed} / {stats.total} Standards Scored
                            </p>
                            <hr />
                            <div className="domain-breakdown">
                                <h4>Domain Breakdown</h4>
                                {domains.map(d => (
                                    <div key={d._id} className="mini-stat">
                                        <span>{d.code}</span>
                                        <div className="progress-bar">
                                            {/* Simplified domain progress visualization for now */}
                                            <div className="fill" style={{ width: '0%' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .assessment-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    border-radius: var(--radius-lg);
                }
                .assessment-layout {
                    display: grid;
                    grid-template-columns: 1fr 300px;
                    gap: 2rem;
                }
                .domain-card {
                    margin-bottom: 1rem;
                    border-radius: var(--radius-md);
                    overflow: hidden;
                    transition: all 0.3s ease;
                }
                .domain-header {
                    padding: 1.5rem;
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.4);
                }
                .domain-header:hover {
                    background: rgba(255, 255, 255, 0.6);
                }
                .weight-badge {
                    font-size: 0.8rem;
                    background: var(--bg-secondary);
                    padding: 2px 8px;
                    border-radius: 12px;
                    margin-left: 8px;
                }
                .domain-content {
                    padding: 1.5rem;
                    background: rgba(255, 255, 255, 0.2);
                    border-top: 1px solid rgba(255, 255, 255, 0.3);
                }
                .standards-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .standards-table th {
                    text-align: left;
                    padding-bottom: 1rem;
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                }
                .standards-table td {
                    padding: 1rem 0;
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                    vertical-align: top;
                }
                .code-cell {
                    font-weight: 600;
                    color: var(--primary);
                    width: 80px;
                }
                .std-desc {
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                    margin-top: 4px;
                }
                .score-select {
                    padding: 0.5rem;
                    border-radius: 6px;
                    border: 1px solid #ddd;
                    width: 100%;
                }
                .sticky-panel {
                    position: sticky;
                    top: 100px;
                    padding: 1.5rem;
                    border-radius: var(--radius-lg);
                }
                .overall-score {
                    text-align: center;
                    margin: 1.5rem 0;
                }
                .big-score {
                    font-size: 3rem;
                    font-weight: 800;
                    color: var(--primary);
                    display: block;
                    line-height: 1;
                }
                .mini-stat {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 10px;
                    font-size: 0.85rem;
                }
                .progress-bar {
                    flex: 1;
                    height: 6px;
                    background: #eee;
                    border-radius: 3px;
                    overflow: hidden;
                }
                .fill {
                    height: 100%;
                    background: var(--primary);
                }
                @media (max-width: 900px) {
                    .assessment-layout {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default AssessmentScoring;
