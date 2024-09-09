import React from 'react';
import { useParams, Link } from 'react-router-dom';

interface AppDetails {
  id: number;
  name: string;
  owner: string;
  status: 'Not Started' | 'In Progress' | 'Migrated';
}

interface CampaignDetails {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'Planned';
  affectedTeam: string;
  affectedTechnologies: string[];
  apps: AppDetails[];
}

const CampaignDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // In a real application, you would fetch this data from an API based on the id
  const campaignDetails: CampaignDetails = {
    id: '1',
    name: 'Java Upgrade Campaign',
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    status: 'Active',
    affectedTeam: 'Alice Johnson',
    affectedTechnologies: ['Java'],
    apps: [
      { id: 1, name: 'App 1', owner: 'Charlie Davis', status: 'Migrated' },
      { id: 2, name: 'App 2', owner: 'Charlie Davis', status: 'In Progress' },
      { id: 3, name: 'App 3', owner: 'Charlie Davis', status: 'Not Started' },
      { id: 4, name: 'App 4', owner: 'Diana Miller', status: 'Migrated' },
      { id: 5, name: 'App 5', owner: 'Diana Miller', status: 'In Progress' },
    ]
  };

  const migratedCount = campaignDetails.apps.filter(app => app.status === 'Migrated').length;
  const inProgressCount = campaignDetails.apps.filter(app => app.status === 'In Progress').length;
  const notStartedCount = campaignDetails.apps.filter(app => app.status === 'Not Started').length;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{campaignDetails.name}</h1>
      <div className="mb-4">
        <p>Start Date: {campaignDetails.startDate}</p>
        <p>End Date: {campaignDetails.endDate}</p>
        <p>Status: {campaignDetails.status}</p>
        <p>Affected Team: {campaignDetails.affectedTeam}</p>
        <p>Affected Technologies: {campaignDetails.affectedTechnologies.join(', ')}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Migration Progress</h2>
        <p>Migrated: {migratedCount}</p>
        <p>In Progress: {inProgressCount}</p>
        <p>Not Started: {notStartedCount}</p>
      </div>
      <h2 className="text-xl font-semibold mb-2">Affected Applications</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">App Name</th>
            <th className="border p-2">Owner</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {campaignDetails.apps.map(app => (
            <tr key={app.id}>
              <td className="border p-2">{app.name}</td>
              <td className="border p-2">{app.owner}</td>
              <td className="border p-2">{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/campaigns" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Back to Campaigns
      </Link>
    </div>
  );
};

export default CampaignDetails;