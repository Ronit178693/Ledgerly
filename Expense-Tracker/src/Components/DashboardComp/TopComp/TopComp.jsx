import React from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import TopCards from './TopCards/TopCards';

const TopComp = ({ totalBalance, income, expense, loading }) => {
  return (
    <div>
      <div className="stats-grid">
        <TopCards title="Total Balance" icon={<Wallet className="stat-icon" />} class1="stat-card balance-icon" class2="stat-icon-wrapper balance-icon" amount={loading ? "₹0" : totalBalance} />
        <TopCards title="Total Income" icon={<TrendingUp className="stat-icon" />} class1="stat-card income-card" class2="stat-icon-wrapper income-icon" amount={loading ? "₹0" : income} />
        <TopCards title="Total Expenses" icon={<TrendingDown className="stat-icon" />} class1="stat-card expense-card" class2="stat-icon-wrapper expense-icon" amount={loading ? "₹0" : expense} />
      </div>
    </div>
  );
};

export default TopComp;
