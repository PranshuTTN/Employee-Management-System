import React from 'react';

const DEPT_COLORS = {
  Engineering: '#4f46e5',
  Design: '#ec4899',
  Marketing: '#f59e0b',
  HR: '#10b981',
  Finance: '#3b82f6',
  Operations: '#8b5cf6',
};

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <span>🔍</span>
        <h3>No employees found</h3>
        <p>Try adjusting your search or add a new employee.</p>
      </div>
    );
  }

  const getInitials = (firstName, lastName) =>
    `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();

  const getDeptColor = (dept) => DEPT_COLORS[dept] || '#6b7280';

  const formatSalary = (salary) =>
    salary ? `₹${(salary / 100000).toFixed(1)}L` : 'N/A';

  return (
    <div className="employee-grid">
      {employees.map((emp) => (
        <div key={emp.id} className="employee-card">
          <div className="card-header">
            <div
              className="avatar"
              style={{ backgroundColor: getDeptColor(emp.department) }}
            >
              {getInitials(emp.firstName, emp.lastName)}
            </div>
            <div className="employee-info">
              <h3>{emp.firstName} {emp.lastName}</h3>
              <p className="role">{emp.role}</p>
            </div>
            <span className={`status-badge ${emp.status?.toLowerCase()}`}>
              {emp.status}
            </span>
          </div>

          <div className="card-body">
            <div className="detail-row">
              <span className="detail-icon">📧</span>
              <span>{emp.email}</span>
            </div>
            <div className="detail-row">
              <span className="detail-icon">🏢</span>
              <span
                className="dept-tag"
                style={{ backgroundColor: getDeptColor(emp.department) + '22', color: getDeptColor(emp.department) }}
              >
                {emp.department}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-icon">💰</span>
              <span className="salary">{formatSalary(emp.salary)}</span>
            </div>
          </div>

          <div className="card-actions">
            <button className="btn-edit" onClick={() => onEdit(emp)}>
              ✏️ Edit
            </button>
            <button className="btn-delete" onClick={() => onDelete(emp.id)}>
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
