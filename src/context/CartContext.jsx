import React, { useContext, createContext, useState, useEffect } from "react";
import { successToast } from "../utils/Toast ";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [isCart, setIsCart] = useState(null);

  const setRole = (user) => {
    setUserRole(user.role);
    console.log(">>>>>", user);
  };
  useEffect(() => {
    if (!userRole) {
      const user = JSON.parse(localStorage.getItem("credentials"));
      setRole(user);
    }
  }, [userRole]);
  const setIsCartPage = (c) => {
    setIsCart(c);
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    successToast("Add to Cart");
  };

  const removeItemFromCart = (id) => {
    const updateCart = cart.filter((item) => item.id !== id);
    // console.log(">>", updateCart);

    setCart(updateCart);
  };
  const removeItemFromWishlist = (id) => {
    const updateCart = wishlist.filter((item) => item.id !== id);
    // console.log(">>", updateCart);

    setWishlist(updateCart);
  };
  const addToWishlist = (product) => {
    setWishlist((prev) => [...prev, product]);
    successToast("Add to WishList");
  };
  //   console.log(cart);
  //   console.log(wishlist);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        addToWishlist,
        userRole,
        setRole,
        removeItemFromCart,
        setIsCartPage,
        removeItemFromWishlist,
        isCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for easy access
export const useCart = () => useContext(CartContext);
