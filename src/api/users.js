import axios from 'axios';

const api = axios.create({ baseURL: 'https://dummyjson.com' });

export const getUsers = async (params) => {
  const { limit = 10, skip = 0, search = '', select = 'id,firstName,lastName,email' } = params;
  let url = `/users?limit=${limit}&skip=${skip}&select=${select}`;
  if (search) url = `/users/search?q=${search}&limit=${limit}&skip=${skip}&select=${select}`;
  const response = await api.get(url);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};