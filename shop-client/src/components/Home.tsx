import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {

    const fetchProductsData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        const products = response.data;

 
        const totalProductsCount = products.length;
        const totalPriceSum = products.reduce((sum, product) => sum + product.price, 0);


        setTotalProducts(totalProductsCount);
        setTotalPrice(totalPriceSum);
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      }
    };

    fetchProductsData(); 
  }, []);

  return (
    <div>
      <p>{`В базе данных находится ${totalProducts} товаров общей стоимостью ${totalPrice}`}</p>
    </div>
  );
};

export default Home;
