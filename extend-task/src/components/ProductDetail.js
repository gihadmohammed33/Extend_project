import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        const fetchedProduct = {
          ...response.data,
          price: Number(response.data.price), // Ensure price is a number
        };
        setProduct(fetchedProduct);
      } catch (err) {
        setError('Error fetching product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="not-found">{error}</div>;
  }

  if (!product) {
    return <div className="not-found">Product not found!</div>;
  }

  return (
    <div className="product-detail">
      <div className="detail-card">
        <div className="product-image-container">
          <img className="product-image" src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h2 className="product-title">{product.name}</h2>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>
          <p className="product-category"><span className='span'>Category:</span> {product.category}</p>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
