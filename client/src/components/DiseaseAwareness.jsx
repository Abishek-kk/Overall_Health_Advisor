/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const diseases = [
    {
        id: 1,
        name: 'Dengue',
        symptoms: ['High fever', 'Severe headache', 'Pain behind eyes', 'Joint and muscle pain', 'Rash'],
        prevention: ['Use mosquito repellent', 'Wear long-sleeved shirts', 'Eliminate standing water'],
        treatment: 'No specific medicine. Pain relievers can help with fever and pain. Drink plenty of fluids.',
        severity: 'High'
    },
    {
        id: 2,
        name: 'Malaria',
        symptoms: ['Fever', 'Chills', 'Headache', 'Nausea', 'Vomiting', 'Muscle pain'],
        prevention: ['Mosquito nets', 'Antimalarial medication', 'Insect repellent'],
        treatment: 'Prescription drugs to kill the parasite.',
        severity: 'High'
    },
    {
        id: 3,
        name: 'Common Cold',
        symptoms: ['Runny nose', 'Sore throat', 'Cough', 'Congestion', 'Sneezing'],
        prevention: ['Wash hands often', 'Avoid close contact with sick people'],
        treatment: 'Rest, fluids, and over-the-counter medicines.',
        severity: 'Low'
    },
    {
        id: 4,
        name: 'COVID-19',
        symptoms: ['Fever or chills', 'Cough', 'Shortness of breath', 'Fatigue', 'Loss of taste or smell'],
        prevention: ['Vaccination', 'Masks in crowded areas', 'Hand hygiene'],
        treatment: 'Depends on severity. Mild cases can be treated at home. Severe cases need hospitalization.',
        severity: 'Variable'
    }
];

const DiseaseAwareness = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedId, setExpandedId] = useState(null);

    const filteredDiseases = diseases.filter(disease =>
        disease.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-deep-emerald mb-2">Disease Awareness</h2>
                <p className="text-gray-600">Verified information on common health conditions.</p>
            </div>

            <div className="relative mb-8 max-w-xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-deep-emerald focus:border-deep-emerald sm:text-sm shadow-md transition-shadow hover:shadow-lg"
                    placeholder="Search for a disease (e.g., Dengue)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {filteredDiseases.map((disease) => (
                    <motion.div
                        key={disease.id}
                        layout
                        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
                    >
                        <div
                            className="p-6 cursor-pointer flex justify-between items-center"
                            onClick={() => setExpandedId(expandedId === disease.id ? null : disease.id)}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${disease.severity === 'High' ? 'bg-red-500' : disease.severity === 'Low' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                <h3 className="text-xl font-bold text-gray-800">{disease.name}</h3>
                            </div>
                            {expandedId === disease.id ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
                        </div>

                        <AnimatePresence>
                            {expandedId === disease.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-6 pb-6 border-t border-gray-100 bg-gray-50"
                                >
                                    <div className="space-y-4 mt-4">
                                        <div>
                                            <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                                                <AlertCircle size={16} className="text-orange-500" /> Symptoms
                                            </h4>
                                            <ul className="list-disc list-inside text-gray-600 ml-1 text-sm mt-1">
                                                {disease.symptoms.map((s, i) => <li key={i}>{s}</li>)}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-green-700">Prevention</h4>
                                            <p className="text-gray-600 text-sm mt-1">{disease.prevention.join(', ')}.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-blue-700">Treatment</h4>
                                            <p className="text-gray-600 text-sm mt-1">{disease.treatment}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {filteredDiseases.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                    No diseases found matching "{searchTerm}".
                </div>
            )}
        </div>
    );
};

export default DiseaseAwareness;
