import React from 'react';
import Navbar from '../components/Navbar';
import DiseaseAwareness from '../components/DiseaseAwareness';

const DiseaseAwarenessPage = () => {
    return (
        <div className="min-h-screen bg-ice-blue flex flex-col">
            <Navbar />
            <div className="flex-grow pt-20 pb-4 px-4 flex items-center justify-center">
                <DiseaseAwareness />
            </div>
        </div>
    );
};

export default DiseaseAwarenessPage;
