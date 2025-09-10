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
      return 'bg-red-100 text-red-700';
    case 'Warning':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return 'bg-green-100 text-green-700';
  }
};

const CrowdMonitoring: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Crowd Monitoring</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
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