const express = require('express');
const router = express.Router();

// Symptom-to-disease mapping database
const diseaseDatabase = {
    'fever': [
        { disease: 'Common Cold/Flu', severity: 'Low', treatment: 'Rest, fluids, paracetamol' },
        { disease: 'Dengue', severity: 'Medium-High', treatment: 'Hospital visit, blood test, fluids' },
        { disease: 'Malaria', severity: 'Medium-High', treatment: 'Anti-malarial drugs, blood test' },
        { disease: 'COVID-19', severity: 'Medium', treatment: 'Home isolation, oxygen if needed' }
    ],
    'cough': [
        { disease: 'Common Cold', severity: 'Low', treatment: 'Honey, rest, cough drops' },
        { disease: 'Tuberculosis', severity: 'High', treatment: 'Hospital visit, TB tests' },
        { disease: 'Asthma', severity: 'Medium', treatment: 'Inhaler, doctor consultation' }
    ],
    'chest pain': [
        { disease: 'Heart Attack', severity: 'CRITICAL', treatment: '🚨 CALL 102 IMMEDIATELY' },
        { disease: 'Muscle strain', severity: 'Low', treatment: 'Rest, pain relief' }
    ]
};

// Climate-based disease risks
const climateRisks = {
    'heavy rainfall': {
        diseases: ['Dengue', 'Malaria', 'Cholera'],
        advice: '🦟 Remove stagnant water, use mosquito nets, boil water'
    },
    'high temperature': {
        diseases: ['Heatstroke', 'Dehydration', 'Heat exhaustion'],
        advice: '🌡️ Stay hydrated, avoid sun, monitor elderly/children'
    },
    'poor air quality': {
        diseases: ['Respiratory infections', 'Asthma', 'Pneumonia'],
        advice: '😷 Wear N95 mask, use air purifier, limit outdoor activity'
    }
};

// Preventive healthcare tips
const preventiveTips = {
    'child': [
        '👶 Ensure complete vaccination: DPT, Polio, MMR, Hepatitis B',
        '🥛 Provide nutritious diet with iron-rich foods',
        '🧼 Teach proper hand washing and hygiene',
        '😴 Ensure 8-10 hours of sleep daily'
    ],
    'elderly': [
        '👴 Regular health checkups (BP, diabetes, cholesterol)',
        '🏃 Light exercise like walking 30 mins daily',
        '💊 Take prescribed medications regularly',
        '👥 Avoid isolation, maintain social connections'
    ],
    'adult': [
        '💪 Exercise 30 minutes daily',
        '🥗 Maintain balanced diet, reduce salt/sugar',
        '🚭 Avoid tobacco and limit alcohol',
        '😴 Get 7-8 hours of quality sleep'
    ]
};

router.post('/', async (req, res) => {
    const { message, language, profile, location, detectedDisease } = req.body;

    const messageLower = message.toLowerCase();
    let response = '';
    let isEmergency = false;

    // Emergency detection
    const emergencyKeywords = ['chest pain', 'breathing difficulty', 'unconscious', 'bleeding', 'stroke', 'heart attack'];
    if (emergencyKeywords.some(keyword => messageLower.includes(keyword))) {
        response = `🚨 EMERGENCY DETECTED!\n\nYour symptoms suggest a critical condition.\n\n📞 Actions to take:\n1. CALL 102 (National Ambulance) IMMEDIATELY\n2. Call local emergency services\n3. If conscious, chew an aspirin\n4. Do not move unnecessarily\n5. Have someone stay with you\n\nDO NOT WAIT - Seek emergency care NOW!`;
        isEmergency = true;
    }
    // Symptom-based disease detection
    else if (detectedDisease) {
        response = `🏥 Analysis of Your Symptoms:\n\n`;
        response += `Potential Condition: ${detectedDisease.name}\n`;
        response += `Severity: ${detectedDisease.severity}\n`;
        response += `Recommended Action: ${detectedDisease.action}\n\n`;
        response += `⚠️ Please follow up with a doctor for confirmed diagnosis.`;
    }
    // Vaccination queries
    else if (messageLower.includes('vaccination') || messageLower.includes('vaccine')) {
        response = `💉 Vaccination Information:\n\n`;
        response += `🇮🇳 Government Vaccination Programs (Free):\n`;
        response += `• Birth to 6 years: DPT, Polio, MMR, Hepatitis B\n`;
        response += `• 9 years: HPV vaccine (girls)\n`;
        response += `• 15+ years: Booster doses as per schedule\n\n`;
        
        if (profile?.role === 'Child') {
            response += `For child "${profile.name}" (${profile.age} years):\n`;
            response += `✓ Next vaccine due at next major milestone\n`;
            response += `✓ Check local health center schedule\n`;
        }
        
        response += `\n📍 Visit nearest Anganwadi/Health Center for free vaccination.\n`;
        response += `No appointment needed. Vaccination camps every Saturday.`;
    }
    // Hospital finder
    else if (messageLower.includes('hospital') || messageLower.includes('clinic')) {
        response = `🏥 Nearby Healthcare Facilities (${location || 'Your Area'}):\n\n`;
        response += `1. City General Hospital - 1.2 km\n   📱 Emergency: 102\n   ⏰ Open 24/7\n\n`;
        response += `2. Dr. Sharma's Clinic - 0.8 km\n   📱 +91-XXXX-XXXX\n   ⏰ 10 AM - 9 PM\n\n`;
        response += `3. LifeCare Pharmacy - 0.5 km\n   📱 +91-XXXX-XXXX\n   ⏰ 24 Hours\n\n`;
        response += `💡 Tip: Always verify location before visiting.`;
    }
    // General health guidance
    else if (messageLower.includes('health') || messageLower.includes('prevention')) {
        const profileRole = profile?.role || 'Adult';
        response = `🛡️ Preventive Health Tips for ${profileRole}:\n\n`;
        
        const tips = preventiveTips[profileRole.toLowerCase()] || preventiveTips['adult'];
        tips.forEach(tip => response += `${tip}\n`);
        
        response += `\n📌 Remember: Prevention is better than cure!`;
    }
    // Default helpful response
    else {
        response = `👋 Hello! I'm SwasthyaSathi, your AI health assistant.\n\n`;
        response += `I can help you with:\n`;
        response += `✓ Symptom analysis (e.g., "I have fever and cough")\n`;
        response += `✓ Vaccination information\n`;
        response += `✓ Nearby hospital finder\n`;
        response += `✓ Disease prevention tips\n`;
        response += `✓ Health alerts based on your area\n\n`;
        response += `How can I assist you today?`;
    }

    // Add language note
    if (language !== 'English') {
        response += `\n\n💬 Response in ${language} will be provided via voice/text`;
    }

    setTimeout(() => {
        res.json({
            response: response,
            isEmergency: isEmergency,
            detectedDisease: detectedDisease,
            suggestedActions: isEmergency ? ["Call 102", "Seek Hospital"] : []
        });
    }, 500);
});

module.exports = router;
