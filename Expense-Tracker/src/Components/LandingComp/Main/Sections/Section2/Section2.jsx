import React from 'react'
import Card from './Card'
import download from '../../../../../assets/download.png';
import smart from '../../../../../assets/smart.png';
import Growth from '../../../../../assets/Growth.png';

const Section2 = () => {
  return (
    <div>
        <section className="features">
          <h2 className="features-title">Why Choose ExpenseTracker?</h2>
          <div className="features-grid">
            <Card  img = "🔒" title = "Secure & Private"  body ="Bank-level encryption keeps your financial data safe and secure at all times."/>
            <Card  img = "✨" title = "Smart Insights"  body ="Get personalized insights and recommendations to optimize your spending habits."/>
            <Card  img = "📈" title = "Track Growth"  body ="Visualize your financial progress and watch your savings grow over time."/>
          </div>
        </section>
    </div>
  )
}

export default Section2