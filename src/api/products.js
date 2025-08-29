import axios from 'axios';

const api = axios.create({ baseURL: 'https://dummyjson.com' });

export const getProducts = async (params) => {
  const { limit = 10, skip = 0, search = '', select = 'id,title,price,description' } = params;
  let url = `/products?limit=${limit}&skip=${skip}&select=${select}`;
  if (search) url = `/products/search?q=${search}&limit=${limit}&skip=${skip}&select=${select}`;
  const response = await api.get(url);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const addProduct = async (data) => {
  try {
    const response = await api.post('/products/add', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Add failed' };
  }
};

export const updateProduct = async (id, data) => {
  try {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Update failed' };
  }
};