import React from "react";
import { useCart } from "../context/CartContext";
import Cards from "../components/Cards";

const Cart = () => {
  const { cart } = useCart();
  return (
    <div className="vh-100 d-flex flex-column gap-3 align-items-center p-4">
      <Cards products={cart} />
      
    </div>
  );
};

export default Cart;
