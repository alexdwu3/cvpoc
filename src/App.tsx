import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage.tsx';
import CampaignFilterApp from './CampaignFilterApp.tsx';
import CampaignDetailsForm from './CampaignDetailsForm.tsx';
import CampaignDashboard from './CampaignDashboard.tsx';
import CampaignList from './CampaignList.tsx';
import CampaignDetails from './CampaignDetails.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-campaign" element={<CampaignFilterApp />} />
        <Route path="/campaign-details" element={<CampaignDetailsForm />} />
        <Route path="/campaign-dashboard" element={<CampaignDashboard />} />
        <Route path="/campaigns" element={<CampaignList />} />
        <Route path="/campaign-details/:id" element={<CampaignDetails />} />
      </Routes>
    </Router>
  );
};

export default App;