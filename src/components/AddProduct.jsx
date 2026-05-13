import React, { useState } from "react";

const AddProduct = ({ onClose, onAdd, className = "" }) => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  return (
    <aside
      className={`sidebar-theme border-start shadow-lg p-4 position-fixed top-0 end-0 vh-100 ${className}`}
      style={{ width: "350px", zIndex: 1050 }}
    >
      <div className="d-flex align-items-center flex-column">
        <div className="d-flex justify-content-between w-100 mb-3">
          <h4>Add Product</h4>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>

        <div className="d-flex flex-column w-100 gap-2">
          <label className="fw-bold">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="form-control"
            placeholder="Product name"
          />

          <label className="fw-bold">Price</label>
          <input
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            value={form.price}
            name="price"
            type="number"
            className="form-control"
            placeholder="0.00"
          />

          <label className="fw-bold">Category</label>
          <input
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            value={form.category}
            name="category"
            type="text"
            className="form-control"
          />

          <label className="fw-bold">Image URL</label>
          <input
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            value={form.image}
            name="image"
            type="text"
            className="form-control"
          />

          <label className="fw-bold">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            name="description"
            className="form-control"
            rows="3"
          ></textarea>

          <button onClick={() => onAdd(form)} className="btn btn-success mt-3">
            Save Product
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AddProduct;
