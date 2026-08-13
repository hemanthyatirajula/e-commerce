// import React, { useContext, useState } from 'react'
// import './ProductDisplay.css'
// import { ShopContext } from '../Context/ShopContext';
// //import { useNavigate } from 'react-router-dom';


// export const ProductDisplay = (props) => {
//       const {product} =props;
//      const { addToCart ,handleBuyNow} =useContext(ShopContext);
//      const [selectedSize, setSelectedSize] = useState("");

  
//   return (
//     <div className="productdisplay">
//         <div className="productdisplay-left">
//            <div className="productdisplay-img-list">
//                <img src={product.image} alt=""/>
//                <img src={product.image} alt=""/>
//                <img src={product.image} alt=""/>
//                <img src={product.image} alt=""/>
//             </div>
//                <div className="productdisplay-img">
//                     <img className='product-display-main-img' src={product.image} alt=""/>
//                </div>
//         </div>


//          <div className="productdisplay-right">
//           <h1>{product.name}</h1>
//             <div className="item-rating">
//                <span className="rating-value">4.5</span>
//                 <span className="rating-stars">★ ★ ★ ★ ☆</span>
//                 <span className="rating-no">(109)</span>
//             </div>

//             <div className="product-display-right-prices">
//                 <div className="product-display-right-oldprice">₹{product.old_price}</div>
//                 <div className="product-display-right-newprice">₹{product.new_price}</div>
//             </div>

//             <div className="productdisplay-right-discription">
//                 Crafted with soft cotton and a flattering fit, this piece is a wardrobe essential for both casual and chic looks From brunch dates to late-night strolls, this outfit makes a statement wherever you goElevate your everyday style with this trendy and breathable design — perfect for all-day comfort and confident vibes
//                 "Lightweight, durable, and made to move — these sneakers deliver performance with a modern edge.
//             </div>
//             <div className="productdispaly-right-size">
//                 <h1>Select Size</h1>
//                     <div className="productdisplay-right-size">
//                         {["S","M","L","XL","XXL"].map((size)=>(
//                     <div
//                             key={size}
//                             className={selectedSize===size ? "selected-size" : ""}
//                             onClick={()=>setSelectedSize(size)}
//                         >
//                         {size}
//                     </div>
//                     ))}
//                 </div>
//             </div>
//         <button
//             onClick={()=>{
//                 if(!selectedSize){
//                 alert("Please select a size");
//                 return;
//                  }

//                 addToCart(product.id, selectedSize);
//             }}
//                 >
//             ADD TO CART
//         </button>
//         <button
//             className='buynow-btn'
//             onClick={()=>{
//                 if(!selectedSize){
//                 alert("Please select a size");
//             return;
//             }

//         handleBuyNow(product.new_price, selectedSize);
//         }}
//         >
//             Buy Now
//         </button>
                
//             <p className='productdisplay-right-category'><span>Category:</span> Women,T-Shirt,Crop Top</p>
//             <p className='productdisplay-right-category'><span>Tags:</span> Modern,Latest,Trendy Collections</p>
              
//         </div>
//      </div>
//   )
// }
// export default ProductDisplay
import React, { useContext } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../Context/ShopContext';

export const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart, handleBuyNow } = useContext(ShopContext);

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>

        <div className="productdisplay-img">
          <img
            className="product-display-main-img"
            src={product.image}
            alt=""
          />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>

        <div className="item-rating">
          <span className="rating-value">4.5</span>
          <span className="rating-stars">★ ★ ★ ★ ☆</span>
          <span className="rating-no">(109)</span>
        </div>

        <div className="product-display-right-prices">
          <div className="product-display-right-oldprice">
            ₹{product.old_price}
          </div>
          <div className="product-display-right-newprice">
            ₹{product.new_price}
          </div>
        </div>

        <div className="productdisplay-right-discription">
          Crafted with soft cotton and a flattering fit, this piece is a
          wardrobe essential for both casual and chic looks. From brunch dates
          to late-night strolls, this outfit makes a statement wherever you go.
          Elevate your everyday style with this trendy and breathable design —
          perfect for all-day comfort and confident vibes. Lightweight,
          durable, and made to move — these sneakers deliver performance with a
          modern edge.
        </div>

        <div className="productdispaly-right-size">
          <h1>Select Size</h1>

          <div className="productdisplay-right-size">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>

        <button onClick={() => addToCart(product.id)}>
          ADD TO CART
        </button>

        <button
          className="buynow-btn"
          onClick={() => handleBuyNow(product.new_price)}
        >
          Buy Now
        </button>

        <p className="productdisplay-right-category">
          <span>Category:</span> Women, T-Shirt, Crop Top
        </p>

        <p className="productdisplay-right-category">
          <span>Tags:</span> Modern, Latest, Trendy Collections
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;