const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// @desc    Get all content
// @route   GET /api/content
// @access  Public
router.get('/', async (req, res) => {
    try {
        const content = await Content.find({});
        res.json(content);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update content
// @route   PUT /api/content
// @access  Private/Admin
router.put('/', protect, admin, async (req, res) => {
    const { key, value, section, type } = req.body;

    // Simple validation
    if (!key || !value) {
        return res.status(400).json({ message: 'Key and Value are required' });
    }

    try {
        // Upsert: update if exists, insert if not
        const content = await Content.findOneAndUpdate(
            { key },
            { value, section, type },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.json(content);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Update failed' });
    }
});

module.exports = router;
