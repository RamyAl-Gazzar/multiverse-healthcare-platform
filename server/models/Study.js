import mongoose from 'mongoose';

const studySchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    type: { type: String, required: true, enum: ['Automated', 'Manual'] },
    status: { type: String, default: 'Draft' }, // Draft, Completed
    data: { type: Object, required: true }, // Stores the flexible form data
    version: { type: String, default: 'v1.0' }
}, {
    timestamps: true,
});

const Study = mongoose.model('Study', studySchema);
export default Study;
