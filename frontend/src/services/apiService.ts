import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Use this to make actual API calls
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchSortingAlgorithms = async () => {
  try {
    const response = await api.get('/algorithms/sorting');
    return response.data;
  } catch (error) {
    console.error('Error fetching sorting algorithms:', error);
    throw error;
  }
};

export const fetchSystemDesignPatterns = async () => {
  try {
    const response = await api.get('/system-design/patterns');
    return response.data;
  } catch (error) {
    console.error('Error fetching system design patterns:', error);
    throw error;
  }
};

export default api;