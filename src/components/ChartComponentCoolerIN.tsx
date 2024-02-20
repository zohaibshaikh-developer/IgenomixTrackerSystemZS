import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

// Assuming BASE_URL is properly imported
import BASE_URL from '../config/base_url';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];

  // Add an index signature to allow any string key
  [key: string]: any;
}

const ChartComponentCoolerIN: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const generateCountsArray = (data: ChartData, labels: string[]) => {
    const counts = labels.map((date) => data[date] || 0);
    return counts;
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/entry-count-ByDate-CoolerIN`);
      const data: ChartData = await response.json();

      // Check if data is not empty
      if (Object.keys(data).length === 0) {
        setError('No data available');
        setLoading(false);
        return;
      }

      // Convert data to the format expected by Chart.js
      const labels = generateDateLabels();
      const counts = generateCountsArray(data, labels);

      // Destroy the existing chart before creating a new one
      // if (chartRef.current) {
      //   chartRef.current.destroy();
      // }

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Count of Coolers Received entries',
            data: counts,
            backgroundColor: 'rgba(254, 168, 47, 0.4)',
            borderColor: 'rgba(254, 168, 47, 1)',
            borderWidth: 1,
          },
        ],
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from API:', error);
      setError('Error fetching data');
      setLoading(false);
    }
  };

  // Generate labels for the last 30 days, including today and current month, date, year
  const generateDateLabels = (): string[] => {
    const labels: string[] = [];
    for (let i = 30; i >= 0; i--) {
      labels.push(moment().subtract(i, 'days').format('DD/MM/YYYY'));
    }
    labels.push(moment().format('DD/MM/YYYY')); // Add current month, date, year
    return labels;
  };

  // Display loading or error message
  if (loading) {
    return <div className='text-left text-black'>Loading...</div>;
  }

  if (error) {
    return <div className='text-left text-black'>{error}</div>;
  }

  // Render the chart if data is available
  return (
    <div>
      {chartData && (
        <>
          <div className='w-72 h-80 xl:w-96 xl:h-96 lg:w-96 xl:h-96'>
            <Bar
              data={chartData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
              }}
              ref={(ref) => {
                // Make sure to set the chartRef with the actual chart instance
                chartRef.current = ref;
              }}
            />
          </div>
          <div className="text-center font-semibold text-black font-serif mt-2 mb-6 sm:mb-6 xs:mb-6 md:mb-0 lg:mb-0 xl:mb-0">Received Coolers</div>
        </>
      )}
    </div>
  );
};

export default ChartComponentCoolerIN;
