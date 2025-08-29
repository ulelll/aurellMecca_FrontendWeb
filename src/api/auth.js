import axios from 'axios';

const api = axios.create({ baseURL: 'https://dummyjson.com' });

export const login = async (username, password) => {
  try {
    console.log('Sending login request with:', { username, password }); 
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('API error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Login failed' };
  }
};