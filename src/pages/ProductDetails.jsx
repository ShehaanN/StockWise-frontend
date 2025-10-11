import { useParams, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Edit2,
  Trash2,
  TrendingUp,
  Package,
  DollarSign,
  Calendar,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = {
    id,
    name: "MacBook Pro 16-inch",
    sku: "SP-001",
    createdDate: "2023-10-01",
    category: "Electronics",
    description:
      " The MacBook Pro 16-inch is a high-performance laptop designed for professionals. It features a stunning Retina display, powerful M1 Pro or M1 Max chips, and an extended battery life, making it ideal for demanding tasks such as video editing, software development, and graphic design.",
    barcode: "123456789012",
    weight: "1.5 kg",
    dimensions: "25 x 15 x 2 cm",
    price: 2499.99,
    stock: 15,
    lowStockThreshold: 10,
    notes: "Check supplier for next shipment date.",
    totalSold: 150,
    revenue: 374998.5,
    lastSale: "2024-09-15",
  };

  const [notes, setNotes] = useState(
    "High-demand item. Consider increasing stock before holiday season."
  );
  const handleSaveNotes = () => {
    console.log("Saved notes:", notes);
    alert("Notes saved successfully!");
  };
  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar activeItem="products" />
      {/* Main Content */}
      <div className="main-content" style={{ padding: "2rem 4rem" }}>
        {/* Breadcrumb Navigation */}
        <nav style={{ marginBottom: "1rem" }}>
          <div
            style={{
              color: "#64748b",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <button
              onClick={() => navigate("/products")}
              style={{
                background: "transparent",
                border: "none",
                color: "#3b82f6",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                padding: 0,
                fontSize: "0.875rem",
              }}
            >
              <ArrowLeft size={16} />
              Products
            </button>
            <span>/</span>
            <span>{product.name}</span>
          </div>
        </nav>

        {/* Product Title with Metadata */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "2rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              marginBottom: "2rem",
              paddingBottom: "1rem",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#0f172a",
                margin: 0,
                marginBottom: "0.5rem",
              }}
            >
              {product.name}
            </h1>
            <p style={{ color: "#64748b", margin: 0 }}>
              SKU: {product.sku} | Created: {product.createdDate}
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              className="btn btn-outline"
              // onClick={handleEdit}
              style={{ padding: "0.5rem 1rem" }}
            >
              <Edit2 size={18} />
              {/* Edit Product */}
            </button>
            <button
              // onClick={handleDelete}
              className="btn btn-danger"
              style={{ padding: "0.5rem 1rem" }}
            >
              <Trash2 size={18} />
              {/* Delete */}
            </button>
          </div>
        </div>

        {/* main grid */}
        <div className="product-details-main-grid">
          {/* Left Column - Product Details  */}
          <div style={{ display: "grid", gap: "2rem" }}>
            {/* Product Overview */}
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
              }}
            >
              {/* title */}
              <div
                style={{
                  padding: "1.5rem",
                  background: "#f1f5f9",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  Product Overview
                </h2>
              </div>
              <div style={{ padding: "2rem" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "370px 1fr",
                    gap: "2rem",
                  }}
                >
                  {/* Product Image */}
                  <div>
                    <div
                      style={{
                        width: "350px",
                        height: "320px",
                        background: "#f1f5f9",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#64748b",
                        fontSize: "4rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <img
                        src="../../public/macbookpro.png"
                        alt={product.name}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          borderRadius: "12px",
                        }}
                      />
                    </div>
                  </div>

                  {/* Product Details-1 */}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1.5rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          fontWeight: "600",
                          color: "#374151",
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Category
                      </label>
                      <span
                        className="status-high"
                        style={{
                          padding: "0.25rem 0.75rem",
                          borderRadius: "50px",
                          fontSize: "0.875rem",
                          fontWeight: "600",
                        }}
                      >
                        {product.category}
                      </span>
                    </div>
                    <div>
                      <label
                        style={{
                          fontWeight: "600",
                          color: "#374151",
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Status
                      </label>
                      {product.stock === 0 ? (
                        <span
                          className="status"
                          style={{
                            background: "#fee2e2",
                            color: "#991b1b",
                          }}
                        >
                          Out of Stock
                        </span>
                      ) : product.stock < 10 ? (
                        <span className="status status-low">Low Stock</span>
                      ) : (
                        <span className="status status-medium">In Stock</span>
                      )}
                    </div>
                  </div>
                </div>
                {/* product details-2 */}
                <div style={{ marginTop: "1rem" }}>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label
                      style={{
                        fontWeight: "600",
                        color: "#374151",
                        display: "block",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Description
                    </label>
                    <p
                      style={{
                        color: "#64748b",
                        lineHeight: "1.6",
                        margin: 0,
                      }}
                    >
                      {product.description}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          fontWeight: "600",
                          color: "#374151",
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Barcode
                      </label>
                      <p
                        style={{
                          color: "#64748b",
                          fontFamily: "monospace",
                          margin: 0,
                        }}
                      >
                        {product.barcode}
                      </p>
                    </div>
                    <div>
                      <label
                        style={{
                          fontWeight: "600",
                          color: "#374151",
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Weight
                      </label>
                      <p style={{ color: "#64748b", margin: 0 }}>
                        {product.weight}
                      </p>
                    </div>
                    <div>
                      <label
                        style={{
                          fontWeight: "600",
                          color: "#374151",
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Dimensions
                      </label>
                      <p style={{ color: "#64748b", margin: 0 }}>
                        {product.dimensions}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Stock Management,Pricing, Product notes */}
          <div
            style={{ display: "grid", gap: "1.5rem", alignContent: "start" }}
          >
            {/* Price & Stock */}
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "1.5rem",
                  background: "#f1f5f9",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  Pricing & Stock
                </h3>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      fontWeight: "600",
                      color: "#374151",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Price
                  </label>
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "700",
                      color: "#0f172a",
                    }}
                  >
                    $
                    {product.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      fontWeight: "600",
                      color: "#374151",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Current Stock
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                      {product.stock} units
                    </span>
                    {product.stock === 0 ? (
                      <span
                        className="status"
                        style={{
                          background: "#fee2e2",
                          color: "#991b1b",
                        }}
                      >
                        Out of Stock
                      </span>
                    ) : product.stock < 10 ? (
                      <span className="status status-low">Low Stock</span>
                    ) : (
                      <span className="status status-medium">In Stock</span>
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      fontWeight: "600",
                      color: "#374151",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Low Stock Alert
                  </label>
                  <p style={{ color: "#64748b", margin: 0 }}>
                    Alert when below {product.lowStockThreshold} units
                  </p>
                </div>

                {product.stock < product.lowStockThreshold && (
                  <div
                    style={{
                      background: "#fef3c7",
                      border: "1px solid #fbbf24",
                      padding: "1rem",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span style={{ color: "#92400e" }}>⚠️</span>
                      <strong style={{ color: "#92400e" }}>
                        Low Stock Warning
                      </strong>
                    </div>
                    <p
                      style={{
                        color: "#92400e",
                        fontSize: "0.875rem",
                        margin: 0,
                      }}
                    >
                      This product is below the minimum threshold. Consider
                      restocking soon.
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* Sales Summary */}
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "1.5rem",
                  background: "#f1f5f9",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  Sales Summary
                </h3>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <div style={{ display: "grid", gap: "1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: "#64748b" }}>Total Sold</span>
                    <strong style={{ fontSize: "1.125rem" }}>
                      {product.totalSold} units
                    </strong>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: "#64748b" }}>Revenue Generated</span>
                    <strong style={{ color: "#10b981", fontSize: "1.125rem" }}>
                      $
                      {product.revenue.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </strong>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: "#64748b" }}>Last Sale</span>
                    <strong>{product.lastSale}</strong>
                  </div>
                </div>
              </div>
            </div>
            {/* Product Notes */}
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "1.5rem",
                  background: "#f1f5f9",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  Notes
                </h3>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    minHeight: "100px",
                    resize: "vertical",
                    fontFamily: "inherit",
                  }}
                  placeholder="Add notes about this product..."
                />
                <button
                  onClick={handleSaveNotes}
                  style={{
                    marginTop: "0.75rem",
                    width: "100%",
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
