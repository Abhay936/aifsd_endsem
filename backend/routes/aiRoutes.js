const express = require('express');
const router = express.Router();
const { analyzeComplaint } = require('../services/aiService');
const { protect } = require('../middleware/authMiddleware');

// @desc    Analyze a complaint text manually
// @route   POST /api/ai/analyze
// @access  Private
router.post('/analyze', protect, async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const result = await analyzeComplaint(title, description, category);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error analyzing complaint' });
    }
});

module.exports = router;
