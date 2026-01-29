import React from 'react'
import { useNavigate } from 'react-router-dom';

const Section3 = () => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/signup');
  }
  return (
    <div>
        <section className="cta">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Financial Journey?</h2>
            <p className="cta-subtitle">Join thousands of users who trust ExpenseTracker to manage their finances.</p>
            <button className="btn-cta"  onClick = {handleClick}>Create Your Free Account</button>
          </div>
        </section>
    </div>
  )
}

export default Section3