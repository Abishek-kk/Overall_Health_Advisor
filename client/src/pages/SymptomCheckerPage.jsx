import React from 'react';
import Navbar from '../components/Navbar';
import SymptomChecker from '../components/SymptomChecker';

const SymptomCheckerPage = () => {
    return (
        <div className="min-h-screen bg-ice-blue flex flex-col">
            <Navbar />
            <div className="flex-grow pt-20 pb-4 px-4 flex items-center justify-center">
                <SymptomChecker />
            </div>
        </div>
    );
};

export default SymptomCheckerPage;
