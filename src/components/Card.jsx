import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Card = ({ products, role, onDelete, onEdit }) => {
  const { addToCart, addToWishlist ,} = useCart();

  return (
    <div className="items-container row g-4 border-2 border-black w-100">
      {products.map((item) => (
        <div key={item.id} className=" col-12 col-sm-6 col-md-4 col-lg-3 ">
          {/* Card */}
          <div className="card h-100 d-flex flex-column p-3">
            {/* content */}
            <div className="d-flex flex-column gap-2">
              <h6
                className="text-center text-truncate"
                style={{ height: "40px", overflow: "hidden" }}
              >
                {item.title}
              </h6>{" "}
              <div
                style={{ height: "180px" }}
                className="img-container mx-auto"
              >
                <img
                  className="w-100 h-100 object-fit-contain"
                  src={item.image}
                  alt=""
                />
              </div>
              <p className="small text-muted text-truncate">
                {item.description}
              </p>
              <p className="text-success text-center">₹{item.price}</p>
            </div>
            {/* actions */}
            <div className="mt-auto">
              <Link
                to={`/product/${item.id}`}
                type="button"
                className="btn w-100 btn-primary mb-2"
              >
                View Product
              </Link>
              {role === "admin" ? (
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    onClick={() => onDelete(item)}
                    className="btn w-50 btn-danger"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onEdit(item)}
                    type="button"
                    className="btn w-50 btn-success"
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <div className="d-flex gap-2">
                  <button
                    onClick={() => addToWishlist(item)}
                    type="button"
                    className="btn w-50 btn-danger"
                  >
                    Wishlist
                  </button>
                  <button
                    onClick={() => addToCart(item)}
                    type="button"
                    className="btn w-50 btn-success"
                  >
                    Add to cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
