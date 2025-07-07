import React from 'react';
import { Link } from 'react-router-dom';
import './Topbar.css';
import logo from '../image/logo.png';


const Topbar = () => {
  return (
    <div className="topbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <span>English Learning</span>
      </div>
      <div className="topbar-right">
        <span className="spacer"></span>
    
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Поиск..."
          />
        </div>

        <button className="icon-button theme-toggle">
          <span className="material-icons">dark_mode</span>
        </button>

        <button className="icon-button help-button">
          <span className="material-icons">help_outline</span>
        </button>

        <Link to="/auth" className="profile-icon-link">
          <div className="profile-icon">
            <span className="material-icons profile-icon-svg">person</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
