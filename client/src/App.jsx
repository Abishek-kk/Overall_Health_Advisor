import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import SymptomCheckerPage from './pages/SymptomCheckerPage';
import DiseaseAwarenessPage from './pages/DiseaseAwarenessPage';
import HealthcareFinderPage from './pages/HealthcareFinderPage';
import VaccinationPage from './pages/VaccinationPage';
import ClimateAlertsPage from './pages/ClimateAlertsPage';
import DiseaseOutbreaksPage from './pages/DiseaseOutbreaksPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { ProfileProvider } from './context/ProfileContext';

function App() {
  return (
    <ProfileProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/symptom-checker" element={<SymptomCheckerPage />} />
          <Route path="/disease-awareness" element={<DiseaseAwarenessPage />} />
          <Route path="/healthcare-finder" element={<HealthcareFinderPage />} />
          <Route path="/vaccination" element={<VaccinationPage />} />
          <Route path="/climate-alerts" element={<ClimateAlertsPage />} />
          <Route path="/disease-outbreaks" element={<DiseaseOutbreaksPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        </Routes>
      </Router>
    </ProfileProvider>
  );
}

export default App;
