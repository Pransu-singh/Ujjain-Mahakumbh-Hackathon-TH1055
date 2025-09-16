import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['Gate A', 'Gate B', 'Section 1', 'Section 2', 'Main Plaza'],
  datasets: [
    {
      label: 'Peak Crowd (Today)',
      data: [1200, 950, 800, 650, 1400],
      backgroundColor: 'rgba(66, 153, 225, 0.7)',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
    title: { display: true, text: 'Crowd Analytics' },
  },
};

const Analytics: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Analytics</h2>
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <Bar data={data} options={options} />
    </div>
    <div className="mt-6">
      <h3 className="font-semibold mb-2 dark:text-gray-100">Summary</h3>
      <ul className="list-disc ml-6 text-gray-700 dark:text-gray-200">
        <li>Gate A had the highest peak today.</li>
        <li>Main Plaza is consistently crowded during noon hours.</li>
        <li>Section 2 saw a 10% increase in footfall compared to yesterday.</li>
      </ul>
    </div>
  </div>
);

export default Analytics;