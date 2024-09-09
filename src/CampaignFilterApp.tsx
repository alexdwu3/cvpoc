import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

interface FilterOptions {
  [key: string]: string[];
}

interface OrgNode {
  name: string;
  title: string;
  apps?: string[];
  children?: OrgNode[];
}

interface Application {
  id: number;
  name: string;
  technology: string;
  codeScanning: string[];
  infrastructure: string;
  accessibility: string;
  doraMetrics: string;
  owner: string;
  sourceCodePlatform: string;
}

const filterOptions: FilterOptions = {
  technology: ['Java', 'Python', 'JavaScript', 'C#', 'Go', 'Ruby', 'PHP', 'TypeScript', 'Swift'],
  codeScanning: ['SonarQube', 'Veracode', 'Checkmarx'],
  infrastructure: ['On-Premise', 'Cloud', 'Hybrid'],
  accessibility: ['A', 'AA', 'AAA'],
  doraMetrics: ['Low', 'Medium', 'High', 'Elite', 'Not Onboard'],
  sourceCodePlatform: ['GitHub', 'CodeCloud', 'GitLab'],
};

const orgHierarchy: OrgNode = {
  name: 'John Smith',
  title: 'L6',
  children: [
    {
      name: 'Alice Johnson',
      title: 'L5',
      children: [
        {
          name: 'Charlie Davis',
          title: 'L4',
          apps: ['App 1', 'App 2', 'App 3']
        },
        {
          name: 'Diana Miller',
          title: 'L4',
          apps: ['App 4', 'App 5']
        }
      ]
    },
    {
      name: 'Bob Williams',
      title: 'L5',
      apps: ['App 6', 'App 7'],
      children: [
        {
          name: 'Eva Brown',
          title: 'L4',
          apps: ['App 8', 'App 9', 'App 10']
        },
        {
          name: 'Frank Wilson',
          title: 'L4',
          apps: ['App 11', 'App 12', 'App 13']
        }
      ]
    },
    {
      name: 'Sarah Johnson',
      title: 'L5',
      apps: ['App 14', 'App 15']
    }
  ]
};

