import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { Syringe, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';

const VaccinationTracker = () => {
    const { activeProfile } = useProfile();
    const [vaccinations, setVaccinations] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchVaccinations = async () => {
            try {
                const data = await import('../services/vaccinationService').then(module => module.getVaccinations());
                setVaccinations(data);
            } catch (error) {
                console.error("Failed to load vaccinations", error);
            } finally {
                setLoading(false);
            }
        };

        if (activeProfile && activeProfile.role === 'Child') {
            fetchVaccinations();
        } else {
            // Not a child profile - clear any data and stop loading
            setVaccinations([]);
            setLoading(false);
        }
    }, [activeProfile]);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const service = await import('../services/vaccinationService');
            const updatedVax = await service.updateVaccinationStatus(id, newStatus);
            setVaccinations(prev => prev.map(v => v._id === id ? updatedVax : v));
        } catch (e) {
            console.error("Failed to update status", e);
        }
    };

    if (!activeProfile || activeProfile.role !== 'Child') {
        return null; // Only show for children
    }

    if (loading) return <div>Loading records...</div>;

    return (
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">
            <div className="bg-orange-50 p-4 border-b border-orange-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Syringe className="text-orange-500" />
                    <h3 className="font-bold text-gray-800">Vaccination Tracker for {activeProfile.name}</h3>
                </div>
                <span className="text-xs bg-white px-2 py-1 rounded-full border border-orange-200 text-orange-700 font-medium">Child Care</span>
            </div>

            <div className="p-4">
                <div className="space-y-3">
                    {vaccinations.length === 0 ? (
                        <p className="text-center text-gray-500 py-4">No vaccination records found.</p>
                    ) : (
                        vaccinations.map((vax) => (
                            <div key={vax._id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 transition-all hover:shadow-sm">
                                <div>
                                    <div className="font-semibold text-gray-800">{vax.vaccineName}</div>
                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                        <Calendar size={12} /> Due: {vax.dueDate}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {vax.status === 'Completed' && (
                                        <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium border border-green-100">
                                            <CheckCircle size={12} /> Done
                                        </span>
                                    )}
                                    {vax.status === 'Overdue' && (
                                        <button onClick={() => handleStatusUpdate(vax._id, 'Completed')} className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-medium border border-red-100 hover:bg-red-100">
                                            <AlertTriangle size={12} /> Overdue (Mark Done)
                                        </button>
                                    )}
                                    {(vax.status === 'Upcoming' || vax.status === 'Pending') && (
                                        <button onClick={() => handleStatusUpdate(vax._id, 'Completed')} className="text-blue-600 bg-blue-50 px-2 py-1 rounded-full text-xs font-medium border border-blue-100 hover:bg-blue-100">
                                            Upcoming (Mark Done)
                                        </button>
                                    )}
                                </div>
                            </div>
                        )))}
                </div>
                <button className="w-full mt-4 py-2 text-center text-sm text-deep-emerald font-medium hover:underline">
                    View Full Immunization Schedule
                </button>
            </div>
        </div>
    );
};

export default VaccinationTracker;
