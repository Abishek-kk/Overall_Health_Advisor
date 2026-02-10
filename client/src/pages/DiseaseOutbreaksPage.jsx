import React from 'react';
import Navbar from '../components/Navbar';
import DiseaseOutbreaks from '../components/DiseaseOutbreaks';

const DiseaseOutbreaksPage = () => {
    return (
        <div className="min-h-screen bg-ice-blue flex flex-col">
            <Navbar />
            <div className="flex-grow pt-20 pb-4 px-4">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl font-bold text-deep-emerald mb-2">Disease Outbreak Alerts</h1>
                    <p className="text-gray-600 mb-8">Real-time updates on disease outbreaks in your region with government health advisories</p>
                    <DiseaseOutbreaks />
                </div>
            </div>
        </div>
    );
};

export default DiseaseOutbreaksPage;