const applications: Application[] = [
  { id: 1, name: 'App 1', technology: 'Java', codeScanning: ['SonarQube'], infrastructure: 'On-Premise', accessibility: 'AA', doraMetrics: 'High', owner: 'Charlie Davis', sourceCodePlatform: 'GitHub' },
  { id: 2, name: 'App 2', technology: 'Python', codeScanning: ['Veracode'], infrastructure: 'Cloud', accessibility: 'A', doraMetrics: 'Medium', owner: 'Charlie Davis', sourceCodePlatform: 'CodeCloud' },
  { id: 3, name: 'App 3', technology: 'JavaScript', codeScanning: ['SonarQube', 'Veracode'], infrastructure: 'Hybrid', accessibility: 'AAA', doraMetrics: 'Low', owner: 'Charlie Davis', sourceCodePlatform: 'GitHub' },
  { id: 4, name: 'App 4', technology: 'C#', codeScanning: ['Checkmarx'], infrastructure: 'On-Premise', accessibility: 'AA', doraMetrics: 'Elite', owner: 'Diana Miller', sourceCodePlatform: 'GitLab' },
  { id: 5, name: 'App 5', technology: 'Go', codeScanning: ['SonarQube'], infrastructure: 'Cloud', accessibility: 'A', doraMetrics: 'Not Onboard', owner: 'Diana Miller', sourceCodePlatform: 'CodeCloud' },
  { id: 6, name: 'App 6', technology: 'Ruby', codeScanning: ['SonarQube', 'Veracode'], infrastructure: 'Hybrid', accessibility: 'AA', doraMetrics: 'Low', owner: 'Bob Williams', sourceCodePlatform: 'GitHub' },
  { id: 7, name: 'App 7', technology: 'PHP', codeScanning: ['Veracode'], infrastructure: 'Cloud', accessibility: 'AAA', doraMetrics: 'Medium', owner: 'Bob Williams', sourceCodePlatform: 'Bitbucket' },
  { id: 8, name: 'App 8', technology: 'TypeScript', codeScanning: ['SonarQube', 'Checkmarx'], infrastructure: 'On-Premise', accessibility: 'A', doraMetrics: 'High', owner: 'Eva Brown', sourceCodePlatform: 'GitHub' },
  { id: 9, name: 'App 9', technology: 'Swift', codeScanning: ['Veracode'], infrastructure: 'Cloud', accessibility: 'AA', doraMetrics: 'Elite', owner: 'Eva Brown', sourceCodePlatform: 'CodeCloud' },
  { id: 10, name: 'App 10', technology: 'Java', codeScanning: ['SonarQube', 'Veracode'], infrastructure: 'Hybrid', accessibility: 'AAA', doraMetrics: 'Medium', owner: 'Eva Brown', sourceCodePlatform: 'GitLab' },
  { id: 11, name: 'App 11', technology: 'Python', codeScanning: ['Checkmarx'], infrastructure: 'On-Premise', accessibility: 'A', doraMetrics: 'Low', owner: 'Frank Wilson', sourceCodePlatform: 'GitHub' },
  { id: 12, name: 'App 12', technology: 'JavaScript', codeScanning: ['SonarQube'], infrastructure: 'Cloud', accessibility: 'AA', doraMetrics: 'High', owner: 'Frank Wilson', sourceCodePlatform: 'CodeCloud' },
  { id: 13, name: 'App 13', technology: 'C#', codeScanning: ['Veracode', 'Checkmarx'], infrastructure: 'Hybrid', accessibility: 'AAA', doraMetrics: 'Elite', owner: 'Frank Wilson', sourceCodePlatform: 'Bitbucket' },
  { id: 14, name: 'App 14', technology: 'Go', codeScanning: ['SonarQube'], infrastructure: 'On-Premise', accessibility: 'A', doraMetrics: 'Medium', owner: 'Sarah Johnson', sourceCodePlatform: 'GitHub' },
  { id: 15, name: 'App 15', technology: 'Ruby', codeScanning: ['Veracode'], infrastructure: 'Cloud', accessibility: 'AA', doraMetrics: 'Not Onboard', owner: 'Sarah Johnson', sourceCodePlatform: 'CodeCloud' },
  { id: 16, name: 'App 16', technology: 'Java', codeScanning: ['Checkmarx'], infrastructure: 'Cloud', accessibility: 'AAA', doraMetrics: 'High', owner: 'Charlie Davis', sourceCodePlatform: 'Bitbucket' },
  { id: 17, name: 'App 17', technology: 'Python', codeScanning: ['SonarQube'], infrastructure: 'Hybrid', accessibility: 'A', doraMetrics: 'Elite', owner: 'Diana Miller', sourceCodePlatform: 'GitHub' },
  { id: 18, name: 'App 18', technology: 'JavaScript', codeScanning: ['Veracode'], infrastructure: 'On-Premise', accessibility: 'AA', doraMetrics: 'Medium', owner: 'Eva Brown', sourceCodePlatform: 'GitLab' },
  { id: 19, name: 'App 19', technology: 'C#', codeScanning: ['SonarQube', 'Veracode'], infrastructure: 'Cloud', accessibility: 'AAA', doraMetrics: 'Not Onboard', owner: 'Bob Williams', sourceCodePlatform: 'CodeCloud' },
  { id: 20, name: 'App 20', technology: 'Go', codeScanning: ['Checkmarx'], infrastructure: 'Hybrid', accessibility: 'AA', doraMetrics: 'Low', owner: 'Sarah Johnson', sourceCodePlatform: 'GitHub' },
  { id: 21, name: 'App 21', technology: 'Ruby', codeScanning: ['SonarQube', 'Checkmarx'], infrastructure: 'Cloud', accessibility: 'A', doraMetrics: 'High', owner: 'Frank Wilson', sourceCodePlatform: 'GitHub' },
  { id: 22, name: 'App 22', technology: 'PHP', codeScanning: ['SonarQube'], infrastructure: 'On-Premise', accessibility: 'AA', doraMetrics: 'Elite', owner: 'Eva Brown', sourceCodePlatform: 'Bitbucket' },
  { id: 23, name: 'App 23', technology: 'TypeScript', codeScanning: ['Veracode'], infrastructure: 'Hybrid', accessibility: 'AAA', doraMetrics: 'Medium', owner: 'Charlie Davis', sourceCodePlatform: 'GitLab' },
  { id: 24, name: 'App 24', technology: 'Swift', codeScanning: ['SonarQube', 'Veracode'], infrastructure: 'On-Premise', accessibility: 'A', doraMetrics: 'Low', owner: 'Diana Miller', sourceCodePlatform: 'GitHub' },
  { id: 25, name: 'App 25', technology: 'Java', codeScanning: ['Checkmarx'], infrastructure: 'Cloud', accessibility: 'AA', doraMetrics: 'Not Onboard', owner: 'Bob Williams', sourceCodePlatform: 'CodeCloud' },
  { id: 26, name: 'App 26', technology: 'Python', codeScanning: ['SonarQube', 'Veracode'], infrastructure: 'Hybrid', accessibility: 'AAA', doraMetrics: 'High', owner: 'Sarah Johnson', sourceCodePlatform: 'GitHub' },
  { id: 27, name: 'App 27', technology: 'JavaScript', codeScanning: ['Checkmarx'], infrastructure: 'Cloud', accessibility: 'A', doraMetrics: 'Medium', owner: 'Frank Wilson', sourceCodePlatform: 'GitHub' },
  { id: 28, name: 'App 28', technology: 'C#', codeScanning: ['SonarQube'], infrastructure: 'On-Premise', accessibility: 'AA', doraMetrics: 'Elite', owner: 'Eva Brown', sourceCodePlatform: 'Bitbucket' },
  { id: 29, name: 'App 29', technology: 'Go', codeScanning: ['Veracode'], infrastructure: 'Cloud', accessibility: 'AAA', doraMetrics: 'Low', owner: 'Diana Miller', sourceCodePlatform: 'GitLab' },
  { id: 30, name: 'App 30', technology: 'Ruby', codeScanning: ['Checkmarx'], infrastructure: 'Hybrid', accessibility: 'AA', doraMetrics: 'High', owner: 'Charlie Davis', sourceCodePlatform: 'CodeCloud' },
  { id: 31, name: 'App 31', technology: 'PHP', codeScanning: ['SonarQube', 'Veracode'], infrastructure: 'On-Premise', accessibility: 'AAA', doraMetrics: 'Not Onboard', owner: 'Frank Wilson', sourceCodePlatform: 'GitHub' },
  { id: 32, name: 'App 32', technology: 'TypeScript', codeScanning: ['Checkmarx'], infrastructure: 'Cloud', accessibility: 'A', doraMetrics: 'Medium', owner: 'Sarah Johnson', sourceCodePlatform: 'Bitbucket' },
  { id: 33, name: 'App 33', technology: 'Swift', codeScanning: ['SonarQube'], infrastructure: 'Hybrid', accessibility: 'AA', doraMetrics: 'Elite', owner: 'Bob Williams', sourceCodePlatform: 'GitLab' },
  { id: 34, name: 'App 34', technology: 'Java', codeScanning: ['Veracode'], infrastructure: 'Cloud', accessibility: 'AAA', doraMetrics: 'Low', owner: 'Charlie Davis', sourceCodePlatform: 'GitHub' },
  { id: 35, name: 'App 35', technology: 'Python', codeScanning: ['SonarQube', 'Checkmarx'], infrastructure: 'On-Premise', accessibility: 'A', doraMetrics: 'High', owner: 'Diana Miller', sourceCodePlatform: 'CodeCloud' },
];

