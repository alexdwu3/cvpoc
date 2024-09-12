import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to Campaign Management System</h1>
      <div className="flex space-x-4">
        <Link to="/create-campaign" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create New Campaign
        </Link>
        <Link to="/campaigns" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          View My Campaigns
        </Link>
        <Link to="/applicable-campaigns" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
          View Applicable Campaigns
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;