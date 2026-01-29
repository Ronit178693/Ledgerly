import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const DashboardChart = ({ data }) => {
    const { last30DaysIncome, last30DaysExpenses } = data || {};

    // Extract transactions
    const incomeTransactions = last30DaysIncome?.incomeTransactionsin30Days || [];
    const expenseTransactions = last30DaysExpenses?.expenseTransactionsin30Days || [];

    // Group by date for the last 30 days
    // We need an array of dates (labels) and corresponding income/expense totals.

    const getLast30DaysDates = () => {
        const dates = [];
        for (let i = 29; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            dates.push(d.toISOString().split('T')[0]); // YYYY-MM-DD
        }
        return dates;
    };

    const dates = getLast30DaysDates();

    const incomeMap = {};
    incomeTransactions.forEach(t => {
        const dateStr = new Date(t.date).toISOString().split('T')[0];
        incomeMap[dateStr] = (incomeMap[dateStr] || 0) + t.amount;
    });

    const expenseMap = {};
    expenseTransactions.forEach(t => {
        const dateStr = new Date(t.date).toISOString().split('T')[0];
        expenseMap[dateStr] = (expenseMap[dateStr] || 0) + t.amount;
    });

    const incomeData = dates.map(date => incomeMap[date] || 0);
    const expenseData = dates.map(date => expenseMap[date] || 0);
    const labels = dates.map(date => {
        const d = new Date(date);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    });

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: '#4ecdc4',
                borderRadius: 4,
            },
            {
                label: 'Expenses',
                data: expenseData,
                backgroundColor: '#ff6b6b',
                borderRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#e2e8f0',
                    usePointStyle: true,
                }
            },
            title: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                titleColor: '#e2e8f0',
                bodyColor: '#e2e8f0',
                borderColor: 'rgba(148, 163, 184, 0.2)',
                borderWidth: 1,
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: '#94a3b8',
                    maxTicksLimit: 7,
                    maxRotation: 0,
                    minRotation: 0,
                }
            },
            y: {
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#94a3b8',
                    callback: (value) => value >= 1000 ? `${value / 1000}k` : value,
                }
            }
        }
    };

    return (
        <div className="dashboard-card chart-card" style={{ height: '350px' }}>
            <h2 className="dashboard-card-title">Last 30 Days</h2>
            <p className="dashboard-card-subtitle">
                Income vs Expenses daily comparison
            </p>
            <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
                <Bar options={options} data={chartData} />
            </div>
        </div>
    );
};

export default DashboardChart;
