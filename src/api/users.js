import axios from 'axios';

const api = axios.create({ baseURL: 'https://dummyjson.com' });

export const fetchUsers = async ({ limit = 5, skip = 0, search = '' }) => {
  const res = await api.get('/users', { params: { limit, skip, q: search } });
  return res.data; 
};

export const fetchUserDetail = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};
