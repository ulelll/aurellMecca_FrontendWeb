import axios from 'axios';

const api = axios.create({ baseURL: 'https://dummyjson.com' });

export const fetchProducts = async ({ limit = 5, skip = 0, search = '' }) => {
  const res = await api.get('/products', { params: { limit, skip, q: search } });
  return res.data;
};

export const fetchProductDetail = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const addProduct = async (data) => {
  const res = await api.post('/products/add', data);
  return res.data;
};

export const editProduct = async (id, data) => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};
