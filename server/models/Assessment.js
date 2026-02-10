import mongoose from 'mongoose';

const scoreItemSchema = mongoose.Schema({
    standard: { type: mongoose.Schema.Types.ObjectId, ref: 'Standard', required: true },
    score: { type: Number, min: 0, max: 3 }, // 0, 1, 2, 3
    isNA: { type: Boolean, default: false },
    notes: { type: String },
    evidence: [{
        name: String,
        url: String, // Blob URL
        type: String,
        uploadedAt: { type: Date, default: Date.now }
    }]
});

const assessmentSchema = mongoose.Schema({
    facility: { type: mongoose.Schema.Types.ObjectId, ref: 'Facility', required: true },
    cycleName: { type: String, required: true }, // e.g., '2025 Cycle 1'
    status: { type: String, enum: ['draft', 'submitted', 'final'], default: 'draft' },
    scores: [scoreItemSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // Pre-calculated results for quick access
    calculatedScore: { type: Number },
    complianceStatus: { type: String } // Accredited, Conditional, Not Accredited
}, {
    timestamps: true
});

const Assessment = mongoose.model('Assessment', assessmentSchema);
export default Assessment;
