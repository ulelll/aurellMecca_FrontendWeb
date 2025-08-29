import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginSchema } from '../utils/validation';
import FormInput from '../components/form_input';


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log('Form data submitted:', data); 
      const response = await login(data.username.trim(), data.password.trim());
      console.log('Login response:', response); 
      setToken(response.token);
      toast.success('Login successful');
      navigate('/users');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      toast.error(error.message || 'Invalid credentials');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f4f4' }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', maxWidth: '400px', width: '90%' }}
      >
        <h1 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Login</h1>
        <FormInput register={register} errors={errors} name="username" label="Username" />
        <FormInput register={register} errors={errors} name="password" label="Password" type="password" />
        <button type="submit" style={{ width: '100%' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;