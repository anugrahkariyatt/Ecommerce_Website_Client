import React from "react";
import { useCart } from "../context/CartContext";
import Cards from "../components/Cards";

const WishList = () => {
  const { wishlist } = useCart();
  return (
    <div className="vh-100 d-flex flex-column gap-3 align-items-center p-4">
      <Cards products={wishlist} />
    </div>
  );
};

export default WishList;
