import { useState } from "react";
// import api from "../services/api";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    barcode: "",
    imageUrl: "",
  });

  const categories = ["Electronics", "Accessories", "Office", "Books"];
  console.log(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.productName || !formData.price || !formData.stock) {
      alert(
        "Please fill in all required fields (Product Name, Price, Stock Quantity)"
      );
      return;
    }

    if (parseFloat(formData.price) <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    if (parseInt(formData.stock) < 0) {
      alert("Stock quantity cannot be negative");
      return;
    }

    alert("Product saved successfully!");
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Add Product</h1>
      </div>
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg  text-gray-700 font-bold">Add New Product</h2>
        </div>
        <div className="card-body">
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1rem",
              }}
            >
              {/* product name */}
              <div className="form-group">
                <label className="form-label">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* product category */}
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  name="category"
                  className="form-input"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              {/* product price */}
              <div className="form-group">
                <label className="form-label">Price *</label>
                <input
                  type="number"
                  name="price"
                  className="form-input"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              {/* product description */}
              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea
                  type="text"
                  name="description"
                  rows="6"
                  className="form-input"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  {/* Stock */}
                  <div className="form-group">
                    <label className="form-label">Stock *</label>
                    <input
                      type="number"
                      name="stock"
                      className="form-input"
                      value={formData.stock}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>
                  {/* image */}
                  <div className="form-group">
                    <label className="form-label">Product Image</label>
                    <input
                      type="text"
                      name="image"
                      value={formData.imageUrl}
                      className="form-input"
                    />
                  </div>
                  {/* barcode */}
                  <div className="form-group">
                    <label className="form-label">Barcode</label>
                    <input
                      type="text"
                      name="barcode"
                      className="form-input"
                      value={formData.barcode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Add Product
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setFormData({ name: "", price: "", stock: "" });
                  navigate("/products");
                }}
              >
                Clear Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
