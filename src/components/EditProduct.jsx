import React, { useState } from "react";

const EditProduct = ({ onClose, onUpdate, product }) => {
  const [form, setForm] = useState({
    title: product.title,
    price: product.price,
    category: product.category,
    image: product.image,
    description: product.description,
  });

  return (
    <aside
      className=" sidebar-theme shadow-lg p-4 position-fixed top-0 end-0 vh-100"
      style={{ width: "350px", zIndex: 1050 }}
    >
      <div className="d-flex justify-content-between mb-3">
        <h4>Edit Product</h4>

        <button
          className="btn-close"
          onClick={onClose}
        ></button>
      </div>

      <div className="d-flex flex-column gap-2">
        <input
          type="text"
          className="form-control"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          type="number"
          className="form-control"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          type="text"
          className="form-control"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <input
          type="text"
          className="form-control"
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <textarea
          rows="3"
          className="form-control"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <button
          className="btn btn-success mt-3"
          onClick={() => onUpdate(product.id, form)}
        >
          Update Product
        </button>
      </div>
    </aside>
  );
};

export default EditProduct;