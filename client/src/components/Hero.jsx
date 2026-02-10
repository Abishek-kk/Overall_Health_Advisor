import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-ice-blue via-white to-soft-teal pt-16">
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-deep-emerald rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-20 right-10 w-72 h-72 bg-tech-blue rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-deep-emerald text-sm font-semibold mb-4 border border-emerald-200">
                        India's First AI Public Health Companion 🇮🇳
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
                        Your Health, <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-emerald to-tech-blue">Our Priority.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Get instant symptom analysis, verified medical info, and locate nearby hospitals in your local language. 24/7.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/chat" className="px-8 py-4 bg-deep-emerald text-white rounded-full font-bold text-lg hover:bg-emerald-800 transition-all shadow-lg hover:shadow-emerald-500/30 flex items-center justify-center gap-2">
                            Start Checkup <ActivityIcon />
                        </Link>
                        <button className="px-8 py-4 bg-white text-gray-800 rounded-full font-bold text-lg hover:bg-gray-50 transition-all shadow-lg border border-gray-200 flex items-center justify-center gap-2">
                            How it Works <ArrowRight size={20} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const ActivityIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
);

export default Hero;
