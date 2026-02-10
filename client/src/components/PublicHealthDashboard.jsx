/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BarChart3, TrendingUp, AlertCircle, Users, Activity, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const PublicHealthDashboard = () => {
    const [timeRange, setTimeRange] = useState('1month');

    // Mock data - In real app, this would come from backend
    const dashboardData = {
        totalQueries: 12453,
        activeUsers: 8234,
        alertsSent: 3421,
        outbreakRisk: 'HIGH',
        queriesTrend: 15.4, // percentage
        alertsTrend: 8.2,
        usersTrend: 12.1
    };

    const symptomTrends = [
        { symptom: 'Fever', percentage: 32, color: 'bg-red-500', count: 3981 },
        { symptom: 'Cough', percentage: 28, color: 'bg-orange-500', count: 3486 },
        { symptom: 'Headache', percentage: 22, color: 'bg-yellow-500', count: 2740 },
        { symptom: 'Fatigue', percentage: 18, color: 'bg-purple-500', count: 2246 }
    ];

    const regionData = [
        { region: 'Mumbai', cases: 524, alerts: 89, risk: 'HIGH' },
        { region: 'Delhi', cases: 412, alerts: 76, risk: 'MODERATE' },
        { region: 'Chennai', cases: 238, alerts: 45, risk: 'LOW' },
        { region: 'Bangalore', cases: 156, alerts: 28, risk: 'LOW' },
        { region: 'Kolkata', cases: 198, alerts: 41, risk: 'MODERATE' }
    ];

    const diseaseBreakdown = [
        { disease: 'Dengue', cases: 892, percentage: 32 },
        { disease: 'Respiratory', cases: 756, percentage: 27 },
        { disease: 'Malaria', cases: 534, percentage: 19 },
        { disease: 'COVID-19', cases: 312, percentage: 11 },
        { disease: 'Heatstroke', cases: 314, percentage: 11 }
    ];

    return (
        <div className="w-full max-w-7xl mx-auto bg-gray-50 p-6 rounded-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Public Health Dashboard</h2>
                    <p className="text-gray-600 mt-1">Real-time monitoring of health trends across regions</p>
                </div>
                <div>
                    <select 
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
                    >
                        <option value="1week">Last 7 Days</option>
                        <option value="1month">Last 30 Days</option>
                        <option value="3months">Last 3 Months</option>
                        <option value="1year">Last Year</option>
                    </select>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-600 text-sm">Total User Queries</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{dashboardData.totalQueries.toLocaleString()}</p>
                        </div>
                        <Activity className="text-blue-500" size={28} />
                    </div>
                    <p className="text-green-600 text-sm mt-2">↑ {dashboardData.queriesTrend}% from last period</p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-600 text-sm">Active Users</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{dashboardData.activeUsers.toLocaleString()}</p>
                        </div>
                        <Users className="text-green-500" size={28} />
                    </div>
                    <p className="text-green-600 text-sm mt-2">↑ {dashboardData.usersTrend}% growth</p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-600 text-sm">Alerts Sent</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{dashboardData.alertsSent.toLocaleString()}</p>
                        </div>
                        <AlertCircle className="text-orange-500" size={28} />
                    </div>
                    <p className="text-green-600 text-sm mt-2">↑ {dashboardData.alertsTrend}% increase</p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-600 text-sm">Overall Risk Level</p>
                            <p className={`text-3xl font-bold mt-2 ${dashboardData.outbreakRisk === 'HIGH' ? 'text-red-600' : 'text-yellow-600'}`}>
                                {dashboardData.outbreakRisk}
                            </p>
                        </div>
                        <TrendingUp className="text-red-500" size={28} />
                    </div>
                    <p className="text-red-600 text-sm mt-2">Multiple outbreaks detected</p>
                </motion.div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Symptom Distribution */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-6 rounded-lg shadow-md"
                >
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Top Symptoms Reported</h3>
                    <div className="space-y-4">
                        {symptomTrends.map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700">{item.symptom}</span>
                                    <span className="text-sm text-gray-600">{item.count} reports</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full ${item.color}`}
                                        style={{ width: `${item.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Disease Breakdown */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-6 rounded-lg shadow-md"
                >
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Disease Distribution</h3>
                    <div className="space-y-3">
                        {diseaseBreakdown.map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">{item.disease}</p>
                                    <p className="text-sm text-gray-600">{item.cases} cases</p>
                                </div>
                                <div className="text-right">
                                    <span className={`text-lg font-bold ${
                                        item.percentage > 25 ? 'text-red-600' : item.percentage > 15 ? 'text-orange-600' : 'text-yellow-600'
                                    }`}>
                                        {item.percentage}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Regional Data Table */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow-md"
            >
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin size={20} /> Cases by Region
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Region</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Cases</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Alerts Sent</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Risk Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            {regionData.map((item, i) => (
                                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 font-medium text-gray-900">{item.region}</td>
                                    <td className="py-3 px-4 text-gray-600">{item.cases}</td>
                                    <td className="py-3 px-4 text-gray-600">{item.alerts}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                            item.risk === 'HIGH' ? 'bg-red-100 text-red-700' :
                                            item.risk === 'MODERATE' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-green-100 text-green-700'
                                        }`}>
                                            {item.risk}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Recommendations */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 p-6 bg-deep-emerald text-white rounded-lg"
            >
                <h3 className="text-lg font-bold mb-4">📋 Public Health Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <p className="font-semibold mb-2">Immediate Actions</p>
                        <ul className="text-sm space-y-1">
                            <li>✓ Activate dengue control measures in high-risk zones</li>
                            <li>✓ Increase surveillance in crowded areas</li>
                            <li>✓ Launch public awareness campaigns</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold mb-2">Short Term (1-2 weeks)</p>
                        <ul className="text-sm space-y-1">
                            <li>✓ Organize vaccination drives</li>
                            <li>✓ Distribute mosquito nets</li>
                            <li>✓ Set up health camps</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold mb-2">Long Term (1-3 months)</p>
                        <ul className="text-sm space-y-1">
                            <li>✓ Infrastructure upgrades</li>
                            <li>✓ Capacity building for health workers</li>
                            <li>✓ Community health education</li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PublicHealthDashboard;
