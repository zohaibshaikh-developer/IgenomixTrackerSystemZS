import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

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
import { color } from 'chart.js/helpers';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

interface ChartData {
  [key: string]: number;
}

const ChartComponentCoolerOUT: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
 
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/entry-count-ByDate-CoolerOUT`);
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
            label: 'Count of Cooler OUT entries',
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
  const generateDateLabels = () => {
    const labels = [];
    for (let i = 30; i >= 0; i--) {
      labels.push(moment().subtract(i, 'days').format('DD/MM/YYYY'));
    }
    labels.push(moment().format('DD/MM/YYYY')); // Add current month, date, year
    return labels;
  };

  // Generate an array of counts corresponding to each label
  const generateCountsArray = (data: ChartData, labels: string[]) => {
    const counts = labels.map((date) => data[date] || 0);
    return counts;
  };

  // Display loading or error message
  // if (loading) {
  //   return <div className='text-left text-black'>Loading...</div>;
  // }

  if (error) {
    return <div className='text-left text-black'>{error}</div>;
  }

  // Render the chart if data is available
  return (
    <div>
      {chartData && (
        <>
        <div  className='w-72 h-80 xl:w-96 xl:h-96 lg:w-96 xl:h-96'>
          <Bar
            data={chartData as any} // chartData is now ensured to be non-null
            options={{
              maintainAspectRatio: false,
              responsive: true,
            }}
            ref={(ref) => (chartRef.current = ref)}
          />
        </div>
        <div className="text-center font-semibold	 text-black font-serif mt-2 mb-6 sm:mb-6 xs:mb-6 md:mb-0 lg:mb-0 xl:mb-0">Cooler OUT</div>
          </>
      )}
    </div>
  );
};

export default ChartComponentCoolerOUT;
