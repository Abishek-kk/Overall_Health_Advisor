// Notification Service for SMS, WhatsApp, and Email alerts
// This service handles disease alerts, vaccination reminders, and outbreak updates

class NotificationService {
    constructor() {
        this.webhookBaseUrl = process.env.TWILIO_ACCOUNT_SID || 'twilio_config';
        this.messageQueue = [];
        this.notificationLog = [];
    }

    /**
     * Send SMS notification (for button phone users)
     * @param {string} phoneNumber - Recipient phone number (+91XXXXXXXXXX format)
     * @param {string} message - Message content (max 160 chars)
     * @param {string} messageType - Type: 'vaccination', 'disease-alert', 'outbreak', 'emergency'
     */
    async sendSMS(phoneNumber, message, messageType = 'general') {
        try {
            const smsPayload = {
                to: phoneNumber,
                message: message,
                type: messageType,
                timestamp: new Date().toISOString(),
                priority: messageType === 'emergency' ? 'high' : 'normal'
            };

            // Log for backend processing
            this.messageQueue.push(smsPayload);
            this.notificationLog.push({
                method: 'SMS',
                recipient: phoneNumber,
                message: message,
                type: messageType,
                status: 'queued',
                timestamp: new Date()
            });

            // In production, integrate with Twilio or AWS SNS
            console.log(`[SMS] Queued to ${phoneNumber}: ${message}`);
            
            return {
                success: true,
                messageId: `SMS_${Date.now()}`,
                status: 'queued',
                recipient: phoneNumber
            };
        } catch (error) {
            console.error('SMS sending error:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Send WhatsApp notification (for smartphone users)
     * @param {string} phoneNumber - Recipient WhatsApp number
     * @param {object} messageData - Message with text, images, action buttons
     */
    async sendWhatsApp(phoneNumber, messageData) {
        const whatsappPayload = {
            to: phoneNumber,
            messageType: messageData.type || 'text',
            body: messageData.text,
            media: messageData.media || null,
            buttons: messageData.buttons || [],
            timestamp: new Date().toISOString()
        };

        this.messageQueue.push(whatsappPayload);
        this.notificationLog.push({
            method: 'WhatsApp',
            recipient: phoneNumber,
            messageType: messageData.type,
            status: 'queued',
            timestamp: new Date()
        });

        console.log(`[WhatsApp] Message queued for ${phoneNumber}`);
        
        return {
            success: true,
            messageId: `WA_${Date.now()}`,
            status: 'queued'
        };
    }

    /**
     * Send vaccination reminder (multi-channel)
     * @param {object} user - User object with phone, name, language
     * @param {object} vaccination - Vaccination details
     */
    async sendVaccinationReminder(user, vaccination) {
        const reminderMessages = {
            English: `📢 ${user.name}, upcoming vaccination reminder!\n${vaccination.vaccineName} is due on ${vaccination.dueDate}.\nVisit your nearest health center. Call 1075 for locations.`,
            Hindi: `📢 ${user.name}, टीकाकरण की याद दिलाई!✓ ${vaccination.vaccineName} के लिए ${vaccination.dueDate} को आना है। अपने निकटतम स्वास्थ्य केंद्र में जाएं।`,
            Tamil: `📢 ${user.name}, தடுப்பூசி நினைவூட்டல்!\n${vaccination.vaccineName} ${vaccination.dueDate} இல் பறிப்பாக குறிப்பிடப்பட்டுள்ளது। அருகிலுள்ள சுகாதார நிலையத்திற்குச் செல்லவும்.`
        };

        const message = reminderMessages[user.language || 'English'];

        // Send via multiple channels
        await this.sendSMS(user.phone, message.substring(0, 160), 'vaccination');
        
        if (user.whatsappEnabled) {
            await this.sendWhatsApp(user.phone, {
                type: 'vaccination-reminder',
                text: message,
                buttons: [
                    { title: 'Book Now', action: '/vaccination' },
                    { title: 'Find Center', action: '/healthcare-finder' }
                ]
            });
        }

        return { success: true, channels: ['SMS', 'WhatsApp'] };
    }

    /**
     * Send disease outbreak alert
     * @param {object} alert - Alert details
     * @param {array} recipients - Array of user objects
     */
    async sendOutbreakAlert(alert, recipients) {
        const alertMessages = {
            English: `⚠️ ${alert.disease} ALERT in ${alert.region}!\n${alert.action}. Call 102 for emergency.`,
            Hindi: `⚠️ 🦟 ${alert.disease} का अलर्ट!\n${alert.action}। आपातकाल के लिए 102 पर कॉल करें।`,
            Tamil: `⚠️ ${alert.disease} எச்சரிக்கை!\n${alert.action}. அவசரத்திற்கு 102 ஐ அழையுங்கள்.`
        };

        const results = [];
        for (const recipient of recipients) {
            const message = alertMessages[recipient.language || 'English'];
            
            // High priority - send via SMS
            const smsResult = await this.sendSMS(recipient.phone, message, 'outbreak');
            results.push(smsResult);

            // If WhatsApp enabled, send rich message
            if (recipient.whatsappEnabled) {
                await this.sendWhatsApp(recipient.phone, {
                    type: 'outbreak-alert',
                    text: message,
                    buttons: [
                        { title: 'View Details', action: '/disease-outbreaks' },
                        { title: 'Prevention Tips', action: '/climate-alerts' }
                    ]
                });
            }
        }

        return {
            success: true,
            recipientCount: recipients.length,
            results: results
        };
    }

    /**
     * Send climate-based health alert
     * @param {object} climateAlert - Climate alert data
     * @param {array} region - Region affected
     */
    async sendClimateAlert(climateAlert, region, recipients) {
        const alertMessages = {
            English: `🌧️ Heavy rainfall in ${region}. High dengue/malaria risk. Remove water. Use nets. Call 102 if fever.`,
            Hindi: `🌧️ ${region} में भारी बारिश। डेंगू/मलेरिया का जोखिम अधिक है। पानी हटाएं। जाली लगाएं। बुखार पर 102 कॉल करें।`,
            Tamil: `🌧️ ${region} இல் கனமான மழை. டெங்கு/மலேரியா ஆபத்து. நீர் அகற்று. வலை உபயோகிக்கவும். காய்ச்சலுக்கு 102 அழையுங்கள்.`
        };

        const results = [];
        for (const recipient of recipients) {
            const message = alertMessages[recipient.language || 'English'];
            const smsResult = await this.sendSMS(recipient.phone, message, 'disease-alert');
            results.push(smsResult);
        }

        return {
            success: true,
            recipientCount: recipients.length,
            alertType: 'climate',
            results: results
        };
    }

    /**
     * Send emergency health alert
     * @param {string} emergencyType - Type of emergency
     * @param {array} recipients - Emergency contacts
     */
    async sendEmergencyAlert(emergencyType, recipients) {
        const emergencyMessages = {
            chest_pain: '🚨 EMERGENCY: Chest pain detected. CALL 102 NOW!',
            difficulty_breathing: '🚨 EMERGENCY: Breathing difficulty. CALL 102 IMMEDIATELY!',
            unconscious: '🚨 EMERGENCY: Person unconscious. Call 102 + Nearby hospital!'
        };

        const message = emergencyMessages[emergencyType] || '🚨 HEALTH EMERGENCY! Call 102 Ambulance service NOW!';

        const results = [];
        for (const recipient of recipients) {
            // Ultra-high priority
            const smsResult = await this.sendSMS(recipient.phone, message, 'emergency');
            results.push(smsResult);

            // Try WhatsApp for faster delivery
            if (recipient.whatsappEnabled) {
                await this.sendWhatsApp(recipient.phone, {
                    type: 'emergency-alert',
                    text: message,
                    buttons: [
                        { title: 'Call 102', action: 'tel:102' }
                    ]
                });
            }
        }

        return {
            success: true,
            priority: 'CRITICAL',
            recipientCount: recipients.length,
            results: results
        };
    }

    /**
     * Get notification statistics for admin dashboard
     */
    async getNotificationStats() {
        const stats = {
            totalSent: this.notificationLog.length,
            byType: {},
            byMethod: {},
            successRate: 0,
            lastUpdated: new Date()
        };

        this.notificationLog.forEach(log => {
            stats.byType[log.type] = (stats.byType[log.type] || 0) + 1;
            stats.byMethod[log.method] = (stats.byMethod[log.method] || 0) + 1;
        });

        return stats;
    }

    /**
     * Batch send notifications to users in region
     */
    async broadcastToRegion(regionCode, messageData) {
        console.log(`[Broadcast] Sending to region ${regionCode}: ${messageData.title}`);
        
        // In production, fetch users from database by region
        return {
            success: true,
            regionCode: regionCode,
            messageQueued: true,
            estimatedRecipients: 'variable'
        };
    }
}

module.exports = NotificationService;
