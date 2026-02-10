/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

export const useProfile = () => {
    return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }) => {
    const defaultProfiles = [
        { id: 1, name: 'Father', role: 'Adult', age: 35, gender: 'Male', avatar: '👨' },
        { id: 2, name: 'Mother', role: 'Adult', age: 32, gender: 'Female', avatar: '👩' },
        { id: 3, name: 'Grandmother', role: 'Elderly', age: 65, gender: 'Female', avatar: '👵' },
        { id: 4, name: 'Ravi', role: 'Child', age: 5, gender: 'Male', avatar: '👶' }
    ];

    // Load from local storage or default
    const [profiles, setProfiles] = useState(() => {
        const saved = localStorage.getItem('familyProfiles');
        return saved ? JSON.parse(saved) : defaultProfiles;
    });

    const [activeProfile, setActiveProfile] = useState(() => {
        const saved = localStorage.getItem('familyProfiles');
        const parsed = saved ? JSON.parse(saved) : defaultProfiles;
        return parsed && parsed.length > 0 ? parsed[0] : defaultProfiles[0];
    });

    useEffect(() => {
        localStorage.setItem('familyProfiles', JSON.stringify(profiles));
    }, [profiles]);

    const addProfile = (profile) => {
        const newProfile = { ...profile, id: Date.now() };
        setProfiles([...profiles, newProfile]);
        setActiveProfile(newProfile); // Auto-switch to new profile
    };

    const switchProfile = (profileId) => {
        const profile = profiles.find(p => p.id === profileId || p.id === parseInt(profileId));
        if (profile) setActiveProfile(profile);
    };

    const value = {
        profiles,
        activeProfile,
        addProfile,
        switchProfile
    };

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
};
