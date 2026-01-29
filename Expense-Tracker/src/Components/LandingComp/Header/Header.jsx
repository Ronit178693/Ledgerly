import React from 'react'
import Loginbutton from './authComp/Loginbutton.jsx';
import Signupbutton from './authComp/Signupbutton.jsx';

const Header = () => {
  return (
    <div className='header'>
          <div className="header-container">
          <div className="logo">Ledgerly</div>
          <nav className="nav">
            <Loginbutton/>
            <Signupbutton/>
          </nav>
        </div>
    </div>
  )
}

export default Header

