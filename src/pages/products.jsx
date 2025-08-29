// src/pages/products.jsx
import { useState, useEffect } from 'react';
import { fetchProducts, fetchProductDetail, addProduct, editProduct } from "../api/products";
import { toast } from 'react-toastify';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', price: '', description: '' });

  const limit = 5;

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetchProducts({ limit, skip, search });
      setProducts(res.products);
      setTotal(res.total);
    } catch (err) {
      toast.error('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [skip, search]);

  const handlePrev = () => setSkip(prev => Math.max(prev - limit, 0));
  const handleNext = () => setSkip(prev => Math.min(prev + limit, total - limit));

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setSkip(0);
  };

  const showDetail = async (id) => {
    try {
      const detail = await fetchProductDetail(id);
      setSelectedProduct(detail);
    } catch (err) {
      toast.error('Failed to load product detail');
    }
  };

  const closeDetail = () => setSelectedProduct(null);

  const openForm = (product = null) => {
    if (product) setFormData({ title: product.title, price: product.price, description: product.description, id: product.id });
    else setFormData({ title: '', price: '', description: '' });
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await editProduct(formData.id, formData);
        toast.success('Product updated!');
      } else {
        await addProduct(formData);
        toast.success('Product added!');
      }
      closeForm();
      loadProducts();
    } catch (err) {
      toast.error('Action failed');
      console.error(err);
    }
  };

  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="table-container">
      <h2>Products</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={handleSearch}
        />
        <button onClick={() => openForm()} className="action-button add-button">
          Add Product
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={5} className="table-message">Loading...</td></tr>
          ) : products.length === 0 ? (
            <tr><td colSpan={5} className="table-message">No products found</td></tr>
          ) : (
            products.map((p, idx) => (
              <tr key={p.id}>
                <td>{skip + idx + 1}</td>
                <td>{p.title}</td>
                <td>${p.price}</td>
                <td>{p.description}</td>
                <td className="action-buttons">
                  <button
                    onClick={() => showDetail(p.id)}
                    className="action-button detail-button"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => openForm(p)}
                    className="action-button edit-button"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={handlePrev}
          disabled={skip === 0}
        >
          Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNext}
          disabled={skip + limit >= total}
        >
          Next
        </button>
      </div>

      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={closeDetail} className="modal-close">X</button>
            <h2>{selectedProduct.title}</h2>
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <p><strong>Brand:</strong> {selectedProduct.brand}</p>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
          </div>
        </div>
      )}

      {showForm && (
        <div className="modal">
          <form onSubmit={submitForm} className="modal-content">
            <button onClick={closeForm} type="button" className="modal-close">X</button>
            <h2>{formData.id ? 'Edit Product' : 'Add Product'}</h2>
            <div className="form-group">
              <input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                name="price"
                placeholder="Price"
                type="number"
                value={formData.price}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleFormChange}
                required
              />
            </div>
            <button type="submit">{formData.id ? 'Update' : 'Add'}</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Products;