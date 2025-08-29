import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'reqres-free-v1'
  }
});

export const login = async (email, password) => {
  try {
    const res = await api.post('/login', { email, password });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};