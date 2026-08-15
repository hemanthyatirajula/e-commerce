import React, { useEffect, useState } from "react";
import "./ListProduct.css";

const API_URL = "https://e-commerce-backend-ten-khaki.vercel.app";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch(`${API_URL}/allproducts`);
      if (!response.ok) {
        throw new Error(`Fetch failed: ${response.status}`);
      }
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    if (!id) {
      console.error("Missing product id");
      alert("Product id not found.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/removeproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || `Delete failed: ${response.status}`);
      }

      setAllProducts((prevProducts) =>
        prevProducts.filter((product) => (product._id || product.id) !== id)
      );

      alert("Product removed successfully.");
    } catch (error) {
      console.error("Remove product error:", error);
      alert(`Failed to remove product. Please try again.\n${error.message}`);
    }
  };

  return (
    <div className="listproduct">
      <h1>All Product</h1>

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Products</th>
              <th>Title</th>
              <th>Old Price</th>
              <th>New Price</th>
              <th>Category</th>
              <th>Remove</th>
            </tr>
          </thead>

          <tbody>
            {allProducts.map((product) => {
              const productId = product._id || product.id;

              return (
                <tr key={productId}>
                  <td className="product-image-cell">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                  </td>

                  <td className="product-name-cell">
                    <span className="product-name">{product.name}</span>
                  </td>

                  <td>₹{product.old_price}</td>
                  <td>₹{product.new_price}</td>
                  <td>{product.category}</td>

                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => removeProduct(productId)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProduct;
