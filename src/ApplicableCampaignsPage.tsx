import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ApplicableCampaignsPage = () => {
  const [expandedCampaign, setExpandedCampaign] = useState(null);
  const [appStates, setAppStates] = useState({});

  const campaigns = [
    {
      id: 1,
      name: 'Java Upgrade Campaign',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      status: 'Active',
      apps: [
        { id: 1, name: 'App 1', status: 'In Progress' },
        { id: 2, name: 'App 2', status: 'Not Started' },
      ]
    },
    {
      id: 2,
      name: 'Python and Java Modernization',
      startDate: '2024-03-15',
      endDate: '2024-09-15',
      status: 'Planned',
      apps: [
        { id: 3, name: 'App 3', status: 'Not Started' },
      ]
    },
  ];

  const toggleCampaign = (campaignId) => {
    setExpandedCampaign(expandedCampaign === campaignId ? null : campaignId);
  };

  const handleStatusChange = (campaignId, appId, newStatus) => {
    setAppStates(prev => ({
      ...prev,
      [campaignId]: {
        ...prev[campaignId],
        [appId]: {
          ...prev[campaignId]?.[appId],
          status: newStatus
        }
      }
    }));
  };

  const handleNotesChange = (campaignId, appId, notes) => {
    setAppStates(prev => ({
      ...prev,
      [campaignId]: {
        ...prev[campaignId],
        [appId]: {
          ...prev[campaignId]?.[appId],
          notes: notes
        }
      }
    }));
  };

  const handleUpdate = (campaignId, appId) => {
    // Here you would typically send the updated state to your backend
    console.log('Updating:', campaignId, appId, appStates[campaignId]?.[appId]);
    // After successful update, you might want to refresh your data or update local state
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Applicable Campaigns</h1>
      {campaigns.map((campaign) => (
        <div key={campaign.id} className="mb-6 border rounded-lg shadow-sm">
          <div 
            className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
            onClick={() => toggleCampaign(campaign.id)}
          >
            <div>
              <h2 className="text-xl font-semibold">{campaign.name}</h2>
              <p className="text-sm text-gray-600">
                {campaign.startDate} - {campaign.endDate}
              </p>
            </div>
            <div className="flex items-center">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold mr-2 ${
                campaign.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
              }`}>
                {campaign.status}
              </span>
              {expandedCampaign === campaign.id ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>
          {expandedCampaign === campaign.id && (
            <div className="p-4 bg-white">
              <h3 className="text-lg font-semibold mb-4">Your Involved Apps</h3>
              <div className="space-y-6">
                {campaign.apps.map((app) => (
                  <div key={app.id} className="p-4 bg-gray-100 rounded-lg">
                    <h4 className="text-lg font-medium mb-3">{app.name}</h4>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Status:</p>
                      <div className="flex space-x-4">
                        {['Not Started', 'In Progress', 'Completed'].map((status) => (
                          <button
                            key={status}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              (appStates[campaign.id]?.[app.id]?.status || app.status) === status
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-800'
                            }`}
                            onClick={() => handleStatusChange(campaign.id, app.id, status)}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor={`notes-${app.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                        Notes:
                      </label>
                      <textarea
                        id={`notes-${app.id}`}
                        rows={3}
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                        placeholder="Add any relevant notes here..."
                        value={appStates[campaign.id]?.[app.id]?.notes || ''}
                        onChange={(e) => handleNotesChange(campaign.id, app.id, e.target.value)}
                      ></textarea>
                    </div>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                      onClick={() => handleUpdate(campaign.id, app.id)}
                    >
                      Update
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ApplicableCampaignsPage;