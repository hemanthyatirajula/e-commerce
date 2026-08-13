
import React, { createContext,useState,useEffect} from 'react';
import axios from "axios";

const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

const [all_products, setAll_products] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
const [cartItems, setCartItems] = useState({});

useEffect(() => {
  fetch('https://e-commerce-backend-ten-khaki.vercel.app/allproducts')
    .then(res => res.json())
    .then(data => setAll_products(data));
}, []);

useEffect(() => {
  if (all_products.length > 0) {
    const defaultCart = {};
    all_products.forEach((product) => {
      defaultCart[product.id] = 0;
    });
    setCartItems(defaultCart);
  }
}, [all_products]);

  const addToCart = (itemID) => {
    setCartItems((prev) => ({
      ...prev,
      [itemID]: prev[itemID] + 1,
    }));
    console.log("Cart Items: ", cartItems);
  };

const handleBuyNow = (amount, user) => {
  const finalAmount = amount ? amount * 100 : getTotalCartAmount() * 100;

  const options = {
    key: "rzp_test_zVuqJSitPw1KU8",
    amount: finalAmount,
    currency: "INR",
    name: "The Curiosity Corner",
    description: "Payment For Your Order",
    handler: async function (response) {
      alert("✅ Payment Success! ID: " + response.razorpay_payment_id);

// const orderData = {
//   user: {
//     name: user?.name || "Test User",
//     email: user?.email || "test@example.com",
//     phone:user?.contact||"9999999999",
//   },
//   // // Add this 👇 dummy address if no real address is captured yet
//   // address: {
//   //   street: "Test Street",
//   //   city: "Hyderabad",
//   //   state: "Telangana",
//   //   pincode: "500001",
//   // },
//   items: all_products
//     .filter((product) => cartItems[product.id] > 0)
//     .map((product) => ({
//       id: product.id,
//       name: product.name,
//       price: product.new_price,
//       quantity: cartItems[product.id],
//     })),
//   totalAmount: getTotalCartAmount(),
//   shippingCharge: 40,
//   discountAmount: 0,
//   paymentMethod: "Online",
//   couponCode: "",
//   paymentId: response.razorpay_payment_id,
//   status: "Paid",
//   orderTime: new Date().toISOString(),
// };
const orderData = {
  user: {
    name: user?.name || "Test User",
    email: user?.email || "test@example.com",
    phone: user?.contact || "9999999999",
  },
  items: all_products
    .filter((product) => cartItems[product.id] > 0)
    .map((product) => ({
      id: product.id,
      name: product.name,         // productName
      price: product.new_price,   // new_price
      quantity: cartItems[product.id],
    })),
  totalAmount: getTotalCartAmount(), // price * quantity total
  paymentId: response.razorpay_payment_id,
  paymentMethod: "Online",
  status: "Success",
  orderTime: new Date().toLocaleString(),
  deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  isDelivered: false,
  deliveryTime: ""
};

      try {
        await axios.post("https://e-commerce-backend-ten-khaki.vercel.app/placeorder", orderData);
        alert("🧾 Order placed successfully!");
      } catch (err) {
        console.error("❌ Failed to save order:", err);
        alert("❌ Order failed to save.");
      }
    },
    prefill: {
      name: user?.name || "Test User",
      email: user?.email || "test@example.com",
       contact: user?.contact || "9999999999",
    },
    theme: {
      color: "#F37254",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};




  const removeFromCart = (itemID) => {
    setCartItems((prev) => ({
      ...prev,
      [itemID]: prev[itemID] - 1,
    }));
  };
   const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_products.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };
  const getTotalCartItems=()=>{
     let totalItem=0;
     for(const item in cartItems)
     {
      if(cartItems[item]>0)
      {
        totalItem+=cartItems[item];
      }
     }
     return totalItem;
  }


const filteredProducts = all_products.filter((product) =>
  product.name.toLowerCase().includes(searchQuery.toLowerCase())
);




const contextValue = {
  getTotalCartItems,
  getTotalCartAmount,
  all_products,
  filteredProducts,
  searchQuery,
  setSearchQuery,
  cartItems,
  addToCart,
  removeFromCart,
  handleBuyNow
};

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export { ShopContext }; // for useContext
export default ShopContextProvider; // to wrap in App.jsx