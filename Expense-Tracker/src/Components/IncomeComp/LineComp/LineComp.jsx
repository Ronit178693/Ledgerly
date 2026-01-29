import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ labels, values }) => {
  const chartData = {
    labels: labels || [],
    datasets: [
      {
        label: "Income",
        data: values || [],
        borderColor: "rgba(129, 140, 248, 1)",
        backgroundColor: "rgba(129, 140, 248, 0.1)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: "rgba(129, 140, 248, 1)",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointHoverBackgroundColor: "rgba(129, 140, 248, 1)",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 3,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'rgba(148, 163, 184, 0.9)',
          font: {
            size: 14,
            weight: '600'
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'line'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: 'rgba(148, 163, 184, 0.9)',
        bodyColor: '#e5e7eb',
        borderColor: 'rgba(129, 140, 248, 0.5)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `₹${context.parsed.y.toLocaleString('en-IN')}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: 'rgba(148, 163, 184, 0.8)',
          font: {
            size: 11,
            weight: '500'
          },
          maxRotation: 45,
          minRotation: 0
        }
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: 'rgba(148, 163, 184, 0.8)',
          font: {
            size: 11,
            weight: '500'
          },
          callback: function(value) {
            return '₹' + value.toLocaleString('en-IN');
          }
        },
        beginAtZero: true
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  return (
    <div style={{ height: '400px', width: '100%', padding: '1rem' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
  