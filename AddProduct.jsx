import React, { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_products, setAll_products] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Fetched products from backend:", data);
        if (Array.isArray(data) && data.length > 0) {
          setAll_products(data);

          const defaultCart = {};
          data.forEach(product => {
            defaultCart[product.id] = 0;
          });
          setCartItems(defaultCart);
        } else {
          console.warn("⚠️ Backend returned empty or invalid data");
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching products from backend:", err);
      });
  }, []);

  const addToCart = (itemID) => {
    setCartItems((prev) => ({
      ...prev,
      [itemID]: prev[itemID] + 1,
    }));
  };

  const removeFromCart = (itemID) => {
    setCartItems((prev) => ({
      ...prev,
      [itemID]: prev[itemID] - 1,
    }));
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (let item in cartItems) {
      if (cartItems[item] > 0) {
        const product = all_products.find(p => p.id === Number(item));
        if (product) {
          total += product.new_price * cartItems[item];
        }
      }
    }
    return total;
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);
  };

  const contextValue = {
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
