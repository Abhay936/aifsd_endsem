const Complaint = require('../models/Complaint');
const { analyzeComplaint } = require('../services/aiService');

// @desc    Create a complaint
// @route   POST /api/complaints
// @access  Private
exports.createComplaint = async (req, res) => {
    try {
        const { title, description, category, location } = req.body;

        // Perform AI Analysis
        const aiResult = await analyzeComplaint(title, description, category);

        const complaint = await Complaint.create({
            name: req.user.name,
            email: req.user.email,
            title,
            description,
            category,
            location,
            priority: aiResult.priority,
            department: aiResult.department,
            aiSummary: aiResult.summary,
            aiResponse: aiResult.response
        });

        res.status(201).json(complaint);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all complaints (or search)
// @route   GET /api/complaints
// @access  Private
exports.getComplaints = async (req, res) => {
    try {
        const query = {};
        
        // Handle search by location
        if (req.query.location) {
            query.location = { $regex: req.query.location, $options: 'i' };
        }
        
        // Handle filter by category
        if (req.query.category) {
            query.category = req.query.category;
        }

        const complaints = await Complaint.find(query).sort({ createdAt: -1 });
        res.json(complaints);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get complaint by ID
// @route   GET /api/complaints/:id
// @access  Private
exports.getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.json(complaint);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update complaint status
// @route   PUT /api/complaints/:id
// @access  Private (Admin typically)
exports.updateComplaint = async (req, res) => {
    try {
        const { status } = req.body;
        
        let complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        complaint.status = status || complaint.status;
        await complaint.save();

        res.json(complaint);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete complaint
// @route   DELETE /api/complaints/:id
// @access  Private
exports.deleteComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        await complaint.deleteOne();
        res.json({ message: 'Complaint removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
