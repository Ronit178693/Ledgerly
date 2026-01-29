import React, { useState, useEffect } from 'react'
import { API_PATHS } from '../../../utils/apiPaths.js';
import axiosInstance from '../../../utils/axios';
import { Plus } from 'lucide-react';
import AddIncome from '../AddIncome';
import LineChart from './LineComp.jsx';
// import "../../../Pages/Income/Income.css";

const IncomeGraph = ({ onIncomeAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({ labels: [], values: [] });

    const processIncomeData = (incomes) => {
      // Get current year and last 12 months
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      
      // Create array for last 12 months
      const last12Months = [];
      for (let i = 11; i >= 0; i--) {
        const date = new Date(currentYear, currentMonth - i, 1);
        last12Months.push({
          month: monthNames[date.getMonth()],
          year: date.getFullYear(),
          monthIndex: date.getMonth(),
          total: 0
        });
      }

      // Group income by month
      incomes.forEach(income => {
        if (income.date) {
          const incomeDate = new Date(income.date);
          const incomeYear = incomeDate.getFullYear();
          const incomeMonth = incomeDate.getMonth();
          
          // Find matching month in last 12 months
          const monthData = last12Months.find(m => 
            m.year === incomeYear && m.monthIndex === incomeMonth
          );
          
          if (monthData) {
            monthData.total += income.amount || 0;
          }
        }
      });

      // Extract labels and values
      const labels = last12Months.map(m => `${m.month} ${m.year.toString().slice(2)}`);
      const values = last12Months.map(m => m.total);

      setChartData({ labels, values });
    };

  const fetchIncomeData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_INCOME, {withCredentials:true});
      if (response.data.success) {
        const incomes = response.data.income || [];
        setIncomeData(incomes);
        processIncomeData(incomes);
      }
    } catch (error) {
      console.error('Failed to fetch income:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomeData();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    fetchIncomeData();
    onIncomeAdded?.();
  };

  return (
    <div className="income-graph-container">
      <div className="income-graph-header">
        <h2 className="income-graph-title">Income Overview</h2>
        <button 
          className="add-income-header-btn" 
          onClick={handleOpenModal}
          aria-label="Add new income"
        >
          <Plus className="plus-icon" size={20} />
          <span>Add Income</span>
        </button>
      </div>
      <div className="income-graph-content">
        {loading ? (
          <div className="income-graph-placeholder">
            <p>Loading income data...</p>
          </div>
        ) : chartData.labels.length > 0 ? (
          <LineChart labels={chartData.labels} values={chartData.values} />
        ) : (
          <div className="income-graph-placeholder">
            <p>No income data available. Add your first income to see the graph!</p>
          </div>
        )}
      </div>

      <AddIncome 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
    </div>
  )
}

export default IncomeGraph