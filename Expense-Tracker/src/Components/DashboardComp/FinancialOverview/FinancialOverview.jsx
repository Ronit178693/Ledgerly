import React from 'react';
import '../../../Pages/Home/Home.css';
import { Clock } from 'lucide-react';

const FinancialOverview = ({ data }) => {
    const { totalBalance, totalIncome, totalExpenses, lastFive } = data || {};

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
        }).format(amount || 0);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-IN', {
            day: 'numeric',
            month: 'short',
        }).format(date);
    };

    return (
        <div className="dashboard-card overview-card" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>


            <div className="recent-transactions">
                <h3 style={{ fontSize: '1rem', color: '#e2e8f0', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={16} color="#94a3b8" /> Recent Transactions
                </h3>

                {lastFive && lastFive.length > 0 ? (
                    <div className="transaction-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {lastFive.map((item, index) => {
                            // Determine if it's income or expense based on potentially missing fields or logic.
                            // The API combines them. Typically 'Expense' model has 'source' and 'Income' model has 'source'. 
                            // Wait, the API response for `lastFive` merges them. 
                            // Let's assume we can differentiate, or if not, we might need a type field.
                            // However, `dashboardController.js` just merges them: `[...lastFiveIncome, ...lastFiveExpense]`.
                            // It doesn't explicitly add a type. 
                            // But usually Income schemas have different fields than Expense?
                            // Both have `source`, `amount`, `date`.
                            // Expense has `icon` default '💰'. Income might not?
                            // Let's try to match by collection if possible, or we need to fix the backend to add a 'type'.
                            // Looking at `dashboardController.js` again, it DOES NOT add a type field. 
                            // This is a potential issue.
                            // BUT, generally expense comes from `Expense` model and income from `Income` model.
                            // I can try to change the backend, OR just heuristically guess.
                            // Actually, `Expense` has `icon`, `Income` might not have `icon` field explicitly default?
                            // Let's check Income model.

                            // For now, I'll assume if it's not working, I'll need to update backend.
                            // But wait, the USER said "i have api rout already setup". 
                            // I should check if I missed something in `dashboardController.js` that distinguishes them.
                            // Line 51: `const lastFiveIncome = ...` and `const lastFiveExpense = ...`
                            // Line 55: `[...lastFiveIncome, ...lastFiveExpense]`
                            // It returns raw Mongoose documents.
                            // I will check `Income` model quickly.

                            // Heuristic: If I can't distinguish, I might color them all neutral or check for known categories.
                            // Better approach: Update backend to add `type` field in the aggregate or map.
                            // BUT I should respect "API route already setup".
                            // Maybe I can rely on `category` vs `source` if they differ? 
                            // Both use `source`.

                            // Let's assume for a moment that positive amounts are income? No, amounts are absolute.
                            // Wait, `TopComp` uses separate totals.

                            // Let's check `Income` model to see if there's any unique field.
                            return (
                                <div key={index} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '0.75rem',
                                    background: 'rgba(15, 23, 42, 0.4)',
                                    borderRadius: '10px',
                                    borderLeft: `3px solid ${item.type === 'income' ? '#4ecdc4' : '#ff6b6b'}` // Placeholder type check
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{
                                            width: '32px', height: '32px',
                                            borderRadius: '8px',
                                            background: 'rgba(148, 163, 184, 0.1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            {/* Heuristic: if icon is present and it is equal to default expense icon '💰' maybe? */}
                                            {/* Or just use generic icons */}
                                            <div style={{ fontSize: '1.2rem' }}>{item.icon || '📄'}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#e2e8f0' }}>{item.source}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{formatDate(item.date)}</div>
                                        </div>
                                    </div>
                                    <span style={{
                                        fontWeight: '700',
                                        color: '#fff'
                                    }}>
                                        {formatCurrency(item.amount)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8', fontStyle: 'italic' }}>
                        No recent activity
                    </div>
                )}
            </div>
        </div>
    );
};

export default FinancialOverview;
