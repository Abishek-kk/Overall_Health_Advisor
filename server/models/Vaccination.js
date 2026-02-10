const mongoose = require('mongoose');

const vaccinationSchema = new mongoose.Schema({
    childName: {
        type: String,
        required: true
    },
    vaccineName: {
        type: String,
        required: true
    },
    dueDate: {
        type: String, // Keeping as string for simplicity like 'At Birth', '6 Weeks' for now, or Date if we want strict scheduling
        required: true
    },
    status: {
        type: String,
        enum: ['Upcoming', 'Completed', 'Overdue'],
        default: 'Upcoming'
    },
    dateAdministered: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Vaccination', vaccinationSchema);
