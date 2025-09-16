import React from 'react';

const areas = [
  { name: 'Gate A', status: 'Normal', density: 60 },
  { name: 'Gate B', status: 'Warning', density: 85 },
  { name: 'Section 1', status: 'Normal', density: 55 },
  { name: 'Section 2', status: 'Critical', density: 95 },
  { name: 'Main Plaza', status: 'Warning', density: 80 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Critical':
      return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200';
    case 'Warning':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200';
    default:
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200';
  }
};

const CrowdMonitoring: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Crowd Monitoring</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow text-gray-900 dark:text-gray-100">
        <thead>
          <tr>
            <th className="p-2 text-left">Area</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Density (%)</th>
          </tr>
        </thead>
        <tbody>
          {areas.map(area => (
            <tr key={area.name}>
              <td className="p-2">{area.name}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded ${getStatusColor(area.status)}`}>
                  {area.status}
                </span>
              </td>
              <td className="p-2">{area.density}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default CrowdMonitoring;