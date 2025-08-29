import { useAuthStore } from '../store/authStore';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
  const { token, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#ef4195ff',
        color: 'white',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {token && <Link to="/users" style={{ color: 'white', textDecoration: 'none' }}>Users</Link>}
          {token && <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link>}
        </div>
        <div>
          {token ? (
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: 'white',
                color: '#007bff',
                border: 'none',
                borderRadius: '5px',
                padding: '5px 10px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              style={{
                backgroundColor: 'white',
                color: '#007bff',
                border: 'none',
                borderRadius: '5px',
                padding: '5px 10px',
                cursor: 'pointer'
              }}
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '20px', backgroundColor: '#f4f4f4' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;