import { useState } from "react";
import api from "../services/api";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addProduct(product);
      alert("Product added successfully");
      setProduct({ name: "", price: "", stock: "" });
      navigate("/products");
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activeItem="addProduct" />
      <div className="main-content">
        <div className="page-header">
          <h1 className="page-title">Add Product</h1>
        </div>
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg  text-gray-700 font-bold">
              Add New Product
            </h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={product.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Price *</label>
                <input
                  type="number"
                  name="price"
                  className="form-input"
                  value={product.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Stock Quantity *</label>
                <input
                  type="number"
                  name="stock"
                  className="form-input"
                  value={product.stock}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>
              <div style={{ marginTop: "2.5rem" }}>
                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setProduct({ name: "", price: "", stock: "" });
                    navigate("/products");
                  }}
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
