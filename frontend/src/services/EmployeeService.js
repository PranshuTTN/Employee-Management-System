import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/employees';

const EmployeeService = {

  // Get all employees
  getAll: () => axios.get(BASE_URL),

  // Get by ID
  getById: (id) => axios.get(`${BASE_URL}/${id}`),

  // Create employee
  create: (employee) => axios.post(BASE_URL, employee),

  // Update employee
  update: (id, employee) => axios.put(`${BASE_URL}/${id}`, employee),

  // Delete employee
  delete: (id) => axios.delete(`${BASE_URL}/${id}`),

  // Search
  search: (keyword) => axios.get(`${BASE_URL}/search?keyword=${keyword}`),

  // Stats
  getStats: () => axios.get(`${BASE_URL}/stats`),
};

export default EmployeeService;
