import React, { useState, useEffect } from 'react';
import { FileEdit, Save, Plus, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import StudyPreviewModal from '../../components/StudyPreviewModal';
import { useAuth } from '../../context/AuthContext';

const ManualFeasibility = () => {
    useEffect(() => {
        document.title = "Manual Feasibility | Multiverse Healthcare";
    }, []);

    const { user } = useAuth();
    const { id } = useParams(); // Get ID from URL if editing
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');

    // Fetch existing data if editing
    useEffect(() => {
        if (id && user) {
            fetchStudyData(id);
        }
    }, [id, user]);

    const fetchStudyData = async (studyId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/studies`, { // Ideally we should have a GET /:id endpoint, but for now we filter locally or assuming we update the backend. Actually, studyController has no GET /:id for user? Checking... it does Update and Delete, but generic GET lists all. Let's use the list for now or assume we can filter from the list. Wait, standard REST usually implies GET /:id. The controller only has getStudies (all) and getAllStudies (admin). It lacks getSingleStudy for user.
                // WORKAROUND: Fetch all and find, or add GET /:id to controller.
                // Let's assume we can fetch all and find it for now to avoid touching backend immediately, or better, let's fix the backend.
                // Actually, let's try to add the backend endpoint first? No, let's stick to frontend for a second.
                // Using the 'getStudies' endpoint which returns array.
                headers: { Authorization: `Bearer ${user.token}` }
            });
            if (response.ok) {
                const studies = await response.json();
                const study = studies.find(s => s._id === studyId);
                if (study) {
                    setFormData(study.data);
                } else {
                    alert('Study not found');
                    navigate('/feasibility/drafts');
                }
            }
        } catch (error) {
            console.error("Error fetching study", error);
        } finally {
            setLoading(false);
        }
    };


    const [formData, setFormData] = useState({
        // 1. Project Overview
        projectTitle: '',
        projectCode: '',
        preparedBy: '',
        date: new Date().toISOString().split('T')[0],
        version: '1.0',

        // 2. Executive Summary
        executiveSummary: '',
        keyObjectives: '',
        expectedOutcomes: '',
        initialGoNoGo: 'Pending',

        // 3. Problem Statement
        currentChallenges: '',
        rootCauses: '',
        impactOnOperations: '',
        affectedStakeholders: '',

        // 4. Proposed Solution
        solutionDescription: '',
        scopeIn: '',
        scopeOut: '',
        keyFeatures: '',
        assumptions: '',

        // 5. Feasibility Dimensions
        // 5.1 Technical
        infrastructureReadiness: '',
        techStackCompatibility: '',
        integrationRequirements: '',
        securityConsiderations: '',
        technicalRisks: '',

        // 5.2 Operational
        processImpact: '',
        orgChanges: '',
        userAdoption: '',
        trainingNeeds: '',
        operationalRisks: '',

        // 5.3 Economic
        capex: '',
        opex: '',
        roiProjection: '',
        costBenefitAnalysis: '',
        financialRisks: '',

        // 5.4 Legal
        regulatoryReqs: '',
        dataProtection: '',
        contractualConstraints: '',
        complianceRisks: '',

        // 5.5 Schedule
        estimatedTimeline: '',
        criticalMilestones: '',
        dependencies: '',
        timeRisks: '',

        // 6. Alternatives Analysis
        alternatives: [
            { name: 'Option A', description: '', pros: '', cons: '' }
        ],

        // 7. Risk Assessment
        risks: [
            { description: '', likelihood: 'Low', impact: 'Low', mitigation: '', owner: '' }
        ],

        // 8. Evaluation Criteria
        successMetrics: '',
        kpis: '',
        acceptanceCriteria: '',

        // 9. Conclusion
        summaryFindings: '',
        recommendedOption: '',
        justification: '',
        finalDecision: 'Pending'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Alternatives Logic
    const handleAlternativeChange = (index, field, value) => {
        const newAlternatives = [...formData.alternatives];
        newAlternatives[index][field] = value;
        setFormData({ ...formData, alternatives: newAlternatives });
    };
    const addAlternative = () => {
        setFormData({
            ...formData,
            alternatives: [...formData.alternatives, { name: `Option ${String.fromCharCode(65 + formData.alternatives.length)}`, description: '', pros: '', cons: '' }]
        });
    };
    const removeAlternative = (index) => {
        const newAlternatives = formData.alternatives.filter((_, i) => i !== index);
        setFormData({ ...formData, alternatives: newAlternatives });
    };

    // Risks Logic
    const handleRiskChange = (index, field, value) => {
        const newRisks = [...formData.risks];
        newRisks[index][field] = value;
        setFormData({ ...formData, risks: newRisks });
    };
    const addRisk = () => {
        setFormData({
            ...formData,
            risks: [...formData.risks, { description: '', likelihood: 'Low', impact: 'Low', mitigation: '', owner: '' }]
        });
    };
    const removeRisk = (index) => {
        const newRisks = formData.risks.filter((_, i) => i !== index);
        setFormData({ ...formData, risks: newRisks });
    };

    const handleSave = async (status = 'Draft') => {
        if (!user) {
            alert("Please login to save your study.");
            return;
        }
        if (!formData.projectTitle) {
            alert("Project Title is required to save.");
            return;
        }

        setLoading(true);
        setSaveStatus('Saving...');

        try {
            const url = id
                ? `http://localhost:5000/api/studies/${id}`
                : 'http://localhost:5000/api/studies';
            const method = id ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    title: formData.projectTitle,
                    type: 'Manual',
                    status,
                    data: formData
                }),
            });

            if (response.ok) {
                const savedStudy = await response.json();
                setSaveStatus(status === 'Draft' ? 'Draft Saved!' : 'Study Completed!');

                // If we executed a create (POST), update URL to edit mode to avoid duplicates on subsequent saves
                if (!id && savedStudy._id) {
                    navigate(`/feasibility/manual/${savedStudy._id}`, { replace: true });
                }

                if (status === 'Draft') {
                    setTimeout(() => setSaveStatus(''), 3000);
                }
            } else {
                setSaveStatus('Error saving');
            }
        } catch (error) {
            console.error("Save failed", error);
            setSaveStatus('Error saving');
        } finally {
            setLoading(false);
        }
    };

    const handleGeneratePPT = async () => {
        await handleSave('Completed');
        setLoading(true);
        // Simulate processing time then open modal
        setTimeout(() => {
            setLoading(false);
            setShowModal(true);
        }, 1000);
    };

    const handleDownload = async () => {
        try {
            // Dynamically import pptxgenjs to avoid SSR/Initial load issues
            const pptxgen = (await import('pptxgenjs')).default;
            const pres = new pptxgen();

            // Slide 1: Title Slide
            let slide1 = pres.addSlide();
            slide1.addText("Feasibility Study Report", { x: 1, y: 1, w: 8, h: 1, fontSize: 36, align: 'center', color: '003366' });
            slide1.addText(formData.projectTitle || "Untitled Project", { x: 1, y: 2.5, w: 8, h: 0.5, fontSize: 24, align: 'center' });
            slide1.addText(`Date: ${formData.date}`, { x: 1, y: 3.5, w: 8, h: 0.5, fontSize: 18, align: 'center', color: '666666' });
            slide1.addText("Confidential", { x: 1, y: 5, w: 8, h: 0.5, fontSize: 14, align: 'center', color: '999999' });

            // Slide 2: Project Overview
            let slide2 = pres.addSlide();
            slide2.addText("Project Overview", { x: 0.5, y: 0.5, w: 9, h: 0.5, fontSize: 24, color: '003366', bold: true });
            slide2.addText(`Prepared By: ${formData.preparedBy}`, { x: 0.5, y: 1.5, fontSize: 16 });
            slide2.addText(`Version: ${formData.version}`, { x: 0.5, y: 2.0, fontSize: 16 });
            slide2.addText(`Project Code: ${formData.projectCode}`, { x: 0.5, y: 2.5, fontSize: 16 });

            // Slide 3: Executive Summary
            let slide3 = pres.addSlide();
            slide3.addText("Executive Summary", { x: 0.5, y: 0.5, w: 9, h: 0.5, fontSize: 24, color: '003366', bold: true });
            slide3.addText(formData.executiveSummary || "No summary provided.", { x: 0.5, y: 1.5, w: 9, h: 2, fontSize: 14, color: '333333' });
            slide3.addText(`Recommendation: ${formData.initialGoNoGo}`, { x: 0.5, y: 4, fontSize: 16, bold: true, color: '003366' });

            // Slide 4: Feasibility Dimensions (Summary)
            let slide4 = pres.addSlide();
            slide4.addText("Feasibility Analysis", { x: 0.5, y: 0.5, w: 9, h: 0.5, fontSize: 24, color: '003366', bold: true });

            const rows = [
                ['Dimension', 'Details'],
                ['Technical', formData.infrastructureReadiness || 'Pending'],
                ['Operational', formData.processImpact || 'Pending'],
                ['Economic', `ROI: ${formData.roiProjection || 'N/A'}`],
                ['Legal', formData.regulatoryReqs || 'Pending'],
                ['Schedule', formData.estimatedTimeline || 'Pending'],
            ];
            slide4.addTable(rows, { x: 0.5, y: 1.5, w: 9, colW: [2, 7], border: { pt: 1, color: "CCCCCC" } });

            // Slide 5: Conclusion
            let slide5 = pres.addSlide();
            slide5.addText("Conclusion & Recommendation", { x: 0.5, y: 0.5, w: 9, h: 0.5, fontSize: 24, color: '003366', bold: true });
            slide5.addText(formData.justification || "No justification provided.", { x: 0.5, y: 1.5, w: 9, h: 3, fontSize: 14 });
            slide5.addText(`Final Decision: ${formData.finalDecision}`, { x: 0.5, y: 5, fontSize: 18, bold: true, color: '003366' });

            pres.writeFile({ fileName: `${formData.projectTitle.replace(/\s+/g, '_')}_Feasibility_Study.pptx` });
            setShowModal(false);

        } catch (error) {
            console.error("PPT Generation Failed:", error);
            alert("Failed to generate PowerPoint. Please ensure all fields are valid.");
        }
    };

    const SectionHeader = ({ number, title, icon }) => (
        <div className="section-divider">
            <span className="section-number">{number}</span>
            <h3>{title}</h3>
        </div>
    );

    return (
        <div className="feasibility-form-page">
            <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
                <div className="form-header">
                    <div className="icon-wrapper manual"><FileEdit size={32} /></div>
                    <h1>Comprehensive Feasibility Study</h1>
                    <p>Complete all sections to generate a professional feasibility report.</p>
                </div>

                <div className="glass-panel form-container detailed">

                    {/* 1. Project Overview */}
                    <SectionHeader number="1" title="Project Overview" />
                    <div className="form-grid three-col">
                        <div className="form-group">
                            <label>Project Title</label>
                            <input type="text" name="projectTitle" value={formData.projectTitle} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Project Code / Ref</label>
                            <input type="text" name="projectCode" value={formData.projectCode} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Version</label>
                            <input type="text" name="version" value={formData.version} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Prepared By</label>
                            <input type="text" name="preparedBy" value={formData.preparedBy} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} />
                        </div>
                    </div>

                    {/* 2. Executive Summary */}
                    <SectionHeader number="2" title="Executive Summary" />
                    <div className="form-group">
                        <label>High-level Description</label>
                        <textarea rows="3" name="executiveSummary" value={formData.executiveSummary} onChange={handleChange} />
                    </div>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Key Objectives</label>
                            <textarea rows="3" name="keyObjectives" value={formData.keyObjectives} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Expected Outcomes</label>
                            <textarea rows="3" name="expectedOutcomes" value={formData.expectedOutcomes} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Initial Go/No-Go Recommendation</label>
                        <select name="initialGoNoGo" value={formData.initialGoNoGo} onChange={handleChange}>
                            <option>Pending</option>
                            <option>Go</option>
                            <option>No-Go</option>
                            <option>Conditional Go</option>
                        </select>
                    </div>

                    {/* 3. Problem Statement */}
                    <SectionHeader number="3" title="Problem Statement" />
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Current Challenges</label>
                            <textarea rows="2" name="currentChallenges" value={formData.currentChallenges} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Root Causes</label>
                            <textarea rows="2" name="rootCauses" value={formData.rootCauses} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Impact on Operations</label>
                            <textarea rows="2" name="impactOnOperations" value={formData.impactOnOperations} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Affected Stakeholders</label>
                            <textarea rows="2" name="affectedStakeholders" value={formData.affectedStakeholders} onChange={handleChange} />
                        </div>
                    </div>

                    {/* 4. Proposed Solution */}
                    <SectionHeader number="4" title="Proposed Solution" />
                    <div className="form-group">
                        <label>Solution Description</label>
                        <textarea rows="4" name="solutionDescription" value={formData.solutionDescription} onChange={handleChange} />
                    </div>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Scope (In-Scope)</label>
                            <textarea rows="3" name="scopeIn" value={formData.scopeIn} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Scope (Out-of-Scope)</label>
                            <textarea rows="3" name="scopeOut" value={formData.scopeOut} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Key Features / Capabilities</label>
                            <textarea rows="3" name="keyFeatures" value={formData.keyFeatures} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Assumptions</label>
                            <textarea rows="3" name="assumptions" value={formData.assumptions} onChange={handleChange} />
                        </div>
                    </div>

                    {/* 5. Feasibility Dimensions */}
                    <SectionHeader number="5" title="Feasibility Dimensions" />

                    <h4 className="subsection-title">5.1 Technical Feasibility</h4>
                    <div className="form-grid">
                        <div className="form-group"><label>Infrastructure Readiness</label><input name="infrastructureReadiness" value={formData.infrastructureReadiness} onChange={handleChange} /></div>
                        <div className="form-group"><label>Tech Stack Compatibility</label><input name="techStackCompatibility" value={formData.techStackCompatibility} onChange={handleChange} /></div>
                        <div className="form-group"><label>Integration Requirements</label><input name="integrationRequirements" value={formData.integrationRequirements} onChange={handleChange} /></div>
                        <div className="form-group"><label>Security Considerations</label><input name="securityConsiderations" value={formData.securityConsiderations} onChange={handleChange} /></div>
                    </div>

                    <h4 className="subsection-title">5.2 Operational Feasibility</h4>
                    <div className="form-grid">
                        <div className="form-group"><label>Process Impact</label><input name="processImpact" value={formData.processImpact} onChange={handleChange} /></div>
                        <div className="form-group"><label>Org. Changes Required</label><input name="orgChanges" value={formData.orgChanges} onChange={handleChange} /></div>
                        <div className="form-group"><label>User Adoption</label><input name="userAdoption" value={formData.userAdoption} onChange={handleChange} /></div>
                        <div className="form-group"><label>Training Needs</label><input name="trainingNeeds" value={formData.trainingNeeds} onChange={handleChange} /></div>
                    </div>

                    <h4 className="subsection-title">5.3 Economic Feasibility</h4>
                    <div className="form-grid three-col">
                        <div className="form-group"><label>Est. CAPEX</label><input type="number" name="capex" value={formData.capex} onChange={handleChange} /></div>
                        <div className="form-group"><label>Est. OPEX</label><input type="number" name="opex" value={formData.opex} onChange={handleChange} /></div>
                        <div className="form-group"><label>ROI Projection</label><input name="roiProjection" value={formData.roiProjection} onChange={handleChange} /></div>
                    </div>
                    <div className="form-group"><label>Cost-Benefit Analysis Summary</label><textarea rows="2" name="costBenefitAnalysis" value={formData.costBenefitAnalysis} onChange={handleChange} /></div>

                    <h4 className="subsection-title">5.4 Legal & Compliance</h4>
                    <div className="form-grid">
                        <div className="form-group"><label>Regulatory Requirements</label><input name="regulatoryReqs" value={formData.regulatoryReqs} onChange={handleChange} /></div>
                        <div className="form-group"><label>Data Protection</label><input name="dataProtection" value={formData.dataProtection} onChange={handleChange} /></div>
                    </div>

                    <h4 className="subsection-title">5.5 Schedule</h4>
                    <div className="form-grid">
                        <div className="form-group"><label>Est. Timeline</label><input name="estimatedTimeline" value={formData.estimatedTimeline} onChange={handleChange} /></div>
                        <div className="form-group"><label>Critical Milestones</label><input name="criticalMilestones" value={formData.criticalMilestones} onChange={handleChange} /></div>
                    </div>


                    {/* 6. Alternatives Analysis */}
                    <SectionHeader number="6" title="Alternatives Analysis" />
                    {formData.alternatives.map((alt, index) => (
                        <div key={index} className="alternative-card">
                            <div className="card-header">
                                <h4>{alt.name}</h4>
                                {formData.alternatives.length > 1 && (
                                    <button className="btn-icon danger" onClick={() => removeAlternative(index)}><Trash2 size={16} /></button>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input value={alt.description} onChange={(e) => handleAlternativeChange(index, 'description', e.target.value)} />
                            </div>
                            <div className="form-grid">
                                <div className="form-group"><label>Pros</label><textarea rows="2" value={alt.pros} onChange={(e) => handleAlternativeChange(index, 'pros', e.target.value)} /></div>
                                <div className="form-group"><label>Cons</label><textarea rows="2" value={alt.cons} onChange={(e) => handleAlternativeChange(index, 'cons', e.target.value)} /></div>
                            </div>
                        </div>
                    ))}
                    <button className="btn-secondary small" onClick={addAlternative}><Plus size={16} /> Add Alternative</button>


                    {/* 7. Risk Assessment */}
                    <SectionHeader number="7" title="Risk Assessment" />
                    <div className="risk-table-container">
                        <table className="risk-table">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Likelihood</th>
                                    <th>Impact</th>
                                    <th>Mitigation</th>
                                    <th>Owner</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.risks.map((risk, index) => (
                                    <tr key={index}>
                                        <td><input value={risk.description} onChange={(e) => handleRiskChange(index, 'description', e.target.value)} /></td>
                                        <td>
                                            <select value={risk.likelihood} onChange={(e) => handleRiskChange(index, 'likelihood', e.target.value)}>
                                                <option>Low</option><option>Medium</option><option>High</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select value={risk.impact} onChange={(e) => handleRiskChange(index, 'impact', e.target.value)}>
                                                <option>Low</option><option>Medium</option><option>High</option>
                                            </select>
                                        </td>
                                        <td><input value={risk.mitigation} onChange={(e) => handleRiskChange(index, 'mitigation', e.target.value)} /></td>
                                        <td><input value={risk.owner} onChange={(e) => handleRiskChange(index, 'owner', e.target.value)} /></td>
                                        <td>
                                            <button className="btn-icon danger" onClick={() => removeRisk(index)}><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="btn-secondary small" onClick={addRisk} style={{ marginTop: '1rem' }}><Plus size={16} /> Add Risk</button>
                    </div>

                    {/* 8. Evaluation Criteria */}
                    <SectionHeader number="8" title="Evaluation Criteria" />
                    <div className="form-grid">
                        <div className="form-group"><label>Success Metrics</label><textarea rows="2" name="successMetrics" value={formData.successMetrics} onChange={handleChange} /></div>
                        <div className="form-group"><label>KPIs</label><textarea rows="2" name="kpis" value={formData.kpis} onChange={handleChange} /></div>
                        <div className="form-group"><label>Acceptance Criteria</label><textarea rows="2" name="acceptanceCriteria" value={formData.acceptanceCriteria} onChange={handleChange} /></div>
                    </div>

                    {/* 9. Conclusion */}
                    <SectionHeader number="9" title="Conclusion & Recommendation" />
                    <div className="form-group"><label>Summary of Findings</label><textarea rows="2" name="summaryFindings" value={formData.summaryFindings} onChange={handleChange} /></div>
                    <div className="form-grid">
                        <div className="form-group"><label>Recommended Option</label><input name="recommendedOption" value={formData.recommendedOption} onChange={handleChange} /></div>
                        <div className="form-group">
                            <label>Final Go/No-Go Decision</label>
                            <select name="finalDecision" value={formData.finalDecision} onChange={handleChange}>
                                <option>Go</option><option>No-Go</option><option>Conditional</option><option>Pending</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group"><label>Justification</label><textarea rows="3" name="justification" value={formData.justification} onChange={handleChange} /></div>

                    <div className="action-bar">
                        {saveStatus && <span style={{ marginRight: '1rem', color: '#059669', fontWeight: '500' }}>{saveStatus}</span>}
                        <button className="btn-secondary" onClick={() => handleSave('Draft')}>
                            <Save size={18} /> Save Draft
                        </button>
                        <button
                            className="btn-primary"
                            onClick={handleGeneratePPT}
                            disabled={!formData.projectTitle || loading}
                        >
                            {loading ? '...' : <Save size={18} />}
                            {loading ? 'Generating...' : 'Generate Full Report'}
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
                .form-header { text-align: center; margin-bottom: 3rem; display: flex; flex-direction: column; align-items: center; }
                .icon-wrapper.manual { background: hsla(195, 50%, 90%, 1); color: var(--primary); padding: 1rem; border-radius: 50%; margin-bottom: 1rem; }
                .form-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: var(--secondary); }
                .form-container { padding: 3rem; border-radius: var(--radius-lg); max-width: 1100px; margin: 0 auto; }
                
                .section-divider { display: flex; align-items: center; gap: 1rem; margin: 3rem 0 1.5rem; padding-bottom: 0.5rem; border-bottom: 2px solid rgba(0,0,0,0.05); }
                .section-number { background: var(--secondary); color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.9rem; flex-shrink: 0; }
                .section-divider h3 { margin: 0; font-size: 1.25rem; color: var(--secondary); }
                
                .subsection-title { color: var(--primary); margin: 1.5rem 0 1rem; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; border-left: 3px solid var(--primary); padding-left: 0.75rem; }

                .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1rem; }
                .form-grid.three-col { grid-template-columns: 1fr 1fr 1fr; }
                
                .form-group { margin-bottom: 1rem; }
                .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--secondary); font-size: 0.9rem; }
                .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 0.75rem; border: 1px solid rgba(0,0,0,0.1); border-radius: var(--radius-md); font-size: 0.95rem; font-family: inherit; }
                .form-group input:focus, .form-group textarea:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }

                .alternative-card { background: #f8fafc; padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1rem; border: 1px solid rgba(0,0,0,0.05); }
                .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
                .card-header h4 { margin: 0; color: var(--text-primary); }

                .risk-table-container { overflow-x: auto; margin-bottom: 1rem; }
                .risk-table { width: 100%; border-collapse: collapse; min-width: 800px; }
                .risk-table th { text-align: left; padding: 0.75rem; background: #f1f5f9; color: var(--text-secondary); font-size: 0.85rem; font-weight: 600; }
                .risk-table td { padding: 0.5rem; border-bottom: 1px solid #e2e8f0; }
                .risk-table input, .risk-table select { width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: var(--radius-sm); }
                
                .btn-icon { background: none; border: none; cursor: pointer; padding: 0.25rem; border-radius: 4px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
                .btn-icon:hover { background: rgba(0,0,0,0.05); }
                .btn-icon.danger { color: #ef4444; }
                .btn-icon.danger:hover { background: #fee2e2; }

                .btn-secondary.small { padding: 0.5rem 1rem; font-size: 0.85rem; }

                .action-bar { display: flex; justify-content: flex-end; gap: 1rem; padding-top: 3rem; margin-top: 2rem; border-top: 1px solid rgba(0,0,0,0.05); }
                .btn-primary, .btn-secondary { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border-radius: var(--radius-full); font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; }
                .btn-primary { background: var(--primary); color: white; }
                .btn-secondary { background: transparent; border: 1px solid var(--secondary); color: var(--secondary); }
                .btn-primary:hover { background: var(--secondary); transform: translateY(-2px); }
                .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

                @media (max-width: 1024px) { .form-grid.three-col { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 768px) { .form-grid, .form-grid.three-col { grid-template-columns: 1fr; } }
            `}</style>
        </div>
    );
};

export default ManualFeasibility;
