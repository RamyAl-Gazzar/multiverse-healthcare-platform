import Assessment from '../models/Assessment.js';
import Standard from '../models/Standard.js';

// @desc    Create a new assessment
// @route   POST /api/assessments
// @access  Private (Assessor/Admin)
const createAssessment = async (req, res) => {
    try {
        const { facilityId, cycleName } = req.body;

        // Check if assessment already exists for this facility and cycle
        const existingAssessment = await Assessment.findOne({ facility: facilityId, cycleName });
        if (existingAssessment) {
            return res.status(400).json({ message: 'Assessment for this cycle already exists' });
        }

        const assessment = await Assessment.create({
            facility: facilityId,
            cycleName,
            createdBy: req.user._id,
            status: 'draft',
            scores: [] // Start empty, will be populated as scores are added
        });

        res.status(201).json(assessment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get assessment by ID
// @route   GET /api/assessments/:id
// @access  Private
const getAssessmentById = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id)
            .populate('facility', 'name type')
            .populate('scores.standard', 'code title description maxScore domain');

        if (!assessment) {
            return res.status(404).json({ message: 'Assessment not found' });
        }
        res.json(assessment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update scores bulk
// @route   POST /api/assessments/:id/scores
// @access  Private
const updateAssessmentScores = async (req, res) => {
    try {
        const { scores } = req.body; // Array of { standardId, score, isNA, notes }
        const assessment = await Assessment.findById(req.params.id);

        if (!assessment) {
            return res.status(404).json({ message: 'Assessment not found' });
        }

        // Determine if we merge or replace? Usually merge/update.
        // We need to loop through input scores and update existing scoreItems or push new ones.

        for (const item of scores) {
            const existingIndex = assessment.scores.findIndex(s => s.standard.toString() === item.standardId);

            const scorePayload = {
                standard: item.standardId,
                score: item.score,
                isNA: item.isNA,
                notes: item.notes
            };

            if (existingIndex > -1) {
                // Update existing
                assessment.scores[existingIndex].score = item.score;
                assessment.scores[existingIndex].isNA = item.isNA;
                assessment.scores[existingIndex].notes = item.notes;
            } else {
                // Add new
                assessment.scores.push(scorePayload);
            }
        }

        // Trigger calculation (Simplified logic for now)
        // In a real app, we'd calculate domain scores here

        await assessment.save();
        res.json(assessment);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { createAssessment, getAssessmentById, updateAssessmentScores };
