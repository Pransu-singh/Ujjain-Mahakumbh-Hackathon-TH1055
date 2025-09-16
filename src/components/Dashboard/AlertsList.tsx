import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

interface Alert {
  id: number;
  message: string;
  type: 'warning' | 'danger' | 'info';
  location: string;
  timestamp: Date;
}

const AlertsList: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Simulated alerts data
    const initialAlerts: Alert[] = [
      {
        id: 1,
        message: 'High crowd density detected',
        type: 'danger',
        location: 'Gate A',
        timestamp: new Date()
      },
      {
        id: 2,
        message: 'Unusual movement pattern',
        type: 'warning',
        location: 'Section B',
        timestamp: new Date()
      },
      {
        id: 3,
        message: 'Resource deployment recommended',
        type: 'info',
        location: 'Main Plaza',
        timestamp: new Date()
      }
    ];

    setAlerts(initialAlerts);

    // Simulate new alerts
    const interval = setInterval(() => {
      const newAlert: Alert = {
        id: Math.random(),
        message: 'New crowd activity detected',
        type: Math.random() > 0.5 ? 'warning' : 'info',
        location: `Section ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`,
        timestamp: new Date()
      };

      setAlerts(prev => [newAlert, ...prev].slice(0, 5));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'danger':
        return 'bg-red-50 border-red-400 text-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-400 text-yellow-700 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-400 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200';
      default:
        return 'bg-gray-50 border-gray-400 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200';
    }
  };

  const getIcon = (type: string) => {
    return type === 'info' ? (
      <InformationCircleIcon className="h-5 w-5" />
    ) : (
      <ExclamationCircleIcon className="h-5 w-5" />
    );
  };

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`flex items-start p-4 border-l-4 rounded-r-md ${getAlertStyle(alert.type)}`}
          >
            <div className="flex-shrink-0">{getIcon(alert.type)}</div>
            <div className="ml-3 w-full">
              <div className="flex justify-between">
                <p className="text-sm font-medium">{alert.message}</p>
                <span className="text-xs text-gray-500 dark:text-gray-300">
                  {alert.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p className="mt-1 text-sm">{alert.location}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AlertsList;