import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login.jsx';
import Users from './pages/users.jsx';
import Products from './pages/products.jsx';
import Layout from './components/layout.jsx';
import CustomToastContainer from './components/toast_container.jsx';

function App() {
  return (
    <Router>
      <CustomToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;