import { useEffect, useState } from 'react';
import { getProducts, getProductById, addProduct, updateProduct } from '../api/products.js';
import Table from '../components/table.jsx';
import Modal from '../components/modal.jsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema } from '../utils/validation.js';
import { toast } from 'react-toastify';
import FormInput from '../components/form_input.jsx';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState('');
  const limit = 10;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(productSchema) });

  const fetchProducts = async () => {
    const data = await getProducts({ limit, skip, search });
    setProducts(data.products);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchProducts();
  }, [skip, search]);

  const handleDetail = async (id) => {
    const product = await getProductById(id);
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (product) => {
    reset(product);
    setIsEdit(true);
    setIsFormModalOpen(true);
  };

  const handleAdd = () => {
    reset({ title: '', price: '', description: '' });
    setIsEdit(false);
    setIsFormModalOpen(true);
  };

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateProduct(selectedProduct.id, data);
        toast.success('Product updated (mock)');
      } else {
        await addProduct(data);
        toast.success('Product added (mock)');
      }
      setIsFormModalOpen(false);
      fetchProducts();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container">
      <h1 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Products</h1>
      <button onClick={handleAdd} style={{ backgroundColor: 'green', marginBottom: '20px' }}>Add Product</button>
      <Table
        data={products}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'title', label: 'Title' },
          { key: 'price', label: 'Price' },
          { key: 'description', label: 'Description' },
        ]}
        total={total}
        limit={limit}
        onPageChange={setSkip}
        onSearch={setSearch}
        showActions={true}
        onDetail={handleDetail}
        onEdit={handleEdit}
      />
      <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} title="Product Details">
        {selectedProduct && (
          <div>
            <p><strong>Title:</strong> {selectedProduct.title}</p>
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
          </div>
        )}
      </Modal>
      <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} title={isEdit ? 'Edit Product' : 'Add Product'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput register={register} errors={errors} name="title" label="Title" />
          <FormInput register={register} errors={errors} name="price" label="Price" type="number" />
          <FormInput register={register} errors={errors} name="description" label="Description" />
          <button type="submit" style={{ width: '100%' }}>Save</button>
        </form>
      </Modal>
    </div>
  );
};

export default Products;