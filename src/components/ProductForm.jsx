import { useState } from "react";
import api from "../services/api.js";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    description: "",
    price: "",
    stock: "",
    barcode: "",
    imageUrl: "",
  });

  const [categories, setCategories] = useState([]);
  console.log("foemDat", formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const data = await api.getAllCategories();
    setCategories(data);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.stock) {
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

    try {
      // Convert data types before sending
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        barcode: formData.barcode || null,
        imageUrl: formData.imageUrl || null,
        ...(formData.category_id && {
          category_id: parseInt(formData.category_id),
        }),
      };

      console.log("Sending product data:", productData);
      const data = await api.addProduct(productData);
      console.log("Response:", data);

      alert("Product saved successfully!");
      setFormData({
        name: "",
        category_id: "",
        description: "",
        price: "",
        stock: "",
        barcode: "",
        imageUrl: "",
      });
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error creating product: " + error.message);
    }
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
                  name="category_id"
                  className="form-input"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
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
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
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
