import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddProduct from './AddProduct'; // Assuming AddProduct is in the same folder
import './Admin.scss'; // Import your styles

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:3000/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  const handleEdit = (product) => {
    // Navigate to the edit page with the product ID
    navigate(`/edit-product/${product.id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`http://localhost:3000/products/${id}`)
        .then(() => {
          fetchProducts(); // Refresh the product list
        })
        .catch(error => console.error('Error deleting product:', error));
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Panel</h1>
      
      <div className="admin-section">
        {/* Flex container for title and button */}
        <div className="header-container">
          <h2>Product List</h2>
          <Link to="/add-product" className="add-product-btn">Add Product</Link>
        </div>
        
        <ul>
          {products.map(product => (
            <li key={product.id} className="product-item">
              <h3>{product.name}</h3>
              <p>Price: {product.price}</p>
              <p>{product.description}</p>
              <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      
    </div>
  );
};

export default Admin;
