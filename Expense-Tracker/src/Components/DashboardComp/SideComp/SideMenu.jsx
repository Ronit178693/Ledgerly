import React, { useState, useContext } from 'react';
import { UserContext } from '../../../useContext/Context';
import { TrendingUp, TrendingDown, LogOut, LayoutDashboard } from 'lucide-react';
import profilepic from '../../../assets/images.jpeg';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axios';
import { API_PATHS } from '../../../utils/apiPaths';

const SideMenu = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleTabClick = (tab) => {
    if (tab === 'logout') {
      handleLogout();
    } else {
      setActiveTab(tab);
      if (tab === 'income') {
        navigate('./income');
      } else if (tab === 'expense') {
        navigate('./expense');
      } else if (tab === 'dashboard') {
        navigate('/dashboard');
      }
    }
  };


  return (
    <div>
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-profile-avatar">
            <div className="sidebar-avatar-ring">
              <img className="nav-img" src={profilepic} alt="profile" />
            </div>
          </div>
          <div className="sidebar-profile-text">
            <span className="sidebar-greeting">Welcome back,</span>
            <span className="sidebar-name">{user ? user.name : "Ledgerly User"}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleTabClick('dashboard')}
          >
            <LayoutDashboard className="nav-icon" />
            <span>Dashboard</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'income' ? 'active' : ''}`}
            onClick={() => handleTabClick('income')}
          >
            <TrendingUp className="nav-icon" />
            <span>Income</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'expense' ? 'active' : ''}`}
            onClick={() => handleTabClick('expense')}
          >
            <TrendingDown className="nav-icon" />
            <span>Expense</span>
          </button>

          <button className="nav-item logout" onClick={() => handleTabClick('logout')}>
            <LogOut className="nav-icon" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

    </div>

  );
};

export default SideMenu;