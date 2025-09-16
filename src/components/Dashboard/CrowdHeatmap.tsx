import React, { useState, useEffect } from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap';

interface HeatmapData {
  id: string;
  data: Array<{
    x: string;
    y: number;
  }>;
}

const CrowdHeatmap: React.FC = () => {
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);

  useEffect(() => {
    const generateHeatmapData = () => {
      const areas = ['Gate A', 'Gate B', 'Gate C', 'Section 1', 'Section 2', 'Section 3'];
      const times = ['8:00', '9:00', '10:00', '11:00', '12:00'];
      return areas.map(area => ({
        id: area,
        data: times.map(time => ({
          x: time,
          y: Math.floor(Math.random() * 100)
        }))
      }));
    };

    const updateData = () => {
      setHeatmapData(generateHeatmapData());
    };

    updateData();
    const interval = setInterval(updateData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[400px] w-full">
      <ResponsiveHeatMap
        data={heatmapData}
        margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
        valueFormat=">-.2s"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: 'Time',
          legendOffset: 46
        }}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Area',
          legendPosition: 'middle',
          legendOffset: 70
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Area',
          legendPosition: 'middle',
          legendOffset: -72
        }}
        colors={{
          type: 'sequential',
          scheme: 'oranges'
        }}
        emptyColor="#ffffff"
        legends={[
          {
            anchor: 'bottom',
            translateX: 0,
            translateY: 30,
            length: 400,
            thickness: 8,
            direction: 'row',
            tickPosition: 'after',
            tickSize: 3,
            tickSpacing: 4,
            tickOverlap: false,
            title: 'Crowd Density →',
            titleAlign: 'start',
            titleOffset: 4
          }
        ]}
      />
    </div>
  );
};

export default CrowdHeatmap;