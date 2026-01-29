import React from 'react'
import { useNavigate } from 'react-router-dom';

const Btn1 = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  }
  return (
    <div><button className="btn-primary" onClick={handleClick}>Get Started Free</button></div>
  )
}

export default Btn1