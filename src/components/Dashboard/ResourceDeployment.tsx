import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';

interface Resource {
  id: number;
  type: string;
  location: string;
  status: 'active' | 'en-route' | 'standby';
  personnel: number;
}

const ResourceDeployment: React.FC = () => {
  const [resources] = useState<Resource[]>([
    {
      id: 1,
      type: 'Security Team',
      location: 'Gate A',
      status: 'active',
      personnel: 4
    },
    {
      id: 2,
      type: 'Medical Unit',
      location: 'Section B',
      status: 'active',
      personnel: 3
    },
    {
      id: 3,
      type: 'Rapid Response',
      location: 'Main Plaza',
      status: 'standby',
      personnel: 6
    },
    {
      id: 4,
      type: 'Security Team',
      location: 'Gate C',
      status: 'en-route',
      personnel: 4
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'en-route':
        return 'bg-yellow-100 text-yellow-800';
      case 'standby':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center">
            <UserIcon className="h-6 w-6 text-blue-500" />
            <span className="ml-2 text-blue-700 font-medium">Total Personnel</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-blue-900">
            {resources.reduce((acc, curr) => acc + curr.personnel, 0)}
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <ShieldCheckIcon className="h-6 w-6 text-green-500" />
            <span className="ml-2 text-green-700 font-medium">Active Units</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-green-900">
            {resources.filter(r => r.status === 'active').length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        <div className="flow-root">
          <ul className="-my-5 divide-y divide-gray-200">
            {resources.map((resource) => (
              <motion.li
                key={resource.id}
                className="py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <ShieldCheckIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {resource.type}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{resource.location}</p>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        resource.status
                      )}`}
                    >
                      {resource.status}
                    </span>
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-500">
                    {resource.personnel} personnel
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all">
          Deploy New Unit
        </button>
      </div>
    </div>
  );
};

export default ResourceDeployment;