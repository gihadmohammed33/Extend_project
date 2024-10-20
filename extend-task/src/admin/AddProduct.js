import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddProduct.scss'; // Import the SCSS for styling

const AddProduct = ({ editingProduct, onProductAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setDescription(editingProduct.description);
      setCategory(editingProduct.category);
      setImage(editingProduct.image);
    } else {
      resetFields();
    }
    setMessage('');
    setError('');
  }, [editingProduct]);

  const resetFields = () => {
    setName('');
    setPrice('');
    setDescription('');
    setCategory('');
    setImage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = { name, price: parseFloat(price), description, category, image };
      let response;
      if (editingProduct) {
        response = await axios.put(`http://localhost:3000/products/${editingProduct.id}`, productData);
      } else {
        response = await axios.post('http://localhost:3000/products', productData);
      }
      setMessage(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
      resetFields();
  
  };

  return (
    <div className="add-product-container">
      <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Product Name" 
          required 
        />
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          placeholder="Price" 
          required 
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description" 
          required 
        />
        <input 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          placeholder="Category" 
          required 
        />
        <input 
          value={image} 
          onChange={(e) => setImage(e.target.value)} 
          placeholder="Image URL" 
        />
        <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default AddProduct;
