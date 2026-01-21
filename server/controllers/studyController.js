import Study from '../models/Study.js';

// @desc    Get all studies for logged in user
// @route   GET /api/studies
export const getStudies = async (req, res) => {
    try {
        const studies = await Study.find({ user: req.user.id }).sort({ updatedAt: -1 });
        res.json(studies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new study
// @route   POST /api/studies
export const createStudy = async (req, res) => {
    const { title, type, data, status } = req.body;

    if (!title || !type) return res.status(400).json({ message: 'Title and Type are required' });

    try {
        const study = await Study.create({
            user: req.user.id,
            title,
            type,
            status: status || 'Draft',
            data,
        });
        res.status(201).json(study);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a study
// @route   PUT /api/studies/:id
export const updateStudy = async (req, res) => {
    try {
        const study = await Study.findById(req.params.id);

        if (!study) return res.status(404).json({ message: 'Study not found' });
        if (study.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

        const updatedStudy = await Study.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedStudy);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a study
// @route   DELETE /api/studies/:id
export const deleteStudy = async (req, res) => {
    try {
        const study = await Study.findById(req.params.id);

        if (!study) return res.status(404).json({ message: 'Study not found' });
        if (study.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

        await study.deleteOne();
        res.json({ message: 'Study removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// @desc    Get all studies (Admin)
// @route   GET /api/studies/all
export const getAllStudies = async (req, res) => {
    try {
        const studies = await Study.find({}).populate('user', 'id name email').sort({ updatedAt: -1 });
        res.json(studies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete any study (Admin)
// @route   DELETE /api/studies/admin/:id
export const deleteStudyAdmin = async (req, res) => {
    try {
        const study = await Study.findById(req.params.id);

        if (!study) return res.status(404).json({ message: 'Study not found' });

        await study.deleteOne();
        res.json({ message: 'Study removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
