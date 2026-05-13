import { useEffect, useState } from "react";
import { Link, useFetcher, useNavigate } from "react-router-dom";
import axios from "axios";
import AddProduct from "../components/AddProduct";
import EditProduct from "../components/EditProduct";
import { errorToast, successToast } from "../utils/Toast ";
import Card from "../components/Card";
import { useCart } from "../context/CartContext";

const Hero = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const user = JSON.parse(localStorage.getItem("credentials"));
  const { userRole, setRole } = useCart();

  //fetch all product when the screen load
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // add a new product
  const addProduct = (formData) => {
    axios
      .post("https://fakestoreapi.com/products", formData)
      .then((res) => {
        setProducts([...products, res.data]);
        setShowAddForm(false);
        successToast("Added new product");
      })
      .catch(() => errorToast("Failed to add new product "));
  };

  //update a product by id

  const updateProduct = (id, formData) => {
    axios
      .put(`https://fakestoreapi.com/products/${id}`, formData)
      .then((res) => {
        setProducts(products.map((item) => (item.id === id ? res.data : item)));
        setShowEditForm(false);
        successToast("Updated the product");
      })
      .catch(() => errorToast("Failed to update "));
  };
  //delete product by id
  const deleteProuct = (id) => {
    axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProducts(products.filter((item) => item.id !== response.data.id));
        //toast message
        successToast("Deleted the product");
      })
      .catch(() => {
        errorToast("Failed to delete ");
      });
  };

  const handleDeleteClick = (item) => {
    setProductToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!productToDelete) {
      return;
    }

    deleteProuct(productToDelete.id);
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    setRole(user);
    // console.log(">>>>>user role", role);
  }, [user]);

  // Loigc for pagination
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  return (
    <>
      <main className="position-relative">
        <div className="vh-100 d-flex flex-column gap-3 align-items-center p-4">
          <h2 className="mt-4">All Products</h2>
          {userRole === "admin" ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setShowAddForm(true);
              }}
            >
              Add Products
            </button>
          ) : null}
          <Card
            products={currentItems}
            role={userRole}
            onDelete={handleDeleteClick}
            onEdit={(item) => {
              setSelectedProduct(item);
              setShowEditForm(true);
            }}
            addToWishList={(item) => setWishlist(item)}
            addToCart={(item) =>
              setCart(item).then(successToast("Added to Cart"))
            }
          />
          <nav className="mt-5">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                >
                  Previous
                </button>
              </li>

              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                >
                  <button
                    onClick={() => paginate(index + 1)}
                    className="page-link"
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {showAddForm && (
          <AddProduct
            onClose={() => setShowAddForm(false)}
            onAdd={addProduct}
          />
        )}

        {showEditForm && selectedProduct && (
          <EditProduct
            product={selectedProduct}
            onClose={() => setShowEditForm(false)}
            onUpdate={updateProduct}
          />
        )}
      </main>
      {showDeleteModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete product</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setProductToDelete(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this product?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setProductToDelete(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
