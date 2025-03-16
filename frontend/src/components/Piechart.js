import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Registering the necessary ChartJS components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const Piechart = () => {
  // Data for the pie chart
  const data = {
    labels: ['Red', 'Blue', 'Yellow'],  // Labels for the pie chart sections
    datasets: [
      {
        data: [300, 50, 100],  // Data for each section
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Colors for each section
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Hover colors
      },
    ],
  };

  return (
    <div>
      <h2>Pie Chart Example</h2>
      <Pie data={data} /> {/* Render Pie chart */}
    </div>
  );
};

export default Piechart;
