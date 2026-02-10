/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, MapPin, ShieldCheck, Languages, Syringe, AlertTriangle, BarChart3, CloudRain, MessageCircle } from 'lucide-react';

const features = [
    {
        icon: <MessageCircle className="w-8 h-8 text-deep-emerald" />,
        title: "AI Chat Assistant",
        description: "Chat with SwasthyaSathi in your language. Get instant health advice, symptom analysis, and personalized guidance 24/7.",
        color: "bg-emerald-50",
        link: "/chat"
    },
    {
        icon: <HeartPulse className="w-8 h-8 text-deep-emerald" />,
        title: "Symptom Checker",
        description: "Instant analysis of your symptoms with AI-driven triage advice and preventive care recommendations.",
        color: "bg-emerald-50",
        link: "/symptom-checker"
    },
    {
        icon: <Syringe className="w-8 h-8 text-pink-600" />,
        title: "Vaccination Tracker",
        description: "Track immunization schedules for children and set reminders for government vaccination programs.",
        color: "bg-pink-50",
        link: "/vaccination"
    },
    {
        icon: <MapPin className="w-8 h-8 text-blue-600" />,
        title: "Hospital Finder",
        description: "Locate nearby hospitals, clinics, and pharmacies in seconds with real-time data.",
        color: "bg-blue-50",
        link: "/healthcare-finder"
    },
    {
        icon: <CloudRain className="w-8 h-8 text-orange-600" />,
        title: "Climate & Disease Alerts",
        description: "Real-time disease risk alerts based on weather conditions (rainfall → dengue, heat → heatstroke).",
        color: "bg-orange-50",
        link: "/climate-alerts"
    },
    {
        icon: <AlertTriangle className="w-8 h-8 text-red-600" />,
        title: "Outbreak Alerts",
        description: "Government health advisories and real-time disease outbreak updates for your region.",
        color: "bg-red-50",
        link: "/disease-outbreaks"
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
        title: "Disease Awareness",
        description: "Verified information on diseases, prevention strategies, and treatment guidance.",
        color: "bg-purple-50",
        link: "/disease-awareness"
    },
    {
        icon: <BarChart3 className="w-8 h-8 text-indigo-600" />,
        title: "Public Health Dashboard",
        description: "Health authorities can track disease trends, symptoms patterns, and alert statistics.",
        color: "bg-indigo-50",
        link: "/admin-dashboard"
    },
    {
        icon: <Languages className="w-8 h-8 text-orange-600" />,
        title: "Multilingual Support",
        description: "Available in English, Hindi, Tamil, Telugu and more with voice input for accessibility.",
        color: "bg-orange-50"
    }
];

const Features = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why SwasthyaSathi?</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">Comprehensive healthcare support built for every Indian citizen.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-deep-emerald to-tech-blue rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                            <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full cursor-pointer" onClick={() => feature.link && (window.location.href = feature.link)}>
                                <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mb-6`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
