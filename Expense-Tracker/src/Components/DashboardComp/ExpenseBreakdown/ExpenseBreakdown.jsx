import React from 'react';


const ExpenseBreakdown = ({ data }) => {
    const { last30DaysExpenses } = data || {};
    const transactions = last30DaysExpenses?.expenseTransactionsin30Days || [];

    // Aggregate expenses by source
    const expenseMap = {};
    let totalExpense = 0;

    transactions.forEach(t => {
        expenseMap[t.source] = (expenseMap[t.source] || 0) + t.amount;
        totalExpense += t.amount;
    });

    const sortedExpenses = Object.entries(expenseMap)
        .map(([source, amount]) => ({ source, amount }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 4); // Top 4 categories

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="dashboard-card expenses-card-standalone" style={{ minHeight: '350px' }}>
            <h2 className="dashboard-card-title">Expenses</h2>
            <p className="dashboard-card-subtitle">Top categories from last 30 days.</p>

            {sortedExpenses.length > 0 ? (
                <div className="chip-list">
                    {sortedExpenses.map((item, index) => {
                        const percentage = totalExpense > 0 ? (item.amount / totalExpense) * 100 : 0;
                        return (
                            <div className="chip-row" key={index}>
                                <span className="chip-label">{item.source}</span>
                                <div className="chip-bar">
                                    <div
                                        className={`chip-fill`}
                                        style={{
                                            width: `${percentage}%`,
                                            background: 'linear-gradient(90deg, #f87171, #ef4444)',
                                            boxShadow: '0 0 10px rgba(239, 68, 68, 0.4)'
                                        }}
                                    />
                                </div>
                                <span className="chip-value">{formatCurrency(item.amount)}</span>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                    No expenses in last 30 days
                </div>
            )}
        </div>
    );
};

export default ExpenseBreakdown;
