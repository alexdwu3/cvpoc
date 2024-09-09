import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

interface AppStatus {
  name: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  notes: string;
}

const CampaignDashboard: React.FC = () => {
  const location = useLocation();
  const { campaign, selectedApps } = location.state as { campaign: any, selectedApps: string[] };
  
  // Mock data for app statuses - in a real app, this would come from your backend
  const [appStatuses, setAppStatuses] = useState<AppStatus[]>(
    selectedApps.map(app => ({ name: app, status: 'Not Started', notes: '' }))
  );

  const completionPercentage = (appStatuses.filter(app => app.status === 'Completed').length / appStatuses.length) * 100;

  const updateAppStatus = (appName: string, newStatus: AppStatus['status'], notes: string) => {
    setAppStatuses(prev => prev.map(app => 
      app.name === appName ? { ...app, status: newStatus, notes } : app
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{campaign.name} Dashboard</h1>
      <div className="mb-4">
        <p><strong>Description:</strong> {campaign.description}</p>
        <p><strong>Date Range:</strong> {campaign.startDate} to {campaign.endDate}</p>
        <p><strong>Type:</strong> {campaign.type}</p>
        <p><strong>Task:</strong> {campaign.task}</p>
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
          <div key={app.name} className="border p-4 rounded">
            <h3 className="font-semibold">{app.name}</h3>
            <p>Status: {app.status}</p>
            <select
              value={app.status}
              onChange={(e) => updateAppStatus(app.name, e.target.value as AppStatus['status'], app.notes)}
              className="mt-2 border rounded px-2 py-1"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <textarea
              value={app.notes}
              onChange={(e) => updateAppStatus(app.name, app.status, e.target.value)}
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