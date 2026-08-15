import React, { useState } from "react";
import "./AddProduct.css";

const API_URL = "https://e-commerce-backend-ten-khaki.vercel.app";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [category, setCategory] = useState("");

  const addProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("old_price", oldPrice);
      formData.append("new_price", newPrice);
      formData.append("category", category);
      formData.append("image", image);

      const uploadResponse = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(uploadData?.message || "Image upload failed");
      }

      const response = await fetch(`${API_URL}/addproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          old_price: oldPrice,
          new_price: newPrice,
          category,
          image: uploadData.imageUrl,
        }),
      });

      const data = await response.json();
      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || "Add product failed");
      }

      alert("Product added successfully.");
      setName("");
      setOldPrice("");
      setNewPrice("");
      setCategory("");
      setImage("");
    } catch (error) {
      console.error("Add product error:", error);
      alert(error.message || "Failed to add product.");
    }
  };

  return (
    <div className="add-product">
      <h2>Add New Product</h2>

      <div className="form-group">
        <label>Product Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
        />
      </div>

      <div className="form-group">
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">-- Select Category --</option>
          <option value="kids">Kids</option>
          <option value="mens">Mens</option>
          <option value="womens">Womens</option>
        </select>
      </div>

      <div className="form-group">
        <label>Old Price (₹):</label>
        <input
          type="number"
          value={oldPrice}
          onChange={(e) => setOldPrice(e.target.value)}
          placeholder="Enter old price"
        />
      </div>

      <div className="form-group">
        <label>New Price (₹):</label>
        <input
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          placeholder="Enter new price"
        />
      </div>

      <div className="form-group">
        <label>Upload Product Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <button onClick={addProduct}>Add Product</button>
    </div>
  );
};

export default AddProduct;
