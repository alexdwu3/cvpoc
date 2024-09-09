import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  // In a real application, you'd fetch this from an API or state management store
  const existingCampaigns = []; // Assume this is empty for now

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Campaign Management System</h1>
      <div className="flex space-x-4">
        <Link to="/create-campaign" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create New Campaign
        </Link>
        <Link to="/campaigns" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          View Existing Campaigns
        </Link>
      </div>
      {existingCampaigns.length === 0 && (
        <p className="mt-4 text-gray-600">There are no existing campaigns.</p>
      )}
    </div>
  );
};

export default LandingPage;