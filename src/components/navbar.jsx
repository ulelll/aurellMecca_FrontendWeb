import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { logout, token } = useAuthStore();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (!token) return null; 

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4 flex flex-col md:flex-row justify-between items-center gap-2">
      <div className="flex gap-4 items-center">
        <Link
          to="/users"
          className={`px-3 py-1 rounded ${location.pathname === '/users' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
        >
          Users
        </Link>
        <Link
          to="/products"
          className={`px-3 py-1 rounded ${location.pathname === '/products' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
        >
          Products
        </Link>
      </div>

      <div className="flex gap-2 items-center mt-2 md:mt-0">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          {darkMode ? 'Light' : 'Dark'}
        </button>
        <button
          onClick={logout}
          className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
