import React from 'react';


const IncomeBreakdown = ({ data }) => {
    const { last30DaysIncome } = data || {};
    const transactions = last30DaysIncome?.incomeTransactionsin30Days || [];

    // Aggregate income by source
    const incomeMap = {};

    transactions.forEach(t => {
        incomeMap[t.source] = (incomeMap[t.source] || 0) + t.amount;
    });

    const sortedIncome = Object.entries(incomeMap)
        .map(([source, amount]) => ({ source, amount }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 4); // Top 4 sources

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="dashboard-card income-card-standalone" style={{ minHeight: '350px' }}>
            <h2 className="dashboard-card-title">Income</h2>
            <p className="dashboard-card-subtitle">Major income sources from last 30 days.</p>

            {sortedIncome.length > 0 ? (
                <div className="income-list">
                    {sortedIncome.map((item, index) => (
                        <div className="income-row" key={index} style={{
                            alignItems: 'center',
                            padding: '0.75rem',
                            background: 'rgba(15, 23, 42, 0.3)',
                            borderRadius: '12px',
                            border: '1px solid rgba(148, 163, 184, 0.05)'
                        }}>
                            <div>
                                <span className="income-source" style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{item.source}</span>
                            </div>
                            <span className="income-amount" style={{ color: '#34d399', fontWeight: '700' }}>{formatCurrency(item.amount)}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                    No income in last 30 days
                </div>
            )}
        </div>
    );
};

export default IncomeBreakdown;
