import React, { useState, useEffect } from 'react'
import { API_PATHS } from '../../../utils/apiPaths.js';
import axiosInstance from '../../../utils/axios';
import { Plus } from 'lucide-react';
import AddExpense from '../AddExpense';
import PieChart from './PieChart.jsx';

const ExpenseGraph = ({ onExpenseAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const fetchExpenseData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.EXPENSES.GET_EXPENSES);
      if (response.data.success) {
        const expenses = response.data.expense || [];
        setExpenseData(expenses);
        processExpenseData(expenses);
      }
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const processExpenseData = (expenses) => {
    // Group expenses by category
    const categoryMap = {};

    expenses.forEach(expense => {
      const label = expense.source || 'Other';
      if (categoryMap[label]) {
        categoryMap[label] += expense.amount || 0;
      } else {
        categoryMap[label] = expense.amount || 0;
      }
    });

    // Extract labels and values
    const labels = Object.keys(categoryMap);
    const values = Object.values(categoryMap);

    // Define colors for pie chart
    const colors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7',
      '#a29bfe', '#fd79a8', '#fdcb6e', '#6c7983', '#00b894',
      '#ff7675', '#e17055', '#74b9ff', '#a29bfe', '#fab1a0'
    ];

    setChartData({
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors.slice(0, labels.length),
          borderColor: 'rgba(15, 23, 42, 0.95)',
          borderWidth: 2,
          hoverBorderColor: '#f1f5f9',
          hoverBorderWidth: 3,
          borderRadius: 8
        }
      ]
    });
  };

  useEffect(() => {
    fetchExpenseData();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    fetchExpenseData();
    onExpenseAdded?.();
  };

  return (
    <div className="income-graph-container">
      <div className="income-graph-header">
        <h2 className="income-graph-title">Expense Overview</h2>
        <button
          className="add-income-header-btn"
          onClick={handleOpenModal}
          aria-label="Add new expense"
        >
          <Plus size={20} />
          <span>Add Expense</span>
        </button>
      </div>

      <div className="income-graph-wrapper">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
            Loading expenses...
          </div>
        ) : chartData.labels.length > 0 ? (
          <PieChart data={chartData} />
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
            No expenses recorded yet. Add your first expense!
          </div>
        )}
      </div>

      <AddExpense
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default ExpenseGraph;
