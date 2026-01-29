import React from 'react'
import {useNavigate} from "react-router-dom"

const Loginbutton = () => {

  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/login');
  }

  return (
    <div>
        <nav>
            <button className="btn-login"  onClick={handleClick}>Login</button>
        </nav>
    </div>
  )
}

export default Loginbutton