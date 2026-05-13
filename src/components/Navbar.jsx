import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { setIsCartPage } = useCart();

  const navigate = useNavigate();
  const { userRole, setRole } = useCart();
  console.log("userrole", userRole);

  const [isDark, setIsDark] = useState(() => {
    try {
      const d = localStorage.getItem("Darkmode");
      return d ? JSON.parse(d) : false;
    } catch (e) {
      return false;
    }
  });
  useEffect(() => {}, [userRole, setRole]);
  useEffect(() => {
    if (isDark) document.body.classList.add("dark");
    else document.body.classList.remove("dark");

    try {
      localStorage.setItem("Darkmode", JSON.stringify(isDark));
    } catch (e) {}
  }, [isDark]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand " href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          {" "}
          <ul className="navbar-nav gap-1">
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsDark((prev) => !prev)}
              >
                Dark
              </button>
            </li>
            {console.log("userRole", userRole)}
            {userRole === "user" ? (
              <>
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      navigate("/wishlist");
                      setIsCartPage("wishlist");
                    }}
                  >
                    <img src="/heart.svg" alt="" />
                  </button>
                </li>{" "}
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      navigate("/cart");
                      setIsCartPage("cart");
                    }}
                  >
                    <img src="/cart.svg" alt="" />
                  </button>
                </li>
              </>
            ) : null}
            <li className="nav-item">
              <Link
                to="/home"
                className="nav-link active"
                aria-current="page"
                href="#"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/about" className="nav-link" href="#">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link " aria-disabled="true">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <button
                onClick={() => {
                  localStorage.removeItem("credentials");
                  navigate("/");
                }}
                className="nav-link "
                aria-disabled="true"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
