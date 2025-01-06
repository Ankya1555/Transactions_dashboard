import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionsChart = ({ chartData, selectedMonth }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (chartRef.current) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }
  }, [chartData]);

  const data = {
    labels: ['0-100', '100-200', '200-300', '300-400'], // Customize price ranges
    datasets: [
      {
        label: 'Price Range',
        data: chartData.data || [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light blue bars
        borderColor: 'rgba(54, 162, 235, 1)', // Blue border
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20, // Customize y-axis values
        },
      },
      x: {
        ticks: {
          callback: function (value, index, values) {
            return data.labels[index]; // Show customized price ranges on x-axis
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: `Bar Chart Stats - ${selectedMonth}`, // Dynamic heading
      },
    },
  };

  return (
    <div>
      {chartData.labels && chartData.data ? (
        <Bar ref={chartRef} data={data} options={options} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default TransactionsChart;
