import React from 'react'
import Btn1 from './btn1.jsx';
import Btn2 from './btn2.jsx';
import IncomeGraph from './IncomeGraph.jsx';
const Section1 = () => {
  return (
    <div>
        <section className="hero-section">
          <div className="hero">
            <div className="hero-content">
              <h1 className="hero-title">Take Control of Your Financial Future</h1>
              <p className="hero-subtitle">
                Track expenses, manage budgets, and achieve your financial goals with confidence.
                Your trusted partner for smart money management.
              </p>
              <div className="hero-buttons">
                <Btn1/>
                <Btn2/>
              </div>
            </div>
            <div className="hero-image">
              <IncomeGraph/>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Section1