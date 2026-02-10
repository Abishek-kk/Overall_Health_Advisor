/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Cloud, Droplets, Wind, ThermometerSun, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const ClimateAlerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [location, setLocation] = useState('Mumbai');
    const [weatherData, setWeatherData] = useState(null);

    function generateClimateAlerts() {
        const weatherConditions = {
            'Mumbai': { rainfall: 'heavy', temp: 32, humidity: 85, aqi: 'moderate' },
            'Delhi': { rainfall: 'low', temp: 38, humidity: 25, aqi: 'poor' },
            'Chennai': { rainfall: 'moderate', temp: 35, humidity: 70, aqi: 'good' },
            'Bangalore': { rainfall: 'light', temp: 28, humidity: 60, aqi: 'good' }
        };

        const weather = weatherConditions[location];
        setWeatherData(weather);
        const newAlerts = [];

        if (weather.rainfall === 'heavy') {
            newAlerts.push({
                id: 1,
                type: 'dengue',
                title: '⚠️ DENGUE & MALARIA RISK',
                severity: 'high',
                description: 'Heavy rainfall detected. Ideal breeding ground for mosquitoes.',
                recommendations: [
                    '🦟 Remove stagnant water from home',
                    '🛡️ Use mosquito nets and repellent',
                    '🏥 Get tested if fever develops',
                    '💧 Stay hydrated and monitor health'
                ]
            });
        }

        if (weather.temp > 35) {
            newAlerts.push({
                id: 2,
                type: 'heatwave',
                title: '🌡️ HEATWAVE WARNING',
                severity: 'high',
                description: 'Temperature exceeds 35°C. Risk of heat-related illnesses.',
                recommendations: [
                    '💧 Drink 3-4 liters of water daily',
                    '🕐 Avoid direct sun 12-4 PM',
                    '⚡ Watch for dizziness, exhaustion',
                    '👶 Extra care for children & elderly'
                ]
            });
        }

        if (weather.aqi === 'poor') {
            newAlerts.push({
                id: 3,
                type: 'pollution',
                title: '🌫️ AIR QUALITY ALERT',
                severity: 'high',
                description: 'Poor air quality detected. Higher respiratory risk.',
                recommendations: [
                    '😷 Wear N95 mask outdoors',
                    '🏠 Use air purifier indoors',
                    '🚫 Limit outdoor activities',
                    '🫁 Monitor breathing difficulties'
                ]
            });
        }

        if (weather.humidity > 70 && weather.rainfall === 'heavy') {
            newAlerts.push({
                id: 4,
                type: 'fungal',
                title: '🍄 FUNGAL INFECTION RISK',
                severity: 'medium',
                description: 'High humidity with rainfall increases fungal growth.',
                recommendations: [
                    '🧼 Keep skin dry and clean',
                    '🏐 Avoid damp clothing',
                    '👃 Watch for skin issues',
                    '☀️ Get adequate sun exposure'
                ]
            });
        }

        setAlerts(newAlerts);
    }

    useEffect(() => {
        generateClimateAlerts();
    }, [location]);

    const categoryColors = {
        dengue: 'border-l-4 border-orange-500 bg-orange-50',
        heatwave: 'border-l-4 border-red-500 bg-red-50',
        pollution: 'border-l-4 border-yellow-500 bg-yellow-50',
        fungal: 'border-l-4 border-green-500 bg-green-50'
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <MapPin size={24} className="text-deep-emerald" />
                    <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-emerald"
                    >
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Bangalore">Bangalore</option>
                    </select>
                </div>

                {weatherData && (
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
                            <ThermometerSun className="mx-auto mb-2 text-blue-600" />
                            <p className="text-sm text-gray-600">Temperature</p>
                            <p className="text-lg font-bold text-blue-800">{weatherData.temp}°C</p>
                        </div>
                        <div className="bg-cyan-50 p-4 rounded-lg text-center border border-cyan-200">
                            <Droplets className="mx-auto mb-2 text-cyan-600" />
                            <p className="text-sm text-gray-600">Humidity</p>
                            <p className="text-lg font-bold text-cyan-800">{weatherData.humidity}%</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg text-center border border-purple-200">
                            <Cloud className="mx-auto mb-2 text-purple-600" />
                            <p className="text-sm text-gray-600">Rainfall</p>
                            <p className="text-lg font-bold text-purple-800 capitalize">{weatherData.rainfall}</p>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg text-center border border-yellow-200">
                            <Wind className="mx-auto mb-2 text-yellow-600" />
                            <p className="text-sm text-gray-600">Air Quality</p>
                            <p className="text-lg font-bold text-yellow-800 capitalize">{weatherData.aqi}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-4">
                {alerts.length === 0 ? (
                    <div className="text-center p-8 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-lg text-green-700 font-semibold">✅ All Clear!</p>
                        <p className="text-green-600">No major health alerts in your area.</p>
                    </div>
                ) : (
                    alerts.map((alert, index) => (
                        <motion.div
                            key={alert.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-6 rounded-lg ${categoryColors[alert.type]}`}
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-grow">
                                    <h3 className="text-lg font-bold mb-2">{alert.title}</h3>
                                    <p className="text-gray-700 mb-4">{alert.description}</p>
                                    <div className="bg-white/50 p-4 rounded-lg">
                                        <p className="font-semibold text-sm mb-2">📋 What to do:</p>
                                        <ul className="space-y-1">
                                            {alert.recommendations.map((rec, i) => (
                                                <li key={i} className="text-sm text-gray-700">{rec}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Prevention Tips */}
            <div className="mt-8 bg-deep-emerald text-white p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4">🛡️ General Prevention Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="font-semibold mb-2">Daily Habits</p>
                        <ul className="text-sm space-y-1">
                            <li>✓ Wash hands regularly with soap</li>
                            <li>✓ Maintain proper hygiene</li>
                            <li>✓ Stay vaccinated</li>
                            <li>✓ Eat nutritious food</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold mb-2">Environmental Care</p>
                        <ul className="text-sm space-y-1">
                            <li>✓ Remove stagnant water</li>
                            <li>✓ Keep surroundings clean</li>
                            <li>✓ Maintain indoor air quality</li>
                            <li>✓ Use mosquito protection</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClimateAlerts;
