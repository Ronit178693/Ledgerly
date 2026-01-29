import React from 'react';

const AuthVisualPanel = ({ variant = 'login' }) => {
  const isLogin = variant === 'login';

  return (
    <div className="auth-visuals">
      <div className="auth-badge">
        <span className="auth-badge-dot" />
        {isLogin ? 'Secure personal finance hub' : 'Create your free money hub'}
      </div>

      <div className="auth-hero-text">
        <h2>
          {isLogin ? 'See your money clearly' : 'Design your financial future'}
        </h2>
        <p>
          {isLogin
            ? 'Log in to track cash flow, monitor insights, and stay on top of every transaction.'
            : 'Sign up to track income, expenses, and goals in one beautiful, intelligent dashboard.'}
        </p>
      </div>

      <div className="auth-metrics-grid">
        <div className="auth-metric-card">
          <div className="auth-metric-label">This month savings</div>
          <div className="auth-metric-value">₹ 18,450</div>
          <div className="auth-metric-trend positive">+12.4% vs last month</div>
          <div className="auth-progress-bar">
            <div className="auth-progress-fill" />
          </div>
        </div>

        <div className="auth-metric-card small">
          <div className="auth-metric-label">Smart budgets</div>
          <div className="auth-badge-pill">Auto-adjusting</div>
          <ul className="auth-bullet-list">
            <li>Spending alerts in real time</li>
            <li>Auto-categorised expenses</li>
            <li>Goal-based saving buckets</li>
          </ul>
        </div>
      </div>

      <div className="auth-bar-chart">
        {[
          { label: 'Food', value: 40 },
          { label: 'Bills', value: 65 },
          { label: 'Travel', value: 30 },
          { label: 'Invest', value: 80 },
        ].map((item) => (
          <div className="auth-bar-group" key={item.label}>
            <div className="auth-bar-track">
              <div
                className="auth-bar-fill"
                style={{ height: `${item.value}%` }}
              />
            </div>
            <span className="auth-bar-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthVisualPanel;


