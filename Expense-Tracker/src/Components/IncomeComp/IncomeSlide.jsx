import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { TrendingUp, Calendar, DollarSign, Trash2 } from 'lucide-react';
import axiosInstance from '../../utils/axios';
import { API_PATHS } from '../../utils/apiPaths';
import '../../Pages/Income/Income.css';

const IncomeSlide = forwardRef((props, ref) => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIncomes = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_INCOME, { withCredentials: true });
      if (response.data.success) {
        setIncomes(response.data.income || []);
      }
    } catch (error) {
      console.error('Failed to fetch income:', error);
    } finally {
      setLoading(false);
    }
  };

  // Expose refreshIncomes method to parent component
  useImperativeHandle(ref, () => ({
    refreshIncomes: fetchIncomes
  }));

  useEffect(() => {
    fetchIncomes();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) {
      return '';
    }
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

  const handleDeleteIncome = async (incomeId) => {
    if (window.confirm('Are you sure you want to delete this income record?')) {
      try {
        const response = await axiosInstance.delete(
          API_PATHS.INCOME.DELETE_INCOME(incomeId)
        );
        if (response.data.success) {
          setIncomes(incomes.filter(inc => inc._id !== incomeId));
        } else {
          alert('Failed to delete income');
        }
      } catch (error) {
        console.error('Error deleting income:', error);
        alert('Error deleting income');
      }
    }
  };

  return (
    <div className="income-slide-container">
      <div className="income-grid">
        {/* Income Source Cards */}
        {incomes.map((income, index) => (
          <div
            key={income._id || index}
            className="income-source-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="income-card-header">
              <div className="income-icon-wrapper">
                <TrendingUp className="income-icon" />
              </div>
              <div className="income-source-info">
                <h3 className="income-source-title">{income.source || 'Income Source'}</h3>
                <p className="income-source-date">
                  <Calendar className="date-icon" size={14} />
                  {formatDate(income.date)}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="income-amount-section">
                <DollarSign className="amount-icon" size={20} />
                <span className="income-amount">{formatAmount(income.amount || 0)}</span>
              </div>

              <button
                onClick={() => handleDeleteIncome(income._id)}
                className="delete-btn"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#ef4444',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.2s ease',
                  marginLeft: 'auto'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                aria-label="Delete income"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

IncomeSlide.displayName = 'IncomeSlide';

export default IncomeSlide;

