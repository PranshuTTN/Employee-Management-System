import React from 'react';

const StatsBar = ({ stats }) => {
  return (
    <div className="stats-bar">
      <div className="stat-card total">
        <span className="stat-icon">👥</span>
        <div>
          <h3>{stats.total}</h3>
          <p>Total Employees</p>
        </div>
      </div>
      <div className="stat-card active">
        <span className="stat-icon">✅</span>
        <div>
          <h3>{stats.active}</h3>
          <p>Active</p>
        </div>
      </div>
      <div className="stat-card inactive">
        <span className="stat-icon">⏸️</span>
        <div>
          <h3>{stats.inactive}</h3>
          <p>Inactive</p>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