interface OrgTreeNodeProps {
  node: OrgNode;
  onSelect: (name: string) => void;
  selectedManagers: string[];
}

const OrgTreeNode: React.FC<OrgTreeNodeProps> = ({ node, onSelect, selectedManagers }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="ml-4">
      <div className="flex items-center">
        {hasChildren && (
          <button onClick={toggleExpand} className="mr-2">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        )}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectedManagers.includes(node.name)}
            onChange={() => onSelect(node.name)}
            className="form-checkbox"
          />
          <span>{node.name} ({node.title})</span>
        </label>
      </div>
      {isExpanded && hasChildren && (
        <div className="ml-4">
          {node?.children?.map((child, index) => (
            <OrgTreeNode
              key={index}
              node={child}
              onSelect={onSelect}
              selectedManagers={selectedManagers}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CampaignFilterApp: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [selectedManagers, setSelectedManagers] = useState<string[]>([]);
  const [filteredApps, setFilteredApps] = useState<Application[]>(applications);
  const navigate = useNavigate();

  const handleFilterChange = (category: string, value: string) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[category]?.includes(value)) {
        updatedFilters[category] = updatedFilters[category].filter(item => item !== value);
      } else {
        updatedFilters[category] = [...(updatedFilters[category] || []), value];
      }
      if (updatedFilters[category].length === 0) {
        delete updatedFilters[category];
      }
      return updatedFilters;
    });
  };

  const handleManagerSelect = (managerName: string) => {
    setSelectedManagers(prev => 
      prev.includes(managerName)
        ? prev.filter(name => name !== managerName)
        : [...prev, managerName]
    );
  };

  const getSubordinates = (node: OrgNode): string[] => {
    let subordinates = [node.name];
    if (node.children) {
      node.children.forEach(child => {
        subordinates = [...subordinates, ...getSubordinates(child)];
      });
    }
    return subordinates;
  };

  const handleNextStep = () => {
    const selectedApps = filteredApps.map(app => app.name);
    navigate('/campaign-details', { state: { selectedApps } });
  };

  useEffect(() => {
    const newFilteredApps = applications.filter(app => {
      const matchesFilters = Object.entries(filters).every(([key, values]) => {
        if (key === 'codeScanning') {
          return values.some(value => app[key].includes(value));
        }
        return values.includes(app[key]);
      });

      const relevantManagers = selectedManagers.length === 0 ? 
        getSubordinates(orgHierarchy) : 
        selectedManagers.flatMap(manager => {
          const findNode = (node: OrgNode): OrgNode | null => {
            if (node.name === manager) return node;
            if (node.children) {
              for (let child of node.children) {
                const found = findNode(child);
                if (found) return found;
              }
            }
            return null;
          };
          const managerNode = findNode(orgHierarchy);
          return managerNode ? getSubordinates(managerNode) : [];
        });

      const matchesManager = relevantManagers.includes(app.owner);

      return matchesFilters && matchesManager;
    });

    setFilteredApps(newFilteredApps);
  }, [filters, selectedManagers, getSubordinates]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Campaign</h1>
      <div className="flex flex-row">
        <div className="w-2/3 pr-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Organizational Hierarchy</h2>
            <OrgTreeNode
              node={orgHierarchy}
              onSelect={handleManagerSelect}
              selectedManagers={selectedManagers}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Filters</h2>
            {Object.entries(filterOptions).map(([category, options]) => (
              <div key={category} className="mb-4">
                <label className="mb-1 text-sm font-medium">{category.charAt(0).toUpperCase() + category.slice(1)}</label>
                <div className="flex flex-wrap gap-2">
                  {options.map(option => (
                    <button
                      key={option}
                      onClick={() => handleFilterChange(category, option)}
                      className={`px-2 py-1 text-sm rounded ${
                        filters[category]?.includes(option)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3 pl-4">
          <h2 className="text-xl font-semibold mb-2">Filtered Applications ({filteredApps.length})</h2>
          <div className="overflow-y-auto max-h-screen">
            {filteredApps.map(app => (
              <div key={app.id} className="border rounded p-4 mb-4">
                <h3 className="font-bold">{app.name}</h3>
                <p>Technology: {app.technology}</p>
                <p>Code Scanning: {app.codeScanning.join(', ')}</p>
                <p>Infrastructure: {app.infrastructure}</p>
                <p>Accessibility: {app.accessibility}</p>
                <p>DORA Metrics: {app.doraMetrics}</p>
                <p>Owner: {app.owner}</p>
                <p>Source Code Platform: {app.sourceCodePlatform}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <Link to="/" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Back to Home
        </Link>
        <button 
          onClick={handleNextStep}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Next: Campaign Details
        </button>
      </div>
    </div>
  );
};

export default CampaignFilterApp;