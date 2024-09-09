import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCampaigns } from './CampaignContext.tsx';

interface AppStatus {
  id: number;
  name: string;
  owner: string;
  status: 'Not Started' | 'In Progress' | 'Migrated';
  notes: string;
}

const CampaignDashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { campaigns } = useCampaigns();
  const [appStatuses, setAppStatuses] = useState<AppStatus[]>([]);

  const campaign = campaigns.find(c => c.id === id);

  useEffect(() => {
    if (campaign && campaign.apps) {
      setAppStatuses(campaign.apps.map(app => ({ ...app, notes: '' })));
    }
  }, [campaign]);

  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  const completionPercentage = (appStatuses.filter(app => app.status === 'Migrated').length / appStatuses.length) * 100 || 0;

  const updateAppStatus = (appId: number, newStatus: AppStatus['status'], notes: string) => {
    setAppStatuses(prev => prev.map(app => 
      app.id === appId ? { ...app, status: newStatus, notes } : app
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{campaign.name} Dashboard</h1>
      <div className="mb-4">
        <p><strong>Start Date:</strong> {campaign.startDate}</p>
        <p><strong>End Date:</strong> {campaign.endDate}</p>
        <p><strong>Status:</strong> {campaign.status}</p>
        <p><strong>Affected Team:</strong> {campaign.affectedTeam}</p>
        <p><strong>Filter Tags:</strong> {campaign.filterTags.join(', ')}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Overall Progress</h2>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
        </div>
        <p>{completionPercentage.toFixed(2)}% Complete</p>
      </div>
      <h2 className="text-xl font-semibold mb-2">Application Statuses</h2>
      <div className="space-y-4">
        {appStatuses.map(app => (
          <div key={app.id} className="border p-4 rounded">
            <h3 className="font-semibold">{app.name}</h3>
            <p>Owner: {app.owner}</p>
            <p>Status: {app.status}</p>
            <select
              value={app.status}
              onChange={(e) => updateAppStatus(app.id, e.target.value as AppStatus['status'], app.notes)}
              className="mt-2 border rounded px-2 py-1"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Migrated">Migrated</option>
            </select>
            <textarea
              value={app.notes}
              onChange={(e) => updateAppStatus(app.id, app.status, e.target.value)}
              placeholder="Add notes here..."
              className="mt-2 w-full border rounded px-2 py-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignDashboard;