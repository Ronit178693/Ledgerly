import React from 'react'
import SideMenu from '../../Components/DashboardComp/SideComp/SideMenu.jsx';
import { Outlet } from 'react-router-dom';
import './Home.css';
const DashboardComponents = () => {
  return (
    <div className="dashboard-container">
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Ledgerly</h1>
            <p className="dashboard-subtitle">Your live snapshot of income, expenses, and cash flow.</p>
          </div>
          <div className="dashboard-header-meta">
            <span className="dashboard-pill">Today • Smart insights active</span>
          </div>
        </div>
        <SideMenu/>
        <Outlet/>
      </main>
 
    </div>
  );
};

export default DashboardComponents