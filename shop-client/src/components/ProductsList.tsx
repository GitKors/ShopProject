import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/ProductsList.css";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = () => {
    const filteredProducts = products.filter((product) => {
      const isTitleMatch = product.title.toLowerCase().includes(searchTitle.toLowerCase());
      const isPriceInRange =
        (!minPrice || product.price >= minPrice) && (!maxPrice || product.price <= maxPrice);
      return isTitleMatch && isPriceInRange;
    });
    return filteredProducts;
  };

  const filteredProducts = handleSearch();

  return (
    <div className="products-list-container">
      <h1 className="page-title">Список товаров: {filteredProducts.length}</h1>
      <div className="filter-container">
        <input
          type="text"
          className="search-input"
          placeholder="Поиск по названию"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input
          type="number"
          className="price-input"
          placeholder="Минимальная цена"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          className="price-input"
          placeholder="Максимальная цена"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Поиск
        </button>
      </div>
      <ul className="product-list">
        {filteredProducts.map((product) => (
          <li key={product.id} className="product-item">
            <Link to={`/${product.id}`} className="product-title-link">
              <h2>{product.title}</h2>
            </Link>
            <p className="product-price">Price: {product.price}</p>
            {product.thumbnail ? (
              <Link to={`/${product.id}`}>
                <img src={product.thumbnail.url} alt={product.title} className="product-thumbnail" />
              </Link>
            ) : (
              <Link to={`/${product.id}`}>
                <img src="/product-placeholder.png" alt="Placeholder" className="product-thumbnail" />
              </Link>
            )}
            <p className="comment-count">Комментарии: {product.comments ? product.comments.length : 0}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
