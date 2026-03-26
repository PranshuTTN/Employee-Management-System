import React, { useState, useEffect } from 'react';

const DEPARTMENTS = ['Engineering', 'Design', 'Marketing', 'HR', 'Finance', 'Operations'];
const ROLES = {
  Engineering: ['Senior Developer', 'Backend Developer', 'Frontend Developer', 'DevOps Engineer', 'Tech Lead'],
  Design: ['UI/UX Designer', 'Graphic Designer', 'Product Designer'],
  Marketing: ['Marketing Manager', 'SEO Specialist', 'Content Writer', 'Brand Manager'],
  HR: ['HR Manager', 'Recruiter', 'HR Executive'],
  Finance: ['Finance Manager', 'Accountant', 'Financial Analyst'],
  Operations: ['Operations Manager', 'Project Manager', 'Business Analyst'],
};

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  department: '',
  role: '',
  status: 'ACTIVE',
  salary: '',
};

const EmployeeForm = ({ employee, onSave, onCancel }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setForm({ ...employee, salary: employee.salary || '' });
    } else {
      setForm(INITIAL_FORM);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    // Reset role if department changes
    if (name === 'department') setForm((prev) => ({ ...prev, department: value, role: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.department) newErrors.department = 'Department is required';
    if (!form.role) newErrors.role = 'Role is required';
    if (form.salary && isNaN(form.salary)) newErrors.salary = 'Salary must be a number';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave({ ...form, salary: form.salary ? Number(form.salary) : null });
  };

  const availableRoles = form.department ? ROLES[form.department] || [] : [];

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>{employee ? '✏️ Edit Employee' : '➕ Add New Employee'}</h2>
        <p>{employee ? 'Update the employee details below' : 'Fill in the details to add a new employee'}</p>
      </div>

      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-row">
          <div className="form-group">
            <label>First Name *</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="e.g. Rahul"
              className={errors.firstName ? 'error' : ''}
            />
            {errors.firstName && <span className="error-text">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label>Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="e.g. Sharma"
              className={errors.lastName ? 'error' : ''}
            />
            {errors.lastName && <span className="error-text">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g. rahul@company.com"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Department *</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className={errors.department ? 'error' : ''}
            >
              <option value="">-- Select Department --</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {errors.department && <span className="error-text">{errors.department}</span>}
          </div>

          <div className="form-group">
            <label>Role *</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              disabled={!form.department}
              className={errors.role ? 'error' : ''}
            >
              <option value="">-- Select Role --</option>
              {availableRoles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            {errors.role && <span className="error-text">{errors.role}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <div className="form-group">
            <label>Annual Salary (₹)</label>
            <input
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              placeholder="e.g. 1200000"
              className={errors.salary ? 'error' : ''}
            />
            {errors.salary && <span className="error-text">{errors.salary}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {employee ? '💾 Update Employee' : '✅ Add Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
