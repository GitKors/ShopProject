import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [newComment, setNewComment] = useState({ title: "", email: "", body: "" });
  const [comments, setComments] = useState([]);

  useEffect(() => {

    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(response.data); // Set the received product data in state
      } catch (error) {
        console.error("Failed to fetch product details:", error.message);
      }
    };


    const fetchSimilarProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/similar/${id}`);
        setSimilarProducts(response.data); // Set the received similar products data in state
      } catch (error) {
        console.error("Failed to fetch similar products:", error.message);
      }
    };


    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/comments/${id}`);
        setComments(response.data); // Set the received comments data in state
      } catch (error) {
        console.error("Failed to fetch comments:", error.message);
      }
    };

    fetchProductDetails();
    fetchSimilarProducts();
    fetchComments();
  }, [id]);


  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/api/comments`, {
        productId: id,
        ...newComment,
      });
      setComments([...comments, response.data]);
      setNewComment({ title: "", email: "", body: "" });
    } catch (error) {
      console.error("Failed to add comment:", error.message);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <h1 className="product-title">{product.title}</h1>
      {product.thumbnail ? (
        <img src={product.thumbnail.url} alt={product.title} className="product-thumbnail" />
      ) : (
        <img src="/product-placeholder.png" alt="Placeholder" className="product-thumbnail" />
      )}
      {product.images && product.images.length > 0 && (
        <div className="product-images">
          {product.images.map((image) => (
            <img key={image.id} src={image.url} alt={product.title} className="product-image" />
          ))}
        </div>
      )}
      <p className="product-description">{product.description}</p>
      <p className="product-price">Price: {product.price}</p>
      <div className="similar-products">
        <h2>Похожие товары:</h2>
        {similarProducts.map((similarProduct) => (
          <Link to={`/${similarProduct.id}`} key={similarProduct.id} className="similar-product-link">
            <div className="similar-product">
              <h3>{similarProduct.title}</h3>
              <p>Price: {similarProduct.price}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="comments">
        <h2>Комментарии:</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <h3>{comment.title}</h3>
            <p>Email: {comment.email}</p>
            <p>{comment.body}</p>
          </div>
        ))}
        <form className="comment-form" onSubmit={handleAddComment}>
          <h3>Добавить комментарий:</h3>
          <input
            type="text"
            placeholder="Заголовок"
            value={newComment.title}
            onChange={(e) => setNewComment({ ...newComment, title: e.target.value })}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={newComment.email}
            onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
          />
          <textarea
            placeholder="Текст комментария"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <button type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
