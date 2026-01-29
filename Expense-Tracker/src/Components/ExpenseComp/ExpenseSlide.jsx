import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Trash2, Calendar, DollarSign } from 'lucide-react';
import axiosInstance from '../../utils/axios';
import { API_PATHS } from '../../utils/apiPaths';
import '../../Pages/Income/Income.css';

const ExpenseSlide = forwardRef((props, ref) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      // setLoading(true); // Optional: depends if we want spinner on every refresh
      const response = await axiosInstance.get(API_PATHS.EXPENSES.GET_EXPENSES);
      if (response.data.success) {
        setExpenses(response.data.expense || []);
      }
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  // Expose refreshExpenses method to parent component
  useImperativeHandle(ref, () => ({
    refreshExpenses: fetchExpenses
  }));

  useEffect(() => {
    fetchExpenses();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDeleteExpense = async (expenseId) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        const response = await axiosInstance.delete(
          API_PATHS.EXPENSES.DELETE_EXPENSES(expenseId)
        );
        if (response.data.success) {
          setExpenses(expenses.filter(exp => exp._id !== expenseId));
        } else {
          alert('Failed to delete expense');
        }
      } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Error deleting expense');
      }
    }
  };

  return (
    <div className="income-slide-container">
      <h2 className="income-graph-title" style={{ marginBottom: '2rem' }}>Recent Expenses</h2>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
          Loading expenses...
        </div>
      ) : expenses.length > 0 ? (
        <div className="income-grid">
          {expenses.map((expense, index) => (
            <div
              key={expense._id || index}
              className="income-source-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="income-card-header">
                <div className="income-icon-wrapper">
                  <span style={{ fontSize: '28px' }}>
                    {expense.category?.split(' ')[0] || '💸'}
                  </span>
                </div>
                <div className="income-source-info">
                  <h3 className="income-source-title">{expense.category || 'Expense'}</h3>
                  <p className="income-source-date">
                    <Calendar size={14} style={{ marginRight: '4px' }} />
                    {formatDate(expense.date)}
                  </p>
                  {expense.description && (
                    <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '4px' }}>
                      {expense.description}
                    </p>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="income-amount-section">
                  <DollarSign size={20} style={{ marginRight: '4px' }} />
                  <span className="income-amount">{formatAmount(expense.amount || 0)}</span>
                </div>
                <button
                  onClick={() => handleDeleteExpense(expense._id)}
                  className="delete-btn"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#ef4444',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#94a3b8',
          fontSize: '1.1rem'
        }}>
          No expenses recorded yet. Start tracking your spending!
        </div>
      )}
    </div>
  );
});

ExpenseSlide.displayName = 'ExpenseSlide';

export default ExpenseSlide;
