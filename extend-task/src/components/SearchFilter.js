import React, { useState } from 'react';
import './SearchFilter.scss';

const SearchFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="search-filter">
      <input 
        type="text" 
        placeholder="Search products..." 
        value={searchTerm} 
        onChange={handleSearchChange}
      />
      <select value={category} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        <option value="Sleeve">Sleeve</option>
        <option value="Bags">Bags</option>
        <option value="Wallet">Wallet</option>
      </select>
    </div>
  );
}

export default SearchFilter;
