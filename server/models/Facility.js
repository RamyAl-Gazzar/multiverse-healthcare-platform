import mongoose from 'mongoose';

const facilitySchema = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String }, // e.g., 'Hospital', 'Primary Care'
    location: { type: String },
    contactEmail: { type: String },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

const Facility = mongoose.model('Facility', facilitySchema);
export default Facility;
