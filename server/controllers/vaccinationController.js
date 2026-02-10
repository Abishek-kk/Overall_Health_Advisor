const Vaccination = require('../models/Vaccination');

// Get all vaccinations
exports.getVaccinations = async (req, res) => {
    try {
        const vaccinations = await Vaccination.find();
        res.status(200).json(vaccinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new vaccination record
exports.addVaccination = async (req, res) => {
    const { childName, vaccineName, dueDate, status, dateAdministered } = req.body;

    try {
        const newVaccination = new Vaccination({
            childName,
            vaccineName,
            dueDate,
            status,
            dateAdministered
        });

        const savedVaccination = await newVaccination.save();
        res.status(201).json(savedVaccination);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update vaccination status
exports.updateVaccinationStatus = async (req, res) => {
    const { id } = req.params;
    const { status, dateAdministered } = req.body;

    try {
        const updatedVaccination = await Vaccination.findByIdAndUpdate(
            id,
            { status, dateAdministered },
            { new: true }
        );

        if (!updatedVaccination) {
            return res.status(404).json({ message: 'Vaccination record not found' });
        }

        res.status(200).json(updatedVaccination);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
