// import React, { useState } from 'react';
// import './AddProduct.css';

// const AddProduct = () => {
//   const [productDetails, setProductDetails] = useState({
//     name: "",
//     image: "",
//     category: "",
//     new_price: "",
//     old_price: "",
//   });

//   const handleInputChange = (e) => {
//     setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("product", file);

//     try {
//       const response = await fetch("https://e-commerce-backend-ten-khaki.vercel.app/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (data.success) {
//         setProductDetails((prev) => ({
//           ...prev,
//           image: data.image_url,
//         }));
//       } else {
//         alert("❌ Image upload failed.");
//       }
//     } catch (error) {
//       console.error("Image upload error:", error);
//       alert("❌ Error uploading image.");
//     }
//   };

//   const handleAddProduct = async () => {
//     const { name, image, category, new_price, old_price } = productDetails;
// console.log("Sending Product:", productDetails);
//     if (!name || !image || !category || !new_price || !old_price) {
//       alert("⚠️ Please fill in all fields.");
//       return;
//     }

//     try {
//       const response = await fetch("https://e-commerce-backend-ten-khaki.vercel.app/addproduct", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(productDetails),
//       });

//       const data = await response.json();

//       if (data.success) {
//         alert("✅ Product added successfully.");
//         // Optionally reset form
//         setProductDetails({
//           name: "",
//           image: "",
//           category: "",
//           new_price: "",
//           old_price: "",
//         });
//       } else {
//         alert("❌ Failed to add product.");
//       }
//     } catch (error) {
//       console.error("Add product error:", error);
//       alert("❌ Server error occurred.");
//     }
//   };

//   return (
//     <div className="add-product">
//       <h2>Add New Product</h2>

//       <div className="form-group">
//         <label>Product Name:</label>
//         <input
//           type="text"
//           name="name"
//           value={productDetails.name}
//           onChange={handleInputChange}
//           placeholder="Enter product name"
//         />
//       </div>

//       <div className="form-group">
//         <label>Category:</label>
//         <select
//           name="category"
//           value={productDetails.category}
//           onChange={handleInputChange}
//         >
//           <option value="womens">Womens</option>
//           <option value="mens">Mens</option>
//           <option value="kids">Kids</option>
//         </select>
//       </div>

//       <div className="form-group">
//         <label>Old Price (₹):</label>
//         <input
//           type="number"
//           name="old_price"
//           value={productDetails.old_price}
//           onChange={handleInputChange}
//           placeholder="Enter old price"
//         />
//       </div>

//       <div className="form-group">
//         <label>New Price (₹):</label>
//         <input
//           type="number"
//           name="new_price"
//           value={productDetails.new_price}
//           onChange={handleInputChange}
//           placeholder="Enter new price"
//         />
//       </div>

//       <div className="form-group">
//         <label>Upload Product Image:</label>
//         <input type="file" onChange={handleImageUpload} />
//         {productDetails.image && (
//           <img
//             src={productDetails.image}
//             alt="Preview"
//             style={{ marginTop: "10px", width: "100px", borderRadius: "5px" }}
//           />
//         )}
//       </div>

//       <button onClick={handleAddProduct}>➕ Add Product</button>
//     </div>
//   );
// };

// export default AddProduct;













import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    old_price: "",
  });

  const handleInputChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("product", file);

    try {
      const response = await fetch("https://e-commerce-backend-ten-khaki.vercel.app/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setProductDetails((prev) => ({
          ...prev,
          image: data.image_url,
        }));
      } else {
        alert("❌ Image upload failed.");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      alert("❌ Error uploading image.");
    }
  };

  const handleAddProduct = async () => {
    const { name, image, category, new_price, old_price } = productDetails;
    console.log("Sending Product:", productDetails);

    if (!name || !image || !category || !new_price || !old_price) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("https://e-commerce-backend-ten-khaki.vercel.app/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productDetails),
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Product added successfully.");
        setProductDetails({
          name: "",
          image: "",
          category: "",
          new_price: "",
          old_price: "",
        });
      } else {
        alert("❌ Failed to add product.");
      }
    } catch (error) {
      console.error("Add product error:", error);
      alert("❌ Server error occurred.");
    }
  };

  return (
    <div className="add-product">
      <h2>Add New Product</h2>

      <div className="form-group">
        <label>Product Name:</label>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={handleInputChange}
          placeholder="Enter product name"
        />
      </div>

      <div className="form-group">
        <label>Category:</label>
        <select
          name="category"
          value={productDetails.category}
          onChange={handleInputChange}
        >
          <option value="">-- Select Category --</option>
          <option value="womens">Womens</option>
          <option value="mens">Mens</option>
          <option value="kids">Kids</option>
        </select>
      </div>

      <div className="form-group">
        <label>Old Price (₹):</label>
        <input
          type="number"
          name="old_price"
          value={productDetails.old_price}
          onChange={handleInputChange}
          placeholder="Enter old price"
        />
      </div>

      <div className="form-group">
        <label>New Price (₹):</label>
        <input
          type="number"
          name="new_price"
          value={productDetails.new_price}
          onChange={handleInputChange}
          placeholder="Enter new price"
        />
      </div>

      <div className="form-group">
        <label>Upload Product Image:</label>
        <input type="file" onChange={handleImageUpload} />
        {productDetails.image && (
          <img
            src={productDetails.image}
            alt="Preview"
            style={{ marginTop: "10px", width: "100px", borderRadius: "5px" }}
          />
        )}
      </div>

      <button onClick={handleAddProduct}>➕ Add Product</button>
    </div>
  );
};

export default AddProduct;
