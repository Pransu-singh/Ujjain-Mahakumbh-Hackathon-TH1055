import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    backgroundColor: string;
    tension: number;
  }>;
}

const LiveMetrics: React.FC = () => {
  const [data, setData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'Crowd Density',
        data: [],
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4
      }
    ]
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Real-time Crowd Density'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Density (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time'
        }
      }
    }
  };

  useEffect(() => {
    // Simulated real-time data updates
    const updateData = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString();
      
      setData((prevData: ChartData) => {
        const newLabels = [...prevData.labels, timeStr];
        const newData = [...prevData.datasets[0].data, Math.floor(Math.random() * 100)];
        
        // Keep only last 10 data points for better visualization
        if (newLabels.length > 10) {
          newLabels.shift();
          newData.shift();
        }
        
        return {
          labels: newLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: newData
            }
          ]
        };
      });
    };

    // Update every 2 seconds
    const interval = setInterval(updateData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[300px] w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default LiveMetrics;