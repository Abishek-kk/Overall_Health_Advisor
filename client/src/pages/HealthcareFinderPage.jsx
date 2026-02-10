import React from 'react';
import Navbar from '../components/Navbar';
import HealthcareFinder from '../components/HealthcareFinder';

const HealthcareFinderPage = () => {
    return (
        <div className="min-h-screen bg-ice-blue flex flex-col">
            <Navbar />
            <div className="flex-grow pt-20 pb-4 px-4 flex items-center justify-center">
                <HealthcareFinder />
            </div>
        </div>
    );
};

export default HealthcareFinderPage;
