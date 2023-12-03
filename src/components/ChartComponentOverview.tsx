import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';


import BASE_URL from '../config/base_url';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

interface ChartData {
  [date: string]: {
    [status: string]: any;
  };
}

const ChartComponentOverview: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/status-count-overview-past-30-days`);
      const data: ChartData = await response.json();

      // Check if data is not empty
      if (Object.keys(data).length === 0) {
        setError('No data available');
        setLoading(false);
        return;
      }

      // Convert data to the format expected by Chart.js
      const labels = generateDateLabels();

      // Create datasets for both "Completed" and "In Transit" statuses
      const datasets = ["Completed", "In Transit"].map((status) => {
        // Use different RGBA colors for "Completed" and "In Transit"
        const backgroundColor = status === "Completed" ? 'rgba(192, 75, 192, 0.4)' : 'rgba(75,192,192,0.4)';
        const borderColor = status === "Completed" ? 'rgba(192, 75, 192, 1)' : 'rgba(75,192,192,1)';

        return {
          label: status,
          data: generateCountsArray(data, labels, status),
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1,
        };
      });

      setChartData({
        labels: labels,
        datasets: datasets,
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

  // Generate an array of counts corresponding to each label for a specific status
  const generateCountsArray = (data: ChartData, labels: string[], status: string) => {
    return labels.map((date) => data[date]?.[status] || 0);
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
        <div  className='w-72 h-80 xl:w-96 xl:h-96 lg:w-96 xl:h-96'>
            <Bar
              data={chartData as any}
              options={{
                maintainAspectRatio: false,
                responsive: true,
              }}
              ref={(ref) => (chartRef.current = ref)}
            />
                </div>
                <div className="text-center font-semibold	 text-black font-serif mt-2 mb-6 sm:mb-6 xs:mb-6 md:mb-0 lg:mb-0 xl:mb-0">Overview</div>
        </>
      )}
    </div>
            );
};

export default ChartComponentOverview;
