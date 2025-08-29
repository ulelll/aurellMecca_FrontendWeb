import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from './store/authStore';
import Login from './pages/login';
import Users from './pages/users';
import Products from './pages/products';

const App = () => {
  const { token } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>

          <Route
            path="/"
            element={token ? <Navigate to="/users" /> : <Navigate to="/login" />}
          />

          <Route path="/login" element={<Login />} />

          {token && (
            <>
              <Route path="/users" element={<Users />} />
              <Route path="/products" element={<Products />} />
            </>
          )}

          <Route path="*" element={<Navigate to={token ? "/users" : "/login"} />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </div>
    </Router>
  );
};

export default App;
