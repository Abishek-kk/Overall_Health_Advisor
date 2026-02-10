const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/swasthya_sathi')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// Routes
const chatRoutes = require('./routes/chat');
const vaccinationRoutes = require('./routes/vaccination');
const notificationRoutes = require('./routes/notifications');

app.use('/api/chat', chatRoutes);
app.use('/api/vaccinations', vaccinationRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'SwasthyaSathi AI Server is running',
        version: '1.0.0',
        endpoints: {
            chat: '/api/chat',
            vaccinations: '/api/vaccinations',
            notifications: '/api/notifications'
        },
        features: [
            'AI Chatbot with multi-language support',
            'Symptom Detection & Disease Warnings',
            'Climate-Based Health Alerts',
            'Disease Outbreak Monitoring',
            'Vaccination Tracking',
            'SMS/WhatsApp Notifications',
            'Emergency Alert System',
            'Public Health Dashboard'
        ]
    });
});

app.listen(PORT, () => {
    console.log(`🚀 SwasthyaSathi Server running on port ${PORT}`);
    console.log(`📍 MongoDB: ${process.env.MONGO_URI || 'mongodb://localhost:27017'}`);
    console.log(`🌍 Available endpoints:`);
    console.log(`   - Chat API: http://localhost:${PORT}/api/chat`);
    console.log(`   - Vaccination API: http://localhost:${PORT}/api/vaccinations`);
    console.log(`   - Notifications API: http://localhost:${PORT}/api/notifications`);
});
