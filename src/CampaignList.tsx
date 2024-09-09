import React from 'react';
import { Link } from 'react-router-dom';

interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'Planned';
  affectedTeam: string;
  affectedTechnologies: string[];
  totalApps: number;
  migratedApps: number;
  inProgressApps: number;
}

const CampaignList: React.FC = () => {
  // In a real application, you would fetch this data from an API
  const campaigns: Campaign[] = [
    {
      id: '1',
      name: 'Java Upgrade Campaign',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      status: 'Active',
      affectedTeam: 'Alice Johnson',
      affectedTechnologies: ['Java'],
      totalApps: 15,
      migratedApps: 5,
      inProgressApps: 7
    },
    {
      id: '2',
      name: 'Python and Java Modernization',
      startDate: '2024-03-15',
      endDate: '2024-09-15',
      status: 'Planned',
      affectedTeam: 'Alice Johnson',
      affectedTechnologies: ['Python', 'Java'],
      totalApps: 20,
      migratedApps: 0,
      inProgressApps: 0
    },
    {
      id: '3',
      name: 'Security Compliance',
      startDate: '2023-07-01',
      endDate: '2023-12-31',
      status: 'Completed',
      affectedTeam: 'Alice Johnson',
      affectedTechnologies: ['Java', 'Python', 'JavaScript'],
      totalApps: 30,
      migratedApps: 30,
      inProgressApps: 0
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Existing Campaigns</h1>
      {campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <div className="grid gap-4">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{campaign.name}</h2>
              <p>Start Date: {campaign.startDate}</p>
              <p>End Date: {campaign.endDate}</p>
              <p>Status: {campaign.status}</p>
              <p>Affected Team: {campaign.affectedTeam}</p>
              <p>Affected Technologies: {campaign.affectedTechnologies.join(', ')}</p>
              <p>Total Apps: {campaign.totalApps}</p>
              <p>Migrated Apps: {campaign.migratedApps}</p>
              <p>In Progress Apps: {campaign.inProgressApps}</p>
              <p>Not Started Apps: {campaign.totalApps - campaign.migratedApps - campaign.inProgressApps}</p>
              <Link to={`/campaign-details/${campaign.id}`} className="text-blue-500 hover:underline">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
      <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Back to Home
      </Link>
    </div>
  );
};

export default CampaignList;