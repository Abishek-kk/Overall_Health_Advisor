/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { User, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileSelector = () => {
    const { profiles, activeProfile, switchProfile, addProfile } = useProfile();
    const [isOpen, setIsOpen] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newProfile, setNewProfile] = useState({ name: '', role: 'Adult', age: '', gender: 'Male', avatar: '👤' });

    const handleAddProfile = (e) => {
        e.preventDefault();
        if (newProfile.name && newProfile.age) {
            addProfile(newProfile);
            setShowAddForm(false);
            setNewProfile({ name: '', role: 'Adult', age: '', gender: 'Male', avatar: '👤' });
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-all text-white"
            >
                <span className="text-xl">{activeProfile?.avatar || '👤'}</span>
                <span className="text-sm font-medium hidden sm:block">{activeProfile?.name || 'Select Profile'}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full mt-2 right-0 left-0 md:left-auto md:right-0 w-auto min-w-[200px] max-w-[90vw] sm:max-w-sm bg-white rounded-xl shadow-2xl border border-gray-100 overflow-auto z-50 px-0"
                        style={{ transformOrigin: 'top right' }}
                    >
                        <div className="p-4 bg-deep-emerald text-white">
                            <h3 className="font-bold">Family Profiles</h3>
                            <p className="text-xs text-emerald-100">Switch user for personalized care</p>
                        </div>

                        {!showAddForm ? (
                            <div className="p-2 space-y-1">
                                {profiles.map(profile => (
                                    <button
                                        key={profile.id}
                                        onClick={() => { switchProfile(profile.id); setIsOpen(false); }}
                                        className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors ${activeProfile?.id === profile.id ? 'bg-emerald-50 border border-emerald-100' : ''}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{profile.avatar}</span>
                                            <div className="text-left">
                                                <div className="font-semibold text-gray-800">{profile.name}</div>
                                                <div className="text-xs text-gray-500">{profile.role} • {profile.age} yrs</div>
                                            </div>
                                        </div>
                                        {activeProfile?.id === profile.id && <Check size={16} className="text-deep-emerald" />}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setShowAddForm(true)}
                                    className="w-full flex items-center justify-center gap-2 p-3 mt-2 text-deep-emerald font-semibold border-t border-gray-100 hover:bg-gray-50"
                                >
                                    <Plus size={16} /> Add Member
                                </button>
                            </div>
                        ) : (
                            <div className="p-4 space-y-3">
                                <h4 className="font-semibold text-gray-800 text-sm">Add New Member</h4>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                    value={newProfile.name}
                                    onChange={e => setNewProfile({ ...newProfile, name: e.target.value })}
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="Age"
                                        className="w-1/2 px-3 py-2 border rounded-lg text-sm"
                                        value={newProfile.age}
                                        onChange={e => setNewProfile({ ...newProfile, age: e.target.value })}
                                    />
                                    <select
                                        className="w-1/2 px-3 py-2 border rounded-lg text-sm"
                                        value={newProfile.role}
                                        onChange={e => setNewProfile({ ...newProfile, role: e.target.value, avatar: e.target.value === 'Child' ? '👶' : e.target.value === 'Elderly' ? '👵' : '👤' })}
                                    >
                                        <option value="Adult">Adult</option>
                                        <option value="Child">Child</option>
                                        <option value="Elderly">Elderly</option>
                                    </select>
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button onClick={() => setShowAddForm(false)} className="flex-1 py-1.5 text-sm text-gray-500 hover:bg-gray-100 rounded">Cancel</button>
                                    <button onClick={handleAddProfile} className="flex-1 py-1.5 text-sm bg-deep-emerald text-white rounded hover:bg-emerald-800">Save</button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileSelector;
