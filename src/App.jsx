// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from './store/authStore';
import Login from './pages/login';
import Users from './pages/users';
import Products from './pages/products';
import Navbar from './components/navbar';

const App = () => {
  const { token } = useAuthStore();

  return (
    <Router>
      <div className="app-container">
        {token && <Navbar />} =
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/users" /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={token ? <Users /> : <Navigate to="/login" />} />
          <Route path="/products" element={token ? <Products /> : <Navigate to="/login" />} />
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