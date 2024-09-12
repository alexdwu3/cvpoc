import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCampaigns } from './CampaignContext.tsx';

interface AppStatus {
  id: number;
  name: string;
  owner: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  notes: string;
  // itapNumber: string;
}

interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'Planned' | 'Active' | 'Completed';
  affectedTeam: string;
  filterTags: string[];
  apps: AppStatus[];
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  goal: string;
  totalApps: number;
  migratedApps: number;
  inProgressApps: number;
  selectedApps: string[];
}

const CampaignDashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { campaigns, updateCampaign, deleteCampaign } = useCampaigns();
  const [appStatuses, setAppStatuses] = useState<AppStatus[]>([]);
  const [newApp, setNewApp] = useState({ name: '', owner: '' });
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const campaign = campaigns.find(c => c.id === id) as Campaign | undefined;

  useEffect(() => {
    if (campaign && campaign.apps) {
      setAppStatuses(campaign.apps.map(app => ({ ...app, notes: '' })));
    }
  }, [campaign]);

  if (!campaign) {
    return <div className="text-center mt-8">Campaign not found</div>;
  }

  const completionPercentage = (appStatuses.filter(app => app.status === 'Completed').length / appStatuses.length) * 100 || 0;

  const updateCampaignStatus = (newStatus: Campaign['status']) => {
    const updatedCampaign: Campaign = { 
      ...campaign, 
      status: newStatus,
      migratedApps: campaign.migratedApps,
      inProgressApps: campaign.inProgressApps,
      selectedApps: campaign.selectedApps
    };
    updateCampaign(updatedCampaign);
  };

  const updateAppStatus = (appId: number, newStatus: AppStatus['status'], notes: string) => {
    setAppStatuses(prev => prev.map(app => 
      app.id === appId ? { ...app, status: newStatus, notes } : app
    ));
  };

  const addNewApp = () => {
    if (newApp.name && newApp.owner) {
      const newAppStatus: AppStatus = {
        id: Date.now(),
        name: newApp.name,
        owner: newApp.owner,
        status: 'Not Started',
        notes: ''
      };
      setAppStatuses(prev => [...prev, newAppStatus]);
      setNewApp({ name: '', owner: '' });
      setShowAddDialog(false);
    }
  };

  const removeApp = (appId: number) => {
    setAppStatuses(prev => prev.filter(app => app.id !== appId));
  };

  const cancelCampaign = () => {
    deleteCampaign(campaign.id);
    navigate('/campaigns');
  };

  const StatusToggleButton: React.FC<{ status: Campaign['status']; currentStatus: Campaign['status']; onClick: () => void }> = ({ status, currentStatus, onClick }) => (
    <button
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        currentStatus === status 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
      onClick={onClick}
    >
      {status}
    </button>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{campaign.name} Dashboard</h1>
        <button 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          onClick={() => setShowCancelDialog(true)}
        >
          Cancel Campaign
        </button>
      </div>
      <div className="mb-4">
        <p><strong>Start Date:</strong> {campaign.startDate}</p>
        <p><strong>End Date:</strong> {campaign.endDate}</p>
        <p><strong>Affected Team:</strong> {campaign.affectedTeam}</p>
        <p><strong>Filter Tags:</strong> {campaign.filterTags.join(', ')}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Campaign Status</h2>
        <div className="flex space-x-2">
          <StatusToggleButton 
            status="Planned" 
            currentStatus={campaign.status} 
            onClick={() => updateCampaignStatus('Planned')} 
          />
          <StatusToggleButton 
            status="Active" 
            currentStatus={campaign.status} 
            onClick={() => updateCampaignStatus('Active')} 
          />
          <StatusToggleButton 
            status="Completed" 
            currentStatus={campaign.status} 
            onClick={() => updateCampaignStatus('Completed')} 
          />
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Overall Progress</h2>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${completionPercentage}%` }}></div>
        </div>
        <p>{completionPercentage.toFixed(2)}% Complete</p>
      </div>
      <h2 className="text-xl font-semibold mb-2">Application Statuses</h2>
      <button 
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition-colors"
        onClick={() => setShowAddDialog(true)}
      >
        Add New Application
      </button>
      <div className="space-y-4">
        {appStatuses.map(app => (
          <div key={app.id} className="border p-4 rounded shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{app.name}</h3>
              <button 
                className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                onClick={() => removeApp(app.id)}
              >
                Remove
              </button>
            </div>
            <p>Owner: {app.owner}</p>
            <p>Status: {app.status}</p>
            <div className="flex space-x-2 mt-2">
              {['Not Started', 'In Progress', 'Completed'].map((status) => (
                <button
                  key={status}
                  className={`px-2 py-1 rounded transition-colors ${
                    app.status === status 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  onClick={() => updateAppStatus(app.id, status as AppStatus['status'], app.notes)}
                >
                  {status}
                </button>
              ))}
            </div>
            <textarea
              value={app.notes}
              onChange={(e) => updateAppStatus(app.id, app.status, e.target.value)}
              placeholder="Add notes here..."
              className="mt-2 w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      {showAddDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add New Application</h2>
            <input
              type="text"
              placeholder="Application Name"
              value={newApp.name}
              onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
              className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Owner"
              value={newApp.owner}
              onChange={(e) => setNewApp({ ...newApp, owner: e.target.value })}
              className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end space-x-2">
              <button 
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                onClick={() => setShowAddDialog(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                onClick={addNewApp}
              >
                Add Application
              </button>
            </div>
          </div>
        </div>
      )}

      {showCancelDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Cancel Campaign</h2>
            <p>Are you sure you want to cancel this campaign? This action cannot be undone.</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button 
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                onClick={() => setShowCancelDialog(false)}
              >
                No, keep campaign
              </button>
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                onClick={cancelCampaign}
              >
                Yes, cancel campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignDashboard;