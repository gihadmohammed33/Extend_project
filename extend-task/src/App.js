import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import AddProduct from '../src/admin/AddProduct';
import EditProduct from '../src/admin/EditProduct';
import Admin from './admin/Admin'; // Import Admin component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />

          <Route path="/admin" element={<Admin />} /> {/* Admin dashboard */}
          <Route path="/add-product" element={<AddProduct />} /> {/* Add product page */}
          <Route path="/edit-product/:id" element={<EditProduct />} /> {/* Edit product page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
