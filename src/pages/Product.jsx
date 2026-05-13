import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data));

    console.log(">", product);
  }, [id]);
  if (!product)
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center p-3">
      <div
        className="card d-flex flex-column flex-md-row p-3 p-md-4 gap-3 gap-md-4 w-100"
        style={{ maxWidth: "900px" }}
      >
        <div
          className="mx-auto mx-md-0"
          style={{ width: "100%", maxWidth: "250px" }}
        >
          <img
            className="w-100 h-100 object-fit-contain"
            src={product.image}
            alt=""
          />
        </div>

        <div className="d-flex flex-column gap-2 flex-grow-1 text-center text-md-start">
          <h5 className="fw-semibold">{product.title}</h5>

          <h5 className="text-success">₹{product.price}</h5>

          <p className="text-muted small">{product.category}</p>

          <p style={{ maxHeight: "120px", overflowY: "auto" }}>
            {product.description}
          </p>

          <Link
            to="/home"
            className="btn btn-outline-primary mt-3 w-100 w-md-auto"
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
