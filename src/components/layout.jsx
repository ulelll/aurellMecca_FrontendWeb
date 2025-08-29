import { useAuthStore } from '../store/authStore';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
  const { token, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!token) {
    navigate('/login');
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/users" style={{ marginRight: '15px' }}>Users</Link>
          <Link to="/products">Products</Link>
        </div>
        <button onClick={logout}>Logout</button>
      </nav>
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;