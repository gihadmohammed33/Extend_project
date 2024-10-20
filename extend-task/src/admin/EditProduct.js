import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductForm.scss'; // Import the shared CSS

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // To handle redirection
  const [product, setProduct] = useState({ name: '', price: '', description: '', category: '', image: '' });

  useEffect(() => {
    // Fetch product data when component mounts
    axios.get(`http://localhost:3000/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the product on the server
      await axios.put(`http://localhost:3000/products/${id}`, product);
      console.log('Product updated');
      navigate('/'); // Redirect to home page or another route after updating
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <input 
        value={product.name} 
        onChange={(e) => setProduct({ ...product, name: e.target.value })} 
        placeholder="Name" 
        required 
      />
      <input 
        type="number" 
        value={product.price} 
        onChange={(e) => setProduct({ ...product, price: e.target.value })} 
        placeholder="Price" 
        required 
      />
      <textarea 
        value={product.description} 
        onChange={(e) => setProduct({ ...product, description: e.target.value })} 
        placeholder="Description" 
        required 
      />
      <input 
        value={product.category} 
        onChange={(e) => setProduct({ ...product, category: e.target.value })} 
        placeholder="Category" 
        required 
      />
      <input 
        value={product.image} 
        onChange={(e) => setProduct({ ...product, image: e.target.value })} 
        placeholder="Image URL" 
      />
      <button type="submit">Update Product</button>
    </form>
  );
};

export default EditProduct;
