/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, Zap, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const DiseaseOutbreaks = () => {
    const [selectedRegion, setSelectedRegion] = useState('National');

    const outbreaks = [
        {
            id: 1,
            disease: 'Dengue',
            region: 'Mumbai, Maharashtra',
            risk: 'HIGH',
            cases: '2,541',
            trend: 'increasing',
            advisoryTitle: '⚠️ Ministry of Health Alert',
            advisory: 'Heavy rainfall has created ideal breeding grounds for Aedes mosquitoes. Citizens are advised to:',
            recommendations: [
                'Remove standing water from containers, coolers, flower pots',
                'Use mosquito nets while sleeping',
                'Apply insect repellent regularly',
                'Seek medical attention if fever develops',
                'Get tested immediately if symptoms appear'
            ],
            timeline: '2-3 weeks expected peak',
            affectedAge: 'All ages, children at higher risk'
        },
        {
            id: 2,
            disease: 'Heatwave-Related Illnesses',
            region: 'Delhi, Rajasthan',
            risk: 'HIGH',
            cases: '1,823',
            trend: 'increasing',
            advisoryTitle: '🌡️ Heatwave Advisory - Public Health Department',
            advisory: 'Unprecedented heat wave detected. Temperature exceeds 45°C. Alert issued for:',
            recommendations: [
                'Stay indoors during 12 PM - 4 PM',
                'Drink at least 3-4 liters of water daily',
                'Avoid strenuous activities',
                'Check on elderly and children frequently',
                'Seek immediate medical help for dizziness, confusion, or unconsciousness'
            ],
            timeline: '7-10 days expected duration',
            affectedAge: 'Especially vulnerable: Elderly, children, outdoor workers'
        },
        {
            id: 3,
            disease: 'Respiratory Infections',
            region: 'Delhi, North India',
            risk: 'MODERATE',
            cases: '5,324',
            trend: 'stable',
            advisoryTitle: '🌫️ Air Quality Health Alert',
            advisory: 'Air Quality Index (AQI) in "Poor" category. Government recommends:',
            recommendations: [
                'Wear N95/N99 masks outdoors',
                'Avoid outdoor exercise during peak pollution hours (7-9 AM, 7-10 PM)',
                'Use air purifiers at home',
                'Ensure good ventilation indoors',
                'Monitor children and elderly for respiratory symptoms'
            ],
            timeline: 'Ongoing seasonal issue',
            affectedAge: 'Children, elderly, those with pre-existing conditions'
        },
        {
            id: 4,
            disease: 'Measles Cases',
            region: 'Urban Slums, Multiple States',
            risk: 'MODERATE',
            cases: '412',
            trend: 'increasing',
            advisoryTitle: '💉 Vaccination Drive Notice',
            advisory: 'Cluster of measles cases detected. Free vaccination camps announced:',
            recommendations: [
                'Ensure children receive 2 doses of MMR vaccine',
                'Visit nearby health centers for free vaccination',
                'Check immunization status regularly',
                'Report any measles symptoms (fever, rash) immediately',
                'Health camps: Every Saturday at community health centers'
            ],
            timeline: 'Ongoing vaccination drive for 3 months',
            affectedAge: 'Children 12 months - 15 years (Priority focus)'
        }
    ];

    const filteredOutbreaks = selectedRegion === 'National' 
        ? outbreaks 
        : outbreaks.filter(o => o.region.includes(selectedRegion));

    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Region Filter */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Zap size={20} className="text-yellow-600" /> Filter by Region
                </h3>
                <div className="flex flex-wrap gap-3">
                    {['National', 'Mumbai', 'Delhi', 'Chennai', 'Bangalore'].map(region => (
                        <button
                            key={region}
                            onClick={() => setSelectedRegion(region)}
                            className={`px-4 py-2 rounded-full font-medium transition-all ${
                                selectedRegion === region
                                    ? 'bg-deep-emerald text-white'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                        >
                            {region}
                        </button>
                    ))}
                </div>
            </div>

            {/* Outbreaks List */}
            <div className="space-y-6">
                {filteredOutbreaks.map((outbreak, index) => (
                    <motion.div
                        key={outbreak.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`border-l-4 rounded-lg p-6 ${
                            outbreak.risk === 'HIGH' 
                                ? 'border-red-500 bg-red-50' 
                                : 'border-yellow-500 bg-yellow-50'
                        }`}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">{outbreak.disease}</h3>
                                <p className="text-gray-600 flex items-center gap-2 mt-1">
                                    📍 {outbreak.region}
                                </p>
                            </div>
                            <div className="text-right">
                                <span className={`inline-block px-4 py-2 rounded-full font-bold text-white ${
                                    outbreak.risk === 'HIGH' ? 'bg-red-600' : 'bg-yellow-600'
                                }`}>
                                    {outbreak.risk} RISK
                                </span>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-white/50 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-600">Confirmed Cases</p>
                                <p className="text-lg font-bold text-gray-900">{outbreak.cases}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                    <TrendingUp size={14} /> Trend
                                </p>
                                <p className="text-lg font-bold capitalize text-gray-900">{outbreak.trend}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                    <Clock size={14} /> Timeline
                                </p>
                                <p className="text-lg font-bold text-gray-900">{outbreak.timeline}</p>
                            </div>
                        </div>

                        {/* Government Advisory */}
                        <div className="mb-6 p-4 bg-white border-l-4 border-deep-emerald rounded">
                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <AlertTriangle size={18} className="text-deep-emerald" /> 
                                {outbreak.advisoryTitle}
                            </h4>
                            <p className="text-gray-700 mb-3">{outbreak.advisory}</p>
                            <ul className="space-y-2">
                                {outbreak.recommendations.map((rec, i) => (
                                    <li key={i} className="text-gray-700 flex gap-2">
                                        <span className="text-deep-emerald font-bold">✓</span>
                                        <span>{rec}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Affected Population */}
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-900 mb-1">👥 Most Affected Groups</p>
                            <p className="text-gray-700">{outbreak.affectedAge}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Government Resources */}
            <div className="mt-8 p-6 bg-deep-emerald text-white rounded-lg">
                <h3 className="text-xl font-bold mb-4">📞 Government Health Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="font-semibold mb-2">Emergency Numbers</p>
                        <ul className="text-sm space-y-1">
                            <li>🚑 National Ambulance: 102</li>
                            <li>☎️ Health Hotline: 1075</li>
                            <li>💬 COVID Helpline: 1075</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold mb-2">Vaccination Camps</p>
                        <ul className="text-sm space-y-1">
                            <li>📍 Visit nearest Community Health Center</li>
                            <li>🕐 Free vaccination every weekday 10 AM - 2 PM</li>
                            <li>💉 No appointment needed</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiseaseOutbreaks;
