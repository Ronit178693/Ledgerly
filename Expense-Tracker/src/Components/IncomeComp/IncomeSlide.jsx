import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { TrendingUp, Calendar} from 'lucide-react';
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

  return (
    <div className="income-slide-container">
      <h2 className="income-graph-title" style={{ marginBottom: '2rem' }}>Recent Income</h2>
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
            <div className="income-amount-section">
      
              <span className="income-amount">{formatAmount(income.amount || 0)}</span>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
});

IncomeSlide.displayName = 'IncomeSlide';

IncomeSlide.displayName = 'IncomeSlide';

export default IncomeSlide;

