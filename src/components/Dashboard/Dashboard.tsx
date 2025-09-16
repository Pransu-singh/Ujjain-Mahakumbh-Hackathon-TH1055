import React from 'react';
import { Card, Title, Text } from '@tremor/react';
import { motion } from 'framer-motion';
import CrowdHeatmap from './CrowdHeatmap';
import LiveMetrics from './LiveMetrics';
import AlertsList from './AlertsList';
import ResourceDeployment from './ResourceDeployment';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded shadow p-4">
            <Card>
              <Title className="dark:text-gray-100">Total Visitors</Title>
              <Text className="text-2xl font-bold dark:text-gray-100">24,567</Text>
              <Text className="text-green-500">+12.3% from last hour</Text>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded shadow p-4">
            <Card>
              <Title className="dark:text-gray-100">Current Density</Title>
              <Text className="text-2xl font-bold dark:text-gray-100">Medium</Text>
              <Text className="text-yellow-500">75% capacity</Text>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded shadow p-4">
            <Card>
              <Title className="dark:text-gray-100">Active Alerts</Title>
              <Text className="text-2xl font-bold dark:text-gray-100">3</Text>
              <Text className="text-red-500">2 high priority</Text>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded shadow p-4">
            <Card>
              <Title className="dark:text-gray-100">Resources Deployed</Title>
              <Text className="text-2xl font-bold dark:text-gray-100">45</Text>
              <Text className="text-blue-500">12 units available</Text>
            </Card>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded shadow p-4">
            <Card>
              <Title className="dark:text-gray-100">Real-time Crowd Heatmap</Title>
              <CrowdHeatmap />
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded shadow p-4">
            <Card>
              <Title className="dark:text-gray-100">Live Metrics</Title>
              <LiveMetrics />
            </Card>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded shadow p-4">
            <Card>
              <Title className="dark:text-gray-100">Active Alerts</Title>
              <AlertsList />
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded shadow p-4">
            <Card>
              <Title className="dark:text-gray-100">Resource Deployment</Title>
              <ResourceDeployment />
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;