import React from 'react';
import { X, Download, FileText } from 'lucide-react';

const StudyPreviewModal = ({ isOpen, onClose, data, onDownload }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content glass-panel">
                <div className="modal-header">
                    <h2>Feasibility Study Generated</h2>
                    <button className="close-btn" onClick={onClose}><X size={24} /></button>
                </div>

                <div className="modal-body">
                    <div className="success-banner">
                        <div className="icon-box">
                            <FileText size={32} />
                        </div>
                        <div>
                            <h3>{data.projectName || "Project Study"}</h3>
                            <p>Ready for review and download</p>
                        </div>
                    </div>

                    <div className="study-preview">
                        <div className="preview-section">
                            <h4>Project Details</h4>
                            <div className="detail-row">
                                <span>Service:</span>
                                <strong>{data.specialty || "General Healthcare"}</strong>
                            </div>
                            <div className="detail-row">
                                <span>Location:</span>
                                <strong>{data.location}</strong>
                            </div>
                            <div className="detail-row">
                                <span>Budget:</span>
                                <strong>${data.budget || data.constructionCost}</strong>
                            </div>
                        </div>

                        <div className="preview-section">
                            <h4>Projected Metrics</h4>
                            <div className="metric-grid">
                                <div className="metric">
                                    <label>ROI (5 Yr)</label>
                                    <span className="value high">18.5%</span>
                                </div>
                                <div className="metric">
                                    <label>Break-even</label>
                                    <span className="value">14 Months</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>Close</button>
                    <button className="btn-primary" onClick={onDownload}>
                        <Download size={18} /> Download PowerPoint
                    </button>
                </div>
            </div>

            <style>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    animation: fadeIn 0.2s ease;
                }
                .modal-content {
                    background: white;
                    width: 90%;
                    max-width: 500px;
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-xl);
                    animation: slideUp 0.3s ease;
                }
                .modal-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .modal-header h2 {
                    font-size: 1.25rem;
                    margin: 0;
                    color: var(--secondary);
                }
                .close-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: var(--text-secondary);
                }
                .modal-body {
                    padding: 1.5rem;
                }
                .success-banner {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                    padding: 1rem;
                    background: hsla(160, 50%, 95%, 1);
                    border-radius: var(--radius-md);
                }
                .icon-box {
                    background: var(--primary);
                    color: white;
                    padding: 0.75rem;
                    border-radius: 50%;
                }
                .success-banner h3 {
                    margin: 0 0 0.25rem 0;
                    font-size: 1.1rem;
                }
                .success-banner p {
                    margin: 0;
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                }
                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.75rem;
                    font-size: 0.95rem;
                }
                .preview-section {
                    margin-bottom: 1.5rem;
                }
                .preview-section h4 {
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: var(--text-secondary);
                    margin-bottom: 1rem;
                }
                .metric-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }
                .metric {
                    background: #f8fafc;
                    padding: 1rem;
                    border-radius: var(--radius-md);
                    text-align: center;
                }
                .metric label {
                    display: block;
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                    margin-bottom: 0.25rem;
                }
                .metric .value {
                    font-weight: 700;
                    font-size: 1.25rem;
                    color: var(--secondary);
                }
                .metric .value.high {
                    color: var(--primary);
                }
                .modal-footer {
                    padding: 1.5rem;
                    border-top: 1px solid rgba(0,0,0,0.05);
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            `}</style>
        </div>
    );
};

export default StudyPreviewModal;
