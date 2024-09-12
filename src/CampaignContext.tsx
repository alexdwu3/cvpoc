import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Campaign {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'Planned';
  priority: 'Low' | 'Medium' | 'High';
  goal: string;
  affectedTeam: string;
  filterTags: string[];
  totalApps: number;
  migratedApps: number;
  inProgressApps: number;
  apps: {
    id: number;
    name: string;
    owner: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
  }[];
  selectedApps: string[];
}

interface CampaignContextType {
  campaigns: Campaign[];
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (campaign: Campaign) => void;
  deleteCampaign: (id: string) => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const addCampaign = (campaign: Campaign) => {
    setCampaigns([...campaigns, campaign]);
  };

  const updateCampaign = (updatedCampaign: Campaign) => {
    setCampaigns(campaigns.map(c => c.id === updatedCampaign.id ? updatedCampaign : c));
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id));
  };

  return (
    <CampaignContext.Provider value={{ campaigns, addCampaign, updateCampaign, deleteCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaigns = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaigns must be used within a CampaignProvider');
  }
  return context;
};