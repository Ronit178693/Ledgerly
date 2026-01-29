import React from 'react'
import {useNavigate} from "react-router-dom"

const Signupbutton = () => {

const navigate = useNavigate();

const handleClick = () => {
  navigate('/signup');
}

  return (
    <div>
        <nav>
            <button className="btn-signup" onClick={handleClick}>
              <span>Sign Up</span>
            </button>
        </nav>
    </div>
  )
}

export default Signupbutton