import mongoose from 'mongoose';

const standardSchema = mongoose.Schema({
    domain: { type: mongoose.Schema.Types.ObjectId, ref: 'Domain', required: true },
    code: { type: String, required: true }, // e.g., 'PSR.1'
    title: { type: String, required: true },
    description: { type: String },
    maxScore: { type: Number, default: 3 }, // Default GAHAR scale 0-3
    isMandatory: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

// Compound index to ensure unique codes within a domain or globally? 
// Usually codes are unique globally in GAHAR (e.g. NSR.01)
// Let's assume unique code globally for now
standardSchema.index({ code: 1 }, { unique: true });

const Standard = mongoose.model('Standard', standardSchema);
export default Standard;
