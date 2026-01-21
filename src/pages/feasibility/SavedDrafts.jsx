import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FileText, Clock, ArrowRight, Trash2 } from 'lucide-react';

const SavedDrafts = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [drafts, setDrafts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchDrafts();
    }, [user, navigate]);

    const fetchDrafts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/studies', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                // Filter only drafts
                const draftStudies = data.filter(study => study.status === 'Draft');
                setDrafts(draftStudies);
            } else {
                setError('Failed to fetch drafts');
            }
        } catch (err) {
            setError('Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation(); // Prevent navigating to edit
        if (!window.confirm('Are you sure you want to delete this draft?')) return;

        try {
            const response = await fetch(`http://localhost:5000/api/studies/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (response.ok) {
                setDrafts(drafts.filter(d => d._id !== id));
            }
        } catch (err) {
            console.error('Delete failed', err);
        }
    };

    if (loading) return <div className="container" style={{ paddingTop: '8rem' }}>Loading...</div>;

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <h1>Saved Drafts</h1>
            <p>Continue working on your feasibility studies.</p>

            {error && <div style={{ color: 'red', margin: '1rem 0' }}>{error}</div>}

            {drafts.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '3rem', padding: '3rem', background: '#f9fafb', borderRadius: '1rem' }}>
                    <p>No saved drafts found.</p>
                    <button className="btn-primary" onClick={() => navigate('/feasibility/manual')} style={{ marginTop: '1rem' }}>
                        Start New Study
                    </button>
                </div>
            ) : (
                <div className="drafts-grid" style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem' }}>
                    {drafts.map(draft => (
                        <div
                            key={draft._id}
                            className="draft-card glass-panel"
                            onClick={() => navigate(`/feasibility/manual/${draft._id}`)}
                            style={{ cursor: 'pointer', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'var(--transition-base)' }}
                        >
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ background: '#e0f2fe', padding: '1rem', borderRadius: '50%', color: '#0284c7' }}>
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{draft.title}</h3>
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                            <Clock size={14} /> Last updated: {new Date(draft.updatedAt).toLocaleDateString()}
                                        </span>
                                        <span>Type: {draft.type}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <button
                                    className="btn-icon danger"
                                    onClick={(e) => handleDelete(e, draft._id)}
                                    style={{ padding: '0.5rem', borderRadius: '50%' }}
                                >
                                    <Trash2 size={20} />
                                </button>
                                <ArrowRight size={24} color="#CBD5E1" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style>{`
                .draft-card:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-md);
                    border-color: var(--primary);
                }
            `}</style>
        </div>
    );
};

export default SavedDrafts;
