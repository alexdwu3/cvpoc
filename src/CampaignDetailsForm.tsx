import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCampaigns } from "./CampaignContext.tsx";

interface CampaignDetails {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  priority: "Low" | "Medium" | "High";
  goal: string;
}

const CampaignDetailsForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addCampaign } = useCampaigns();
  const { selectedApps } = location.state as { selectedApps: string[] };

  const [campaignDetails, setCampaignDetails] = useState<CampaignDetails>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "Medium",
    goal: "",
  });

  const [affectedTeam, setAffectedTeam] = useState(""); // New state for affected team

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCampaignDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCampaign = {
      id: Date.now().toString(), // Generate a unique ID
      ...campaignDetails,
      status: "Planned" as const,
      totalApps: selectedApps.length,
      migratedApps: 0,
      inProgressApps: 0,
      apps: selectedApps.map((app, index) => ({
        id: index + 1,
        name: app,
        owner: "Unknown", // You might want to update this with actual owner data
        status: "Not Started" as const,
      })),
      selectedApps: selectedApps,
      affectedTeam: affectedTeam, // Use the affectedTeam state
      filterTags: [], // Update with actual filter tags data
    };
    addCampaign(newCampaign);
    navigate(`/campaign-dashboard/${newCampaign.id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Step 2: Campaign Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Campaign Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={campaignDetails.name}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={campaignDetails.description}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div className="flex space-x-4">
          <div>
            <label htmlFor="startDate" className="block mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={campaignDetails.startDate}
              onChange={handleInputChange}
              className="border rounded px-2 py-1"
              required
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block mb-1">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={campaignDetails.endDate}
              onChange={handleInputChange}
              className="border rounded px-2 py-1"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="priority" className="block mb-1">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={campaignDetails.priority}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="goal" className="block mb-1">
            Campaign Goal
          </label>
          <textarea
            id="goal"
            name="goal"
            value={campaignDetails.goal}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label htmlFor="affectedTeam" className="block mb-1">
            Affected Team
          </label>
          <input
            type="text"
            id="affectedTeam"
            name="affectedTeam"
            value={affectedTeam}
            onChange={(e) => setAffectedTeam(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Selected Applications</h2>
          <ul className="list-disc list-inside">
            {selectedApps.map((app) => (
              <li key={app}>{app}</li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate("/create-campaign")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to App Selection
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Campaign
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignDetailsForm;