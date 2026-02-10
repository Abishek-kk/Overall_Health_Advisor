import React, { useState } from 'react';
import { MapPin, Phone, Navigation, Clock, Star } from 'lucide-react';

const hospitals = [
    {
        id: 1,
        name: "City General Hospital",
        type: "Government Hospital",
        distance: "1.2 km",
        rating: 4.5,
        address: "Block A, Sector 45, Green Valley",
        open: "24 Hours"
    },
    {
        id: 2,
        name: "Dr. Sharma's Clinic",
        type: "Private Clinic",
        distance: "0.8 km",
        rating: 4.8,
        address: "Main Market, Near Central Park",
        open: "10:00 AM - 9:00 PM"
    },
    {
        id: 3,
        name: "LifeCare Pharmacy",
        type: "Pharmacy",
        distance: "0.5 km",
        rating: 4.2,
        address: "Shop 12, High Street Complex",
        open: "24 Hours"
    },
    {
        id: 4,
        name: "Community Health Center",
        type: "Public Health Center",
        distance: "2.5 km",
        rating: 3.9,
        address: "Village Rd, Sector 12",
        open: "8:00 AM - 4:00 PM"
    }
];

const HealthcareFinder = () => {
    const [selectedType, setSelectedType] = useState('All');

    const filteredHospitals = selectedType === 'All'
        ? hospitals
        : hospitals.filter(h => h.type.includes(selectedType));

    return (
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 h-[80vh]">
            {/* Sidebar / List View */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col border border-gray-100 lg:col-span-1">
                <div className="p-4 bg-deep-emerald text-white">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <MapPin className="text-emerald-300" /> Nearby Healthcare
                    </h2>
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {['All', 'Hospital', 'Clinic', 'Pharmacy'].map(type => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${selectedType === type
                                        ? 'bg-white text-deep-emerald'
                                        : 'bg-emerald-700 text-emerald-100 hover:bg-emerald-600'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {filteredHospitals.map(hospital => (
                        <div key={hospital.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-gray-800 group-hover:text-deep-emerald transition-colors">{hospital.name}</h3>
                                <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-full border border-emerald-100">
                                    {hospital.distance}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{hospital.type}</p>
                            <div className="flex items-center gap-1 text-xs text-yellow-500 mb-3">
                                <Star size={12} fill="currentColor" />
                                <span className="font-medium text-gray-700">{hospital.rating}</span>
                                <span className="text-gray-400">• {hospital.open}</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 py-1.5 rounded-lg border border-emerald-200 text-emerald-700 text-sm font-medium hover:bg-emerald-50 flex items-center justify-center gap-1">
                                    <Phone size={14} /> Call
                                </button>
                                <button className="flex-1 py-1.5 rounded-lg bg-deep-emerald text-white text-sm font-medium hover:bg-emerald-800 flex items-center justify-center gap-1">
                                    <Navigation size={14} /> Navigate
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-2xl shadow-xl overflow-hidden lg:col-span-2 relative border border-gray-300">
                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Map_unavailable.svg')] bg-cover bg-center opacity-30 grayscale"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm p-6 text-center">
                    <div className="bg-white p-6 rounded-full shadow-2xl mb-6 animate-bounce">
                        <MapPin className="w-12 h-12 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Interactive Map View</h3>
                    <p className="text-gray-600 max-w-md">
                        This module will integrate with Google Maps API to show real-time location data of hospitals, clinics, and pharmacies in your vicinity.
                    </p>
                    <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <Navigation size={18} /> Enable Location Services
                    </button>
                </div>

                {/* Mock Map UI Elements */}
                <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-lg">
                    <div className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded cursor-pointer">+</div>
                    <div className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded cursor-pointer">-</div>
                </div>
            </div>
        </div>
    );
};

export default HealthcareFinder;
