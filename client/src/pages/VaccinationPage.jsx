import React from 'react';
import Navbar from '../components/Navbar';
import VaccinationTracker from '../components/VaccinationTracker';
import { useProfile } from '../context/ProfileContext';

const VaccinationPage = () => {
    const { activeProfile } = useProfile();

    return (
        <div className="min-h-screen bg-ice-blue flex flex-col">
            <Navbar />
            <div className="flex-grow pt-24 pb-4 px-4 flex flex-col items-center">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-deep-emerald">Family Health Record</h2>
                    <p className="text-gray-600">Track vaccinations and health reminders for your family.</p>
                </div>

                {activeProfile?.role === 'Child' ? (
                    <div className="w-full max-w-3xl">
                        <VaccinationTracker />
                    </div>
                ) : (
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-emerald-100 text-center max-w-lg">
                        <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Select a Child Profile</h3>
                        <p className="text-gray-600 mb-6">Please switch to a child's profile (e.g., Ravi) using the profile selector in the navbar to view their vaccination schedule.</p>
                        <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                            <strong>Tip:</strong> You can add new family members by clicking "Add Member" in the profile menu.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VaccinationPage;
