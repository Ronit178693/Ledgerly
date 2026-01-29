import React from 'react'
import './Landing.css'
import Header from '../../Components/LandingComp/Header/Header.jsx';
import Footer from '../../Components/LandingComp/Footer/Footer.jsx';
import Main from '../../Components/LandingComp/Main/Main.jsx';

const Landing = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <Header/>
      </header>

      <main className="main">
        <Main/>
      </main>

      <footer className="footer">
        <Footer/>
      </footer>
    </div>
  )
}

export default Landing;
