import React from 'react';
import Navbar from '../components/Navbar';
import PublicHealthDashboard from '../components/PublicHealthDashboard';

const AdminDashboardPage = () => {
    return (
        <div className="min-h-screen bg-ice-blue flex flex-col">
            <Navbar />
            <div className="flex-grow pt-20 pb-4 px-4">
                <PublicHealthDashboard />
            </div>
        </div>
    );
};

export default AdminDashboardPage;
