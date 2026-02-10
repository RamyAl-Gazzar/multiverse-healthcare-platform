import Domain from '../models/Domain.js';
import Standard from '../models/Standard.js';

// @desc    Get all domains
// @route   GET /api/gahar/domains
// @access  Public (or Protected)
const getDomains = async (req, res) => {
    try {
        const domains = await Domain.find({ isActive: true }).sort('name');
        res.json(domains);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new domain
// @route   POST /api/gahar/domains
// @access  Admin
const createDomain = async (req, res) => {
    try {
        const { name, code, weight, description } = req.body;
        const domain = await Domain.create({ name, code, weight, description });
        res.status(201).json(domain);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get standards by domain
// @route   GET /api/gahar/domains/:domainId/standards
// @access  Public
const getStandardsByDomain = async (req, res) => {
    try {
        const standards = await Standard.find({ domain: req.params.domainId, isActive: true }).sort('code');
        res.json(standards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new standard
// @route   POST /api/gahar/standards
// @access  Admin
const createStandard = async (req, res) => {
    try {
        const { domain, code, title, description, maxScore, isMandatory } = req.body;
        const standard = await Standard.create({ domain, code, title, description, maxScore, isMandatory });
        res.status(201).json(standard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

import Facility from '../models/Facility.js';

// @desc    Create a new facility
// @route   POST /api/gahar/facilities
// @access  Private
const createFacility = async (req, res) => {
    try {
        const { name, type, location } = req.body;
        const facility = await Facility.create({ name, type, location });
        res.status(201).json(facility);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { getDomains, createDomain, getStandardsByDomain, createStandard, createFacility };
