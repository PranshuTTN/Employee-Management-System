import React, { useState, useEffect, useCallback } from 'react';
import EmployeeService from './services/EmployeeService';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import StatsBar from './components/StatsBar';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [view, setView] = useState('list'); // 'list' | 'add' | 'edit'
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const res = searchKeyword
        ? await EmployeeService.search(searchKeyword)
        : await EmployeeService.getAll();
      setEmployees(res.data);
    } catch (err) {
      showNotification('Failed to fetch employees', 'error');
    } finally {
      setLoading(false);
    }
  }, [searchKeyword]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await EmployeeService.getStats();
      setStats(res.data);
    } catch (err) {
      console.error('Stats fetch failed');
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
    fetchStats();
  }, [fetchEmployees, fetchStats]);

  const handleSave = async (employeeData) => {
    try {
      if (selectedEmployee) {
        await EmployeeService.update(selectedEmployee.id, employeeData);
        showNotification('Employee updated successfully!');
      } else {
        await EmployeeService.create(employeeData);
        showNotification('Employee added successfully!');
      }
      setView('list');
      setSelectedEmployee(null);
      fetchEmployees();
      fetchStats();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Operation failed', 'error');
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setView('edit');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await EmployeeService.delete(id);
        showNotification('Employee deleted successfully!');
        fetchEmployees();
        fetchStats();
      } catch (err) {
        showNotification('Delete failed', 'error');
      }
    }
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div className="app">
      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.type === 'success' ? '✅' : '❌'} {notification.message}
        </div>
      )}

      {/* Header */}
      <header className="app-header">
        <div className="header-brand">
          <span className="logo">👥</span>
          <div>
            <h1>EmpTrack</h1>
            <p>Employee Management System</p>
          </div>
        </div>
        <div className="header-actions">
          {view === 'list' ? (
            <button className="btn-primary" onClick={() => { setSelectedEmployee(null); setView('add'); }}>
              + Add Employee
            </button>
          ) : (
            <button className="btn-secondary" onClick={() => { setView('list'); setSelectedEmployee(null); }}>
              ← Back to List
            </button>
          )}
        </div>
      </header>

      {/* Stats Bar */}
      <StatsBar stats={stats} />

      {/* Main Content */}
      <main className="main-content">
        {(view === 'list') && (
          <>
            {/* Search Bar */}
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by name, email, or department..."
                value={searchKeyword}
                onChange={handleSearch}
              />
              {searchKeyword && (
                <button className="clear-search" onClick={() => setSearchKeyword('')}>✕</button>
              )}
            </div>

            {/* Employee List */}
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>Loading employees...</p>
              </div>
            ) : (
              <EmployeeList
                employees={employees}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </>
        )}

        {(view === 'add' || view === 'edit') && (
          <EmployeeForm
            employee={selectedEmployee}
            onSave={handleSave}
            onCancel={() => { setView('list'); setSelectedEmployee(null); }}
          />
        )}
      </main>
    </div>
  );
}

export default App;
