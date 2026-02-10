const API_URL = 'http://localhost:5000/api/vaccinations';

export const getVaccinations = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch vaccinations');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching vaccinations:', error);
        throw error;
    }
};

export const addVaccination = async (vaccinationData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vaccinationData),
        });
        if (!response.ok) {
            throw new Error('Failed to add vaccination');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding vaccination:', error);
        throw error;
    }
};

export const updateVaccinationStatus = async (id, status) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
        if (!response.ok) {
            throw new Error('Failed to update vaccination status');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating vaccination status:', error);
        throw error;
    }
};
