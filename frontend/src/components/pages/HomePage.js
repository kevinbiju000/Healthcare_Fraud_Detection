import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles/HomePage.css'; // Correct path to the CSS file

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const lineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales Data',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: '#4CAF50',
      tension: 0.1
    }
  ]
};

const barChartData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'Number of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }
  ]
};

function HomePage() {
  return (
    <div className="homepage-container">
      <header className="dashboard-header">
        <h1 className="title">Medical Fraud Detection System</h1>
      </header>
      <div className="dashboard-content">
        <aside className="sidebar">
          <ul className="sidebar-menu">
            <li className="menu-item">Dashboard</li>
            <li className="menu-item">Reports</li>
            <li className="menu-item">Settings</li>
            <li className="menu-item">Profile</li>
          </ul>
        </aside>
        <main className="main-content">
          <h2>Dashboard</h2>
          <div className="chart-container">
            <div className="chart-item">
              <h3>Sales Data</h3>
              <Line data={lineChartData} />
            </div>
            <div className="chart-item">
              <h3>Votes Distribution</h3>
              <Bar data={barChartData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomePage;
