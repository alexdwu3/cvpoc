import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar.tsx";
import LandingPage from "./LandingPage.tsx";
import CampaignFilterApp from "./CampaignFilterApp.tsx";
import CampaignDetailsForm from "./CampaignDetailsForm.tsx";
import CampaignDashboard from "./CampaignDashboard.tsx";
import CampaignList from "./CampaignList.tsx";
import CampaignDetails from "./CampaignDetails.tsx";
import ApplicableCampaignsPage from "./ApplicableCampaignsPage.tsx";
import { CampaignProvider } from "./CampaignContext.tsx";

const App: React.FC = () => {
  return (
    <CampaignProvider>
      <Router>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/create-campaign" element={<CampaignFilterApp />} />
              <Route
                path="/campaign-details"
                element={<CampaignDetailsForm />}
              />
              <Route
                path="/campaign-dashboard/:id"
                element={<CampaignDashboard />}
              />
              <Route path="/campaigns" element={<CampaignList />} />
              <Route
                path="/campaign-details/:id"
                element={<CampaignDetails />}
              />
              <Route
                path="/applicable-campaigns"
                element={<ApplicableCampaignsPage />}
              />{" "}
            </Routes>
          </div>
        </div>
      </Router>
    </CampaignProvider>
  );
};

export default App;
