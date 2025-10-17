import { useState } from "react";
import api from "../services/api.js";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProductForm = () => {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    category_id: "",
    description: "",
    price: "",
    stock: "",
    barcode: "",
    imageUrl: "",
  });

  const [categories, setCategories] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const data = await api.getAllCategories();
    setCategories(data);
  };

  // const handleSubmit = async () => {
  //   if (!formData.name || !formData.price || !formData.stock) {
  //     alert(
  //       "Please fill in all required fields (Product Name, Price, Stock Quantity)"
  //     );
  //     return;
  //   }

  //   if (parseFloat(formData.price) <= 0) {
  //     alert("Price must be greater than 0");
  //     return;
  //   }

  //   if (parseInt(formData.stock) < 0) {
  //     alert("Stock quantity cannot be negative");
  //     return;
  //   }

  //   try {
  //     // Convert data types before sending
  //     const productData = {
  //       name: formData.name,
  //       description: formData.description,
  //       price: parseFloat(formData.price),
  //       stock: parseInt(formData.stock),
  //       barcode: formData.barcode || null,
  //       imageUrl: formData.imageUrl || null,
  //       ...(formData.category_id && {
  //         category_id: parseInt(formData.category_id),
  //       }),
  //     };

  //     console.log("Sending product data:", productData);
  //     const data = await api.addProduct(productData);
  //     console.log("Response:", data);

  //     alert("Product saved successfully!");
  //     setFormData({
  //       name: "",
  //       category_id: "",
  //       description: "",
  //       price: "",
  //       stock: "",
  //       barcode: "",
  //     });
  //   } catch (error) {
  //     console.error("Error creating product:", error);
  //     alert("Error creating product: " + error.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!productData.name || !productData.price || !productData.stock) {
      alert("Please fill in all required fields (Product Name, Price, Stock)");
      return;
    }

    if (parseFloat(productData.price) <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    if (parseInt(productData.stock) < 0) {
      alert("Stock quantity cannot be negative");
      return;
    }

    try {
      if (imageFile) {
        // Use FormData for file upload
        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("price", parseFloat(productData.price));
        formData.append("stock", parseInt(productData.stock));
        formData.append("description", productData.description || "");
        formData.append("barcode", productData.barcode || "");
        if (productData.category_id) {
          formData.append("category_id", parseInt(productData.category_id));
        }
        formData.append("image", imageFile); // Changed from "imageUrl" to "image"

        await api.addProduct(formData);
      } else {
        // Use regular JSON for products without images
        const jsonData = {
          name: productData.name,
          price: parseFloat(productData.price),
          stock: parseInt(productData.stock),
          description: productData.description || null,
          barcode: productData.barcode || null,
          ...(productData.category_id && {
            category_id: parseInt(productData.category_id),
          }),
        };

        await api.addProduct(jsonData);
      }

      alert("Product added successfully!");
      // Reset form
      setProductData({
        name: "",
        category_id: "",
        description: "",
        price: "",
        stock: "",
        barcode: "",
        imageUrl: "",
      });
      setImageFile(null);
      setPreviewUrl("");
      // navigate('/products');
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Failed to add product: " + error.message);
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
                  value={productData.name}
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
                  value={productData.category_id}
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
                  value={productData.price}
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
                  value={productData.description}
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
                      value={productData.stock}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>
                  {/* image */}
                  <div className="form-group">
                    <label className="form-label">Product Image</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="form-input"
                    />
                  </div>
                  <div>
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                  {/* barcode */}
                  <div className="form-group">
                    <label className="form-label">Barcode</label>
                    <input
                      type="text"
                      name="barcode"
                      className="form-input"
                      value={productData.barcode}
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
                  setProductData({ name: "", price: "", stock: "" });
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
