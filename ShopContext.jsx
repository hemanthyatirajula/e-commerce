import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [all_products, setAll_products] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then(res => res.json())
      .then(data => {

        console.log("✅ Fetched from backend:", data);
        setAll_products(data);

        // Cart initialization
        const defaultCart = {};
        data.forEach(product => {
          defaultCart[product.id] = 0;
        });
        setCartItems(defaultCart);
      })
      .catch(err => {
        console.error("❌ Fetch error:", err);
      });
  }, []);

  const addToCart = (itemID) => {
    setCartItems(prev => ({
      ...prev,
      [itemID]: (prev[itemID] || 0) + 1,
    }));
  };

  const removeFromCart = (itemID) => {
    setCartItems(prev => ({
      ...prev,
      [itemID]: Math.max((prev[itemID] || 0) - 1, 0),
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
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  return (
    <ShopContext.Provider value={{
      all_products,
      cartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      getTotalCartItems,
    }}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
