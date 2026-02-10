import mongoose from 'mongoose';

const domainSchema = mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true }, // e.g., 'PSR' (Patient Safety)
    weight: { type: Number, default: 0 }, // Percentage weight (0-100)
    description: { type: String },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

const Domain = mongoose.model('Domain', domainSchema);
export default Domain;
