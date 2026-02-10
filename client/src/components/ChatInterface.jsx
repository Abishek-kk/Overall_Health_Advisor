/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Image as ImageIcon, Camera, Loader2, AlertCircle, Cloud, Droplets, Wind, ThermometerSun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../context/ProfileContext';

const ChatInterface = () => {
    const { activeProfile, profiles, switchProfile } = useProfile();
    const [messages, setMessages] = useState([
        { id: 1, text: "Namaste! I am SwasthyaSathi, your personal AI health assistant. I'm here to help you with symptom checking, vaccination tracking, health alerts, and more!", sender: 'bot', isWelcome: true }
    ]);
    const [inputText, setInputText] = useState('');
    const [language, setLanguage] = useState('English');
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState('Mumbai');
    // removed unused weatherData state (was unused in UI)
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Fetch weather-based disease alerts
    useEffect(() => {
        const fetchWeatherAlerts = async () => {
            const alerts = getWeatherBasedAlerts(location);
            if (alerts && alerts.length > 0) {
                const alertMessage = {
                    id: Date.now(),
                    text: alerts.map(a => `⚠️ ${a}`).join('\n'),
                    sender: 'bot',
                    isAlert: true
                };
                setMessages(prev => [...prev, alertMessage]);
            }
        };
        fetchWeatherAlerts();
    }, [location]);

    // Get weather-based disease alerts
    const getWeatherBasedAlerts = (area) => {
        const alerts = [];
        // Simulate weather conditions
        const conditions = {
            'Mumbai': { rainfall: 'heavy', temperature: 32, humidity: 85 },
            'Delhi': { rainfall: 'low', temperature: 38, humidity: 25 },
            'Chennai': { rainfall: 'moderate', temperature: 35, humidity: 70 },
            'Bangalore': { rainfall: 'light', temperature: 28, humidity: 60 }
        };

        const weather = conditions[area] || { rainfall: 'light', temperature: 30, humidity: 50 };

        if (weather.rainfall === 'heavy') {
            alerts.push('⚠️ DENGUE & MALARIA ALERT: Heavy rainfall detected in your area. Ensure proper mosquito nets and remove stagnant water.');
        }
        if (weather.temperature > 35) {
            alerts.push('🌡️ HEATWAVE WARNING: High temperature detected. Stay hydrated, avoid direct sun, and watch for heatstroke symptoms.');
        }
        if (weather.humidity > 70 && weather.rainfall === 'heavy') {
            alerts.push('🦟 DISEASE RISK: High humidity + rainfall creates ideal breeding ground for disease vectors.');
        }
        return alerts;
    };
    
    const handleVoiceInput = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Voice input is not supported in this browser.");
            return;
        }
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = language === 'Hindi' ? 'hi-IN' : language === 'Tamil' ? 'ta-IN' : 'en-US';
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInputText(transcript);
        };
        recognition.start();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageData = event.target?.result;
                const userMessage = { 
                    id: Date.now(), 
                    text: "📄 I've uploaded a lab report/prescription image for analysis", 
                    sender: 'user',
                    image: imageData 
                };
                setMessages(prev => [...prev, userMessage]);
                
                // Simulate AI analysis of report
                setTimeout(() => {
                    const botResponse = {
                        id: Date.now() + 1,
                        text: `📋 Report Analysis:\n\nBased on the uploaded document, here's a simplified explanation:\n\n✓ Your blood glucose level appears normal\n✓ Hemoglobin count is healthy\n⚠️ Slightly elevated cholesterol - consult a doctor for dietary guidance\n\nRecommendation: Follow up visit in 3 months. Maintain regular exercise and balanced diet.`,
                        sender: 'bot',
                        isAnalysis: true
                    };
                    setMessages(prev => [...prev, botResponse]);
                }, 1500);
            };
            reader.readAsDataURL(file);
        }
    };

    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = language === 'Hindi' ? 'hi-IN' : language === 'Tamil' ? 'ta-IN' : 'en-US';
            window.speechSynthesis.speak(utterance);
        }
    };

    // Intelligent symptom detection
    const detectDiseaseFromSymptoms = (symptoms) => {
        const symptomLower = symptoms.toLowerCase();
        const diseases = {
            'fever|cough|fatigue|sore throat': { name: 'Common Cold/Flu', severity: 'Low', action: 'Rest, fluids, monitor temp' },
            'fever|joint pain|headache|rash': { name: 'Dengue', severity: 'High', action: 'Visit hospital, increase fluids' },
            'fever|chills|sweating|headache': { name: 'Malaria', severity: 'High', action: 'Get blood test, visit doctor' },
            'chest pain|breathing difficulty|dizziness': { name: '⚠️ EMERGENCY', severity: 'Critical', action: 'Call 102 (ambulance) NOW!' },
            'continuous cough|difficulty breathing|chest pain': { name: 'Respiratory Issue', severity: 'High', action: 'Visit hospital immediately' }
        };

        for (const [pattern, disease] of Object.entries(diseases)) {
            if (pattern.split('|').some(symptom => symptomLower.includes(symptom))) {
                return disease;
            }
        }
        return null;
    };

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        const newMessage = { id: Date.now(), text: inputText, sender: 'user' };
        setMessages(prev => [...prev, newMessage]);
        setInputText('');
        setIsLoading(true);

        // Detect disease from symptoms locally
        const detectedDisease = detectDiseaseFromSymptoms(inputText);
        
        // AI Response from Backend
        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: inputText,
                    language: language,
                    profile: activeProfile,
                    location: location,
                    detectedDisease: detectedDisease
                })
            });

            const data = await response.json();

            let botResponse = {
                id: Date.now() + 1,
                text: data.response,
                sender: 'bot',
                isEmergency: data.isEmergency || (detectedDisease?.severity === 'Critical')
            };

            // Add preventive care tips
            if (!data.isEmergency && detectedDisease) {
                botResponse.text += `\n\n💡 Preventive Measures:\n- Maintain hygiene\n- Stay hydrated\n- Get adequate rest\n- Consult doctor if symptoms persist for 3+ days`;
            }

            setMessages(prev => [...prev, botResponse]);
            
            // Auto-speak response for accessibility
            if (language !== 'English') {
                speakText(data.response);
            }
        } catch (error) {
            console.error("Error fetching response:", error);
            const errorResponse = {
                id: Date.now() + 1,
                text: "Sorry, I'm having trouble connecting to the server. But I can still help! Based on your symptoms: " + (detectedDisease ? `You may have ${detectedDisease.name}. ${detectedDisease.action}` : "Please describe your symptoms in detail."),
                sender: 'bot'
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden h-[80vh] flex flex-col border border-emerald-100">
            {/* Chat Header with Profile & Location Selector */}
            <div className="bg-gradient-to-r from-deep-emerald to-emerald-700 p-4 text-white flex justify-between items-center flex-wrap gap-3">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <h2 className="font-semibold text-lg">SwasthyaSathi AI Health Assistant</h2>
                </div>
                
                {/* Profile Selector */}
                <select
                    value={activeProfile?.id || ''}
                    onChange={(e) => switchProfile(Number(e.target.value))}
                    className="bg-emerald-800 text-sm text-white rounded px-3 py-1.5 outline-none border border-emerald-600 focus:ring-1 focus:ring-emerald-400"
                >
                    <option value="">Select Profile</option>
                    {profiles.map(profile => (
                        <option key={profile.id} value={profile.id}>
                            {profile.avatar} {profile.name} ({profile.role})
                        </option>
                    ))}
                </select>

                {/* Location & Language Selector */}
                <div className="flex gap-2">
                    <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="bg-emerald-800 text-sm text-white rounded px-2 py-1.5 outline-none border border-emerald-600 focus:ring-1 focus:ring-emerald-400"
                    >
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Bangalore">Bangalore</option>
                    </select>

                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-emerald-800 text-sm text-white rounded px-2 py-1.5 outline-none border border-emerald-600 focus:ring-1 focus:ring-emerald-400"
                    >
                        <option value="English">English</option>
                        <option value="Hindi">हिंदी</option>
                        <option value="Tamil">தமிழ்</option>
                    </select>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl px-5 py-3 ${msg.sender === 'user'
                                ? 'bg-tech-blue text-white rounded-br-none'
                                : msg.isEmergency
                                    ? 'bg-red-50 border-2 border-red-400 text-red-800 rounded-bl-none shadow-sm animate-pulse'
                                    : msg.isAlert
                                        ? 'bg-yellow-50 border-2 border-yellow-400 text-yellow-800 rounded-bl-none shadow-sm'
                                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                                }`}
                        >
                            {msg.isEmergency && <strong className="block mb-1 text-red-600">🚨 EMERGENCY - CALL 102 NOW</strong>}
                            {msg.isAlert && <strong className="block mb-1 text-yellow-700">⚠️ HEALTH ALERT</strong>}
                            {msg.isWelcome && <div className="text-sm mb-2">👋</div>}
                            <div className="whitespace-pre-wrap">{msg.text}</div>
                            {msg.image && (
                                <img src={msg.image} alt="Report" className="mt-2 rounded-lg max-h-48 w-auto" />
                            )}
                        </div>
                    </motion.div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm flex items-center space-x-2">
                            <Loader2 className="w-4 h-4 animate-spin text-deep-emerald" />
                            <span className="text-gray-500 text-sm">SwasthyaSathi is analyzing...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex items-center space-x-2">
                    {/* Image Upload */}
                    <label className="p-2 text-gray-400 hover:text-deep-emerald transition-colors rounded-full hover:bg-emerald-50 cursor-pointer">
                        <ImageIcon size={20} />
                        <input 
                            type="file" 
                            accept="image/*,application/pdf" 
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </label>

                    {/* Voice Input */}
                    <button 
                        onClick={handleVoiceInput} 
                        className="p-2 text-gray-400 hover:text-deep-emerald transition-colors rounded-full hover:bg-emerald-50"
                        title={`Voice input (${language})`}
                    >
                        <Mic size={20} />
                    </button>

                    {/* Text Input */}
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Describe your symptoms or ask a health question..."
                        className="flex-grow px-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-deep-emerald focus:bg-white transition-all"
                    />

                    {/* Send Button */}
                    <button
                        onClick={handleSendMessage}
                        className="p-3 bg-deep-emerald text-white rounded-full hover:bg-emerald-800 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                        disabled={!inputText.trim() || isLoading}
                    >
                        <Send size={20} />
                    </button>
                </div>
                
                {/* Quick Actions */}
                <div className="mt-3 flex flex-wrap gap-2">
                    <button 
                        onClick={() => setInputText('What are vaccination reminders for a child?')}
                        className="text-xs px-3 py-1 bg-emerald-50 text-deep-emerald rounded-full border border-emerald-200 hover:bg-emerald-100"
                    >
                        💉 Vaccinations
                    </button>
                    <button 
                        onClick={() => setInputText('Show me nearby hospitals')}
                        className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200 hover:bg-blue-100"
                    >
                        🏥 Hospitals
                    </button>
                    <button 
                        onClick={() => setInputText('Fever, cough, sore throat')}
                        className="text-xs px-3 py-1 bg-orange-50 text-orange-700 rounded-full border border-orange-200 hover:bg-orange-100"
                    >
                        🤒 Symptoms
                    </button>
                    <button 
                        onClick={() => setInputText('Prevention tips for health')}
                        className="text-xs px-3 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-200 hover:bg-purple-100"
                    >
                        🛡️ Prevention
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
