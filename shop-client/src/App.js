import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './styles/App.css'; 

import Home from './components/Home';
import ProductsList from './components/ProductsList';
import ProductDetails from './components/ProductDetails';
import AdminLink from './components/AdminLink';

const App = () => {
  return (
    <Router>
      <div className="container">
        <header className="header">
          <h1>Shop.Client</h1>
          <nav className="navbar">
            <Link to="/">Главная</Link>
            <Link to="/products-list">Список товаров</Link>
            <AdminLink />
          </nav>
        </header>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products-list" element={<ProductsList />} />
            <Route path="/:id" element={<ProductDetails />} />
          </Routes>
        </div>
        <footer className="footer">
        <p>&copy; 2023 Shop.Client. All rights reserved. &lt;Корсаков Алексей&gt;</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
