import React from 'react';

const alerts = [
  { id: 1, message: 'High crowd density at Gate A', type: 'danger', time: '10:15 AM' },
  { id: 2, message: 'Unusual movement at Section B', type: 'warning', time: '10:20 AM' },
  { id: 3, message: 'Medical unit deployed to Main Plaza', type: 'info', time: '10:25 AM' },
];

const getAlertColor = (type: string) => {
  switch (type) {
    case 'danger':
      return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200';
    case 'warning':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200';
    case 'info':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200';
  }
};

const Alerts: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Alerts</h2>
    <div className="space-y-4">
      {alerts.map(alert => (
        <div key={alert.id} className={`p-4 rounded ${getAlertColor(alert.type)}`}>
          <div className="flex justify-between">
            <span>{alert.message}</span>
            <span className="text-xs">{alert.time}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Alerts;