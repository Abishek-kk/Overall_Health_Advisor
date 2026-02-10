import React from 'react';
import Navbar from '../components/Navbar';
import ClimateAlerts from '../components/ClimateAlerts';

const ClimateAlertsPage = () => {
    return (
        <div className="min-h-screen bg-ice-blue flex flex-col">
            <Navbar />
            <div className="flex-grow pt-20 pb-4 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-deep-emerald mb-2">Climate & Health Alerts</h1>
                    <p className="text-gray-600 mb-8">Real-time disease risk alerts based on weather conditions in your area</p>
                    <ClimateAlerts />
                </div>
            </div>
        </div>
    );
};

export default ClimateAlertsPage;
