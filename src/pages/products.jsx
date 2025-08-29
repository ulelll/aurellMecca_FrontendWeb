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
    <div className="p-4 overflow-x-auto">
      <h1 className="text-2xl mb-4">Products</h1>

      <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-4">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={handleSearch}
          className="p-2 border rounded w-full md:max-w-xs"
        />
        <button onClick={() => openForm()} className="bg-blue-600 text-white p-2 rounded w-full md:w-auto">Add Product</button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Price</th>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={5} className="text-center p-4">Loading...</td></tr>
          ) : products.length === 0 ? (
            <tr><td colSpan={5} className="text-center p-4">No products found</td></tr>
          ) : (
            products.map((p, idx) => (
              <tr key={p.id} className="border-b">
                <td className="p-2">{skip + idx + 1}</td>
                <td className="p-2">{p.title}</td>
                <td className="p-2">${p.price}</td>
                <td className="p-2">{p.description}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => showDetail(p.id)}
                    className="bg-green-600 text-white px-2 py-1 rounded"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => openForm(p)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex gap-2 mt-4 flex-wrap">
        <button
          onClick={handlePrev}
          disabled={skip === 0}
          className={`px-3 py-1 rounded border ${skip === 0 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-white border-blue-600 text-blue-600'}`}
        >
          Prev
        </button>
        <span className="self-center">Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNext}
          disabled={skip + limit >= total}
          className={`px-3 py-1 rounded border ${(skip + limit >= total) ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-white border-blue-600 text-blue-600'}`}
        >
          Next
        </button>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
            <button onClick={closeDetail} className="absolute top-2 right-2 text-gray-500">X</button>
            <h2 className="text-xl mb-2">{selectedProduct.title}</h2>
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <p><strong>Brand:</strong> {selectedProduct.brand}</p>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={submitForm}
            className="bg-white p-6 rounded shadow-md w-full max-w-md relative flex flex-col gap-2"
          >
            <button onClick={closeForm} type="button" className="absolute top-2 right-2 text-gray-500">X</button>
            <h2 className="text-xl mb-2">{formData.id ? 'Edit Product' : 'Add Product'}</h2>
            <input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleFormChange}
              className="p-2 border rounded"
              required
            />
            <input
              name="price"
              placeholder="Price"
              type="number"
              value={formData.price}
              onChange={handleFormChange}
              className="p-2 border rounded"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleFormChange}
              className="p-2 border rounded"
              required
            />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-2">{formData.id ? 'Update' : 'Add'}</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Products;
