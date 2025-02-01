'use client'
import React from 'react'
import { Chart as ChartJS, BarElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface GraphProps {
  data: GraphData[];
}

interface GraphData {
  day: string;
  date: string;
  totalAmount: number;
}

const OrderGraph: React.FC<GraphProps> = ({ data }) => {
  const labels = data.map(item => item.day);
  const amount = data.map(item => (item.totalAmount) / 100);

  const chartData = {
    labels, // Corrected label property
    datasets: [{
      label: 'Sale Amount',
      data: amount,
      backgroundColor: 'rgba(144, 238, 144, 0.6)', // Light Green
      borderColor: 'rgba(144, 238, 144, 1)', // Solid Light Green Border
      borderWidth: 1,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="w-full h-[500px]">
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default OrderGraph;
