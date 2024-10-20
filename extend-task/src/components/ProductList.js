import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchFilter from './SearchFilter';
import './ProduceList.scss'; // Make sure the filename is correct

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // Category filter state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null }); // Sorting state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filteredProducts to contain all products initially
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle search input
  const handleSearch = (term) => {
    setSearchTerm(term);
    filterProducts(term, selectedCategory);
  };

  // Handle category filter
  const handleFilter = (category) => {
    setSelectedCategory(category);
    filterProducts(searchTerm, category);
  };

  // Filter products based on search term and category
  const filterProducts = (searchTerm, category) => {
    let updatedProducts = products;

    // Filter by search term
    if (searchTerm) {
      updatedProducts = updatedProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (category && category !== 'all') {
      updatedProducts = updatedProducts.filter(product => product.category === category);
    }

    // Update filtered products
    setFilteredProducts(updatedProducts);
  };

  // Handle sorting by name or price
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedArray = [...filteredProducts].sort((a, b) => {
      if (key === 'price') {
        // Sort prices as numbers
        return direction === 'ascending'
          ? a.price - b.price
          : b.price - a.price;
      }

      // Sort names as strings
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setFilteredProducts(sortedArray);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />

      <div className="sorting-controls">
        <button onClick={() => handleSort('name')}>Sort by Name</button>
        <button onClick={() => handleSort('price')}>Sort by Price</button>
      </div>

      <div className="product-list">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-link">
                <img className="product-image" src={product.image} alt={product.name} />
                <h3 className="product-title">{product.name}</h3>
                <p className="product-price">${product.price}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>

      {/* Pagination Component */}
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

// Pagination Component
const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

 
  
};

export default ProductList;
