import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const productSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  price: yup.number().required('Price is required').positive(),
  description: yup.string().required('Description is required'),
});