import React from 'react';
import './Header.css';

const Header = () => (
  <header className="dashboard-header">
    <div className="logo-title">
      <span className="logo">📊</span>
      <span className="title">E-commerce Analytics</span>
    </div>
    <div className="user-avatar">
      <span role="img" aria-label="User">👤</span>
    </div>
  </header>
);

export default Header; 