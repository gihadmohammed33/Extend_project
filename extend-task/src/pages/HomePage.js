import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import SearchFilter from '../components/SearchFilter';
import { products as initialProducts } from '../data/products';

const HomePage = () => {
  const [products, setProducts] = useState(initialProducts);

  const handleSearch = (searchTerm) => {
    const filteredProducts = initialProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  const handleFilter = (category) => {
    if (category) {
      const filteredProducts = initialProducts.filter(product => 
        product.category === category
      );
      setProducts(filteredProducts);
    } else {
      setProducts(initialProducts);
    }
  };

  return (
    <div className="homepage">
      <ProductList products={products} />
    </div>
  );
}

export default HomePage;
