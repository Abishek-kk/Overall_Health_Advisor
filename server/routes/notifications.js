const express = require('express');
const router = express.Router();
const NotificationService = require('../services/notificationService');

const notificationService = new NotificationService();

/**
 * Send SMS to user
 * POST /api/notifications/send-sms
 */
router.post('/send-sms', async (req, res) => {
    try {
        const { phoneNumber, message, messageType } = req.body;
        
        if (!phoneNumber || !message) {
            return res.status(400).json({ 
                error: 'Phone number and message are required' 
            });
        }

        const result = await notificationService.sendSMS(phoneNumber, message, messageType);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Send vaccination reminder
 * POST /api/notifications/vaccination-reminder
 */
router.post('/vaccination-reminder', async (req, res) => {
    try {
        const { user, vaccination } = req.body;
        
        if (!user || !vaccination) {
            return res.status(400).json({ 
                error: 'User and vaccination details are required' 
            });
        }

        const result = await notificationService.sendVaccinationReminder(user, vaccination);
        res.json({
            success: true,
            message: 'Vaccination reminder sent',
            channels: result.channels
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Send outbreak alert to region
 * POST /api/notifications/outbreak-alert
 */
router.post('/outbreak-alert', async (req, res) => {
    try {
        const { alert, recipients } = req.body;
        
        if (!alert || !recipients || recipients.length === 0) {
            return res.status(400).json({ 
                error: 'Alert details and recipients are required' 
            });
        }

        const result = await notificationService.sendOutbreakAlert(alert, recipients);
        res.json({
            success: true,
            message: `Outbreak alert sent to ${result.recipientCount} recipients`,
            alertType: alert.disease,
            region: alert.region
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Send climate-based health alert
 * POST /api/notifications/climate-alert
 */
router.post('/climate-alert', async (req, res) => {
    try {
        const { climateAlert, region, recipients } = req.body;
        
        if (!climateAlert || !region || !recipients) {
            return res.status(400).json({ 
                error: 'Climate alert, region, and recipients are required' 
            });
        }

        const result = await notificationService.sendClimateAlert(
            climateAlert, 
            region, 
            recipients
        );

        res.json({
            success: true,
            message: `Climate alert sent to ${result.recipientCount} recipients`,
            alertType: climateAlert.type,
            region: region
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Send emergency alert
 * POST /api/notifications/emergency
 */
router.post('/emergency', async (req, res) => {
    try {
        const { emergencyType, recipients } = req.body;
        
        if (!emergencyType || !recipients) {
            return res.status(400).json({ 
                error: 'Emergency type and recipients are required' 
            });
        }

        const result = await notificationService.sendEmergencyAlert(
            emergencyType,
            recipients
        );

        res.json({
            success: true,
            priority: 'CRITICAL',
            message: `Emergency alert sent to ${result.recipientCount} contacts`,
            timestamp: new Date()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Broadcast alert to entire region
 * POST /api/notifications/broadcast
 */
router.post('/broadcast', async (req, res) => {
    try {
        const { regionCode, messageData } = req.body;
        
        if (!regionCode || !messageData) {
            return res.status(400).json({ 
                error: 'Region code and message data are required' 
            });
        }

        const result = await notificationService.broadcastToRegion(regionCode, messageData);

        res.json({
            success: true,
            message: 'Broadcast initiated',
            region: regionCode,
            timestamp: new Date()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Get notification statistics
 * GET /api/notifications/stats
 */
router.get('/stats', async (req, res) => {
    try {
        const stats = await notificationService.getNotificationStats();
        res.json({
            success: true,
            statistics: stats
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
