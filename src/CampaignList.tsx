import React, { useState } from 'react';
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
  // Use state to manage the campaigns
  const [campaigns, setCampaigns] = useState<Campaign[]>([
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
  ]);

  // Function to handle campaign deletion
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(campaign => campaign.id !== id));
    }
  };

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
              <div className="mt-4 flex space-x-2">
                <Link 
                  to={`/campaign-details/${campaign.id}`} 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  View Details
                </Link>
                <button 
                  onClick={() => handleDelete(campaign.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignList;