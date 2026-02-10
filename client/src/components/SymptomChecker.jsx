/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ChevronRight, CheckCircle, AlertTriangle } from 'lucide-react';

const SymptomChecker = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        symptoms: [],
        duration: ''
    });

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    const steps = [
        { title: "Basic Info", description: "Let's get to know you better." },
        { title: "Symptoms", description: "What are you feeling?" },
        { title: "Duration", description: "How long has this been happening?" },
        { title: "Analysis", description: "AI Assessment" }
    ];

    return (
        <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/50">
            <div className="bg-deep-emerald p-6 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
                <Activity className="w-10 h-10 mx-auto mb-2 text-emerald-200" />
                <h2 className="text-2xl font-bold">AI Symptom Checker</h2>
                <p className="text-emerald-100 text-sm">Step {step + 1} of {steps.length}: {steps[step].title}</p>

                {/* Progress Bar */}
                <div className="w-full bg-emerald-800 h-1.5 mt-4 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-emerald-300"
                        initial={{ width: 0 }}
                        animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                    />
                </div>
            </div>

            <div className="p-8 min-h-[400px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div
                            key="step0"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h3 className="text-xl font-semibold text-gray-800 text-center">Tell us about yourself</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                    <input
                                        type="number"
                                        value={formData.age}
                                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-deep-emerald focus:border-transparent outline-none transition-all"
                                        placeholder="e.g. 25"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    <div className="flex gap-4">
                                        {['Male', 'Female', 'Other'].map(g => (
                                            <button
                                                key={g}
                                                onClick={() => setFormData({ ...formData, gender: g })}
                                                className={`flex-1 py-3 px-4 rounded-xl border transition-all ${formData.gender === g
                                                    ? 'bg-deep-emerald text-white border-deep-emerald shadow-lg'
                                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h3 className="text-xl font-semibold text-gray-800 text-center">Select your symptoms</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {['Fever', 'Cough', 'Headache', 'Fatigue', 'Sore Throat', 'Nausea'].map(symptom => (
                                    <button
                                        key={symptom}
                                        onClick={() => {
                                            const newSymptoms = formData.symptoms.includes(symptom)
                                                ? formData.symptoms.filter(s => s !== symptom)
                                                : [...formData.symptoms, symptom];
                                            setFormData({ ...formData, symptoms: newSymptoms });
                                        }}
                                        className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${formData.symptoms.includes(symptom)
                                            ? 'bg-deep-emerald text-white border-deep-emerald ring-2 ring-emerald-200'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'
                                            }`}
                                    >
                                        {symptom}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h3 className="text-xl font-semibold text-gray-800 text-center">How long have you felt this way?</h3>
                            <div className="space-y-3">
                                {['Less than 24 hours', '1-3 days', 'A week', 'More than a week'].map(d => (
                                    <button
                                        key={d}
                                        onClick={() => setFormData({ ...formData, duration: d })}
                                        className={`w-full py-3 px-6 rounded-xl border text-left transition-all ${formData.duration === d
                                            ? 'bg-deep-emerald text-white border-deep-emerald shadow-md'
                                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-6"
                        >
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Analysis Complete</h3>
                            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl text-left">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="text-yellow-600 w-6 h-6 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-yellow-800">Potential Condition: Viral Flu</h4>
                                        <p className="text-sm text-yellow-700 mt-1">Based on "Fever" and "Fatigue".</p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600">We recommend staying hydrated and resting. If fever persists &gt; 3 days, visit a doctor.</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                    {step > 0 && (
                        <button
                            onClick={handleBack}
                            className="px-6 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors"
                        >
                            Back
                        </button>
                    )}
                    {step < 3 ? (
                        <button
                            onClick={handleNext}
                            disabled={step === 0 && (!formData.age || !formData.gender)}
                            className="ml-auto px-8 py-2.5 bg-deep-emerald text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-emerald-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            Next <ChevronRight size={18} />
                        </button>
                    ) : (
                        <button
                            onClick={() => window.location.href = '/'}
                            className="ml-auto px-8 py-2.5 bg-gray-900 text-white rounded-full font-bold shadow-lg hover:bg-black transition-all"
                        >
                            Back to Home
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SymptomChecker;
