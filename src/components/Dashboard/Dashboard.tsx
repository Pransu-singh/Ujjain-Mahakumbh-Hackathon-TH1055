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
          <Card>
            <Title>Total Visitors</Title>
            <Text className="text-2xl font-bold">24,567</Text>
            <Text className="text-green-500">+12.3% from last hour</Text>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <Title>Current Density</Title>
            <Text className="text-2xl font-bold">Medium</Text>
            <Text className="text-yellow-500">75% capacity</Text>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <Title>Active Alerts</Title>
            <Text className="text-2xl font-bold">3</Text>
            <Text className="text-red-500">2 high priority</Text>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <Title>Resources Deployed</Title>
            <Text className="text-2xl font-bold">45</Text>
            <Text className="text-blue-500">12 units available</Text>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <Title>Real-time Crowd Heatmap</Title>
            <CrowdHeatmap />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <Title>Live Metrics</Title>
            <LiveMetrics />
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <Title>Active Alerts</Title>
            <AlertsList />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <Title>Resource Deployment</Title>
            <ResourceDeployment />
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;