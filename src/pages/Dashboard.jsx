import {
  Plus,
  Minus,
  TrendingUp,
  TrendingDown,
  Package,
  DollarSign,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import api from "../services/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [stockHistory, setStockHistory] = useState([]);

  console.log("stockhis:", stockHistory);

  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
    reason: "",
  });
  // console.log("formData:", formData);
  // console.log("stockHis:", stockHistory);

  const [showAddStock, setShowAddStock] = useState(false);
  const [showBulkSale, setShowBulkSale] = useState(false);

  const [bulkSaleItems, setBulkSaleItems] = useState([]);
  const [bulkAddStockItems, setBulkAddStockItems] = useState([]);
  const [bulkSaleReason, setBulkSaleReason] = useState("");
  const [bulkAddStockReason, setBulkAddStockReason] = useState("");
  const [error, setError] = useState("");

  // console.log("bulkAddStockItems", bulkAddStockItems);
  // console.log("bulkSaleItems", bulkSaleItems);

  const bulkSaleTotal = bulkSaleItems.reduce(
    (sum, item) => sum + item.total,
    0
  );
  const bulkAddStockTotal = bulkAddStockItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

  // const stats = {
  //   totalStockIn: 50,
  //   totalStockOut: 30,
  //   totalRevenue: 3049.92,
  // };

  const [stats, setStats] = useState(0);
  console.log("stats", stats);

  const handleAddToBulkSale = () => {
    if (!formData.productId || !formData.quantity) {
      alert("Please select a product and enter quantity.");
      return;
    }

    const product = products.find((p) => p.id === parseInt(formData.productId));
    const quantity = parseInt(formData.quantity);

    if (quantity > product.stock) {
      alert(`Insufficient stock! Available: ${product.stock} units.`);
      return;
    }

    const existingItem = bulkSaleItems.find(
      (item) => item.productId === product.id
    );

    if (existingItem) {
      const updatedItems = bulkSaleItems.map((item) =>
        item.productId === product.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
              total: (item.quantity + quantity) * item.price,
            }
          : item
      );
      setBulkSaleItems(updatedItems);
    } else {
      setBulkSaleItems([
        ...bulkSaleItems,
        {
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: quantity,
          total: quantity * product.price,
        },
      ]);
    }
    setFormData({ ...formData, productId: "", quantity: "" });
    setShowAddStock(false);
  };
  const handleAddToBulkStock = () => {
    if (!formData.productId || !formData.quantity) {
      alert("Please select a product and enter quantity.");
      return;
    }

    const product = products.find((p) => p.id === parseInt(formData.productId));
    const quantity = parseInt(formData.quantity);

    const existingItem = bulkAddStockItems.find(
      (item) => item.productId === product.id
    );

    if (existingItem) {
      const updatedItems = bulkAddStockItems.map((item) =>
        item.productId === product.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
              total: (item.quantity + quantity) * item.price,
            }
          : item
      );
      setBulkAddStockItems(updatedItems);
    } else {
      setBulkAddStockItems([
        ...bulkAddStockItems,
        {
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: quantity,
          total: quantity * product.price,
        },
      ]);
    }
    setFormData({ ...formData, productId: "", quantity: "" });
    setShowBulkSale(false);
  };

  const handleRemoveFromBulkSale = (productId) => {
    setBulkSaleItems(
      bulkSaleItems.filter((item) => item.productId !== productId)
    );
  };
  const handleRemoveFromBulkAddStock = (productId) => {
    setBulkAddStockItems(
      bulkAddStockItems.filter((item) => item.productId !== productId)
    );
  };

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchStats = async () => {
      try {
        const data = await api.getStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    const fetchMovementHistory = async () => {
      try {
        const data = await api.getProductMovements();
        setStockHistory(data);
      } catch (error) {
        console.error("Error fetching movement history", error);
      }
    };
    fetchStats();
    fetchMovementHistory();
    fetchProducts();
  }, [refreshTrigger]); // Runs when refreshTrigger changes

  // Modify handleCompleteAddStock to trigger a refresh
  const handleCompleteAddStock = async () => {
    if (bulkAddStockItems.length === 0) {
      alert("Please add items to the stock.");
      return;
    }
    if (!bulkAddStockReason) {
      alert("Please enter a reason for the stock addition");
      return;
    }
    const invoiceNumber = `INV${Date.now()}`;

    for (const item of bulkAddStockItems) {
      const product = products.find((p) => p.id === item.productId);
      const currentBalance = product.stock + item.quantity;

      // const newEntry = {
      //   id: stockHistory.length + bulkAddStockItems.indexOf(item) + 1,
      //   date: new Date().toISOString().split("T")[0],
      //   product: item.productName,
      //   type: "IN",
      //   quantity: item.quantity,
      //   reason: `Bulk Add stock - ${bulkAddStockReason} - ${invoiceNumber}`,
      //   price: item.price,
      //   balance: Math.max(0, currentBalance),
      // };
      const transactionData = {
        product_id: item.productId,
        quantity_change: +item.quantity,
        reason: `Bulk Add stock - ${bulkAddStockReason} - ${invoiceNumber}`,
        type: "IN",
        balance: Math.max(0, currentBalance),
      };
      console.log("transactionData", transactionData);
      try {
        await api.addTransaction(transactionData);
        alert("Stock movement recorded successfully!");
        // navigate(`/products/${item.productId}`);
      } catch (error) {
        setError("Failed to record stock movement.");
        console.error(error);
      }

      // setStockHistory((prev) => [newEntry, ...prev]);
    }

    // Refresh products after all transactions
    setRefreshTrigger((prev) => prev + 1);

    setBulkAddStockItems([]);
    setBulkAddStockReason("");
    setShowAddStock(false);
  };

  const handleCompleteBulkSale = async () => {
    if (bulkSaleItems.length === 0) {
      alert("Please add items to the sale.");
      return;
    }
    if (!bulkSaleReason) {
      alert("Please enter a reason for the sale");
      return;
    }
    const invoiceNumber = `INV${Date.now()}`;

    for (const item of bulkSaleItems) {
      const product = products.find((p) => p.id === item.productId);
      const currentBalance = product.stock - item.quantity;

      // const newEntry = {
      //   id: stockHistory.length + bulkSaleItems.indexOf(item) + 1,
      //   date: new Date().toISOString().split("T")[0],
      //   product: item.productName,
      //   type: "OUT",
      //   quantity: item.quantity,
      //   reason: `Bulk Sale - ${bulkSaleReason} - ${invoiceNumber}`,
      //   price: item.price,
      //   balance: Math.max(0, currentBalance),
      // };

      const transactionData = {
        product_id: item.productId,
        quantity_change: -item.quantity,
        type: "OUT",
        reason: `Bulk Sale - ${bulkSaleReason} - ${invoiceNumber}`,
        balance: Math.max(0, currentBalance),
      };
      console.log("transactionData", transactionData);
      try {
        await api.addTransaction(transactionData);
        alert("Stock movement recorded successfully!");
        // navigate(`/products/${item.productId}`);
      } catch (error) {
        setError("Failed to record stock movement.");
        console.error(error);
      }

      // setStockHistory((prev) => [newEntry, ...prev]);

      // Refresh products after all transactions
      setRefreshTrigger((prev) => prev + 1);
      // alert("Bulk sale completed!");
      setBulkSaleItems([]);
      setBulkSaleReason("");
      setShowBulkSale(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Sales & Stock Management</h1>
          <p style={{ color: "#64748b", marginTop: "0.5rem" }}>
            Track inventory movements and sales transactions
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            className="btn btn-success"
            onClick={() => {
              setShowAddStock(!showAddStock);
              setShowBulkSale(false);
            }}
          >
            <TrendingUp size={20} />
            <span className="font-semibold"> Add Stock</span>
          </button>
          <button
            className="btn btn-warn"
            onClick={() => {
              setShowBulkSale(!showBulkSale);
              setShowAddStock(false);
            }}
          >
            <TrendingDown size={20} />
            <span className="font-semibold"> Stock OUT</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {/* Card 1 */}
        <div className="stat-card" style={{ borderLeft: "4px solid #10b981" }}>
          <div className="stat-card-content">
            <div>
              <div className="stat-label">Total Products</div>
              <div className="stat-value">{stats.totalProducts || 0}</div>
            </div>
            <div
              style={{
                background: "#d1fae5",
                padding: "0.75rem",
                borderRadius: "8px",
              }}
            >
              <TrendingUp style={{ color: "#10b981" }} size={32} />
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="stat-card" style={{ borderLeft: "4px solid #ef4444" }}>
          <div className="stat-card-content">
            <div>
              <div className="stat-label">Low Stock Items</div>
              <div className="stat-value">{stats.lowStockItems || 0}</div>
            </div>
            <div
              style={{
                background: "#fee2e2",
                padding: "0.75rem",
                borderRadius: "8px",
              }}
            >
              <TrendingDown style={{ color: "#ef4444" }} size={32} />
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="stat-card" style={{ borderLeft: "4px solid #3b82f6" }}>
          <div className="stat-card-content">
            <div>
              <div className="stat-label">Total Revenue</div>
              <div className="stat-value">${stats.totalValue || 0}</div>
            </div>
            <div
              style={{
                background: "#dbeafe",
                padding: "0.75rem",
                borderRadius: "8px",
              }}
            >
              <DollarSign style={{ color: "#3b82f6" }} size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Sale Form */}
      {showBulkSale && (
        <div className="form-sale-stock-container">
          <div className="form-sale-stock-header">
            <h2>Bulk Stock OUT</h2>
          </div>
          {/* content */}
          <div style={{ padding: "2rem" }}>
            {/* Add items section */}
            <div
              className="add-items-container"
              style={{ marginBottom: "2rem" }}
            >
              <h3>Add Items to Out</h3>

              <div className="add-items-form">
                <div>
                  <label className="form-label">Product</label>
                  <select
                    value={formData.productId}
                    onChange={(e) =>
                      setFormData({ ...formData, productId: e.target.value })
                    }
                    className="form-input"
                  >
                    <option value="">Select a product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} (Stock: {product.stock})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    className="form-input"
                    style={{ padding: "0.61rem" }}
                    placeholder="Qty"
                  />
                </div>

                <button
                  onClick={handleAddToBulkSale}
                  className="btn btn-primary"
                >
                  <Plus size={18} />
                  Add Item
                </button>
              </div>
            </div>
            {/* Items List */}
            {bulkSaleItems.length > 0 && (
              <div style={{ marginBottom: "2rem" }}>
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#0f172a",
                    marginBottom: "1rem",
                  }}
                >
                  Items in Sale
                </h3>
                <div
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <table className="table" style={{ marginTop: 0 }}>
                    <thead style={{ background: "#f8fafc" }}>
                      <tr>
                        <th
                          style={{
                            padding: "0.75rem",
                            textAlign: "left",
                          }}
                        >
                          Product
                        </th>
                        <th
                          style={{
                            padding: "0.75rem",
                            textAlign: "right",
                          }}
                        >
                          Price
                        </th>
                        <th
                          style={{
                            padding: "0.75rem",
                            textAlign: "right",
                          }}
                        >
                          Quantity
                        </th>
                        <th
                          style={{
                            padding: "0.75rem",
                            textAlign: "right",
                          }}
                        >
                          Total
                        </th>
                        <th
                          style={{
                            padding: "0.75rem",
                            textAlign: "center",
                          }}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulkSaleItems.map((item) => (
                        <tr
                          key={item.productId}
                          style={{ borderTop: "1px solid #e2e8f0" }}
                        >
                          <td
                            style={{
                              padding: "0.75rem",
                              fontWeight: "500",
                              textAlign: "left",
                            }}
                          >
                            {item.productName}
                          </td>
                          <td
                            style={{
                              padding: "0.75rem",
                              textAlign: "right",
                              color: "#64748b",
                            }}
                          >
                            ${item?.price}
                          </td>
                          <td
                            style={{
                              padding: "0.75rem",
                              textAlign: "right",
                              fontWeight: "600",
                            }}
                          >
                            {item.quantity}
                          </td>
                          <td
                            style={{
                              padding: "0.75rem",
                              textAlign: "right",
                              fontWeight: "600",
                            }}
                          >
                            ${item?.total?.toFixed(2)}
                          </td>
                          <td
                            style={{
                              padding: "0.75rem",
                              textAlign: "center",
                            }}
                          >
                            <button
                              onClick={() =>
                                handleRemoveFromBulkSale(item.productId)
                              }
                              style={{
                                background: "transparent",
                                border: "none",
                                color: "#ef4444",
                                cursor: "pointer",
                                padding: "0.25rem",
                              }}
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr
                        style={{
                          background: "#f8fafc",
                          borderTop: "2px solid #e2e8f0",
                        }}
                      >
                        <td
                          colSpan="3"
                          style={{
                            padding: "0.75rem",
                            fontWeight: "600",
                            textAlign: "right",
                          }}
                        >
                          Total:
                        </td>
                        <td
                          style={{
                            padding: "0.75rem",
                            textAlign: "right",
                            fontWeight: "700",
                            fontSize: "1.125rem",
                            color: "#10b981",
                          }}
                        >
                          ${bulkSaleTotal.toFixed(2)}
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* Invoice/Reason */}
            <div style={{ marginBottom: "1rem" }}>
              <label className="form-label">Invoice / Reason</label>
              <input
                type="text"
                value={bulkSaleReason}
                onChange={(e) => setBulkSaleReason(e.target.value)}
                className="form-input"
                placeholder="e.g., Invoice #1234, Customer Order"
              />
            </div>
            {/* Action Buttons */}
            <div className="bulk-sale-form-actions">
              <button
                onClick={handleCompleteBulkSale}
                className="btn btn-success"
              >
                Complete Sale
              </button>
              <button
                onClick={() => {
                  setShowBulkSale(false);
                  setBulkSaleItems([]);
                  setBulkSaleReason("");
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/*  add stock movement form */}
      {showAddStock && (
        <div className="form-sale-stock-container">
          <div className="form-sale-stock-header">
            <h2>Bulk Stock IN</h2>
          </div>
          {/* content */}
          <div style={{ padding: "2rem" }}>
            {/* Add items section */}
            <div
              className="add-items-container"
              style={{ marginBottom: "2rem" }}
            >
              <h3>Add Items to Stock</h3>

              <div className="add-items-form">
                <div>
                  <label className="form-label">Product</label>
                  <select
                    value={formData.productId}
                    onChange={(e) =>
                      setFormData({ ...formData, productId: e.target.value })
                    }
                    className="form-input"
                  >
                    <option value="">Select a product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} (Stock: {product.stock})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    className="form-input"
                    style={{ padding: "0.61rem" }}
                    placeholder="Qty"
                  />
                </div>

                <button
                  onClick={handleAddToBulkStock}
                  className="btn btn-primary"
                >
                  <Plus size={18} />
                  Add Item
                </button>
              </div>
            </div>
            {/* Items List */}
            {bulkAddStockItems.length > 0 && (
              <div style={{ marginBottom: "2rem" }}>
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#0f172a",
                    marginBottom: "1rem",
                  }}
                >
                  Items in stock
                </h3>
                <div
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <table className="table" style={{ marginTop: 0 }}>
                    <thead style={{ background: "#f8fafc" }}>
                      <tr>
                        <th
                          style={{
                            padding: "0.75rem",
                            textAlign: "left",
                          }}
                        >
                          Product
                        </th>
                        <th
                          style={{
                            padding: "0.75rem",
                            textAlign: "right",
                          }}
                        >
                          Price
                        </th>
                        <th
                          style={{
                            padding: "0.75rem",
                            textAlign: "right",
                          }}
                        >
                          Quantity
                        </th>
                        <th
                          style={{
                            padding: "0.75rem",
                            textAlign: "right",
                          }}
                        >
                          Total
                        </th>
                        <th
                          style={{
                            padding: "0.75rem",
                            textAlign: "center",
                          }}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulkAddStockItems.map((item) => (
                        <tr
                          key={item.productId}
                          style={{ borderTop: "1px solid #e2e8f0" }}
                        >
                          <td
                            style={{
                              padding: "0.75rem",
                              fontWeight: "500",
                              textAlign: "left",
                            }}
                          >
                            {item.productName}
                          </td>
                          <td
                            style={{
                              padding: "0.75rem",
                              textAlign: "right",
                              color: "#64748b",
                            }}
                          >
                            ${item?.price}
                          </td>
                          <td
                            style={{
                              padding: "0.75rem",
                              textAlign: "right",
                              fontWeight: "600",
                            }}
                          >
                            {item.quantity}
                          </td>
                          <td
                            style={{
                              padding: "0.75rem",
                              textAlign: "right",
                              fontWeight: "600",
                            }}
                          >
                            ${item.total?.toFixed(2)}
                          </td>
                          <td
                            style={{
                              padding: "0.75rem",
                              textAlign: "center",
                            }}
                          >
                            <button
                              onClick={() =>
                                handleRemoveFromBulkAddStock(item.productId)
                              }
                              style={{
                                background: "transparent",
                                border: "none",
                                color: "#ef4444",
                                cursor: "pointer",
                                padding: "0.25rem",
                              }}
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr
                        style={{
                          background: "#f8fafc",
                          borderTop: "2px solid #e2e8f0",
                        }}
                      >
                        <td
                          colSpan="3"
                          style={{
                            padding: "0.75rem",
                            fontWeight: "600",
                            textAlign: "right",
                          }}
                        >
                          Total:
                        </td>
                        <td
                          style={{
                            padding: "0.75rem",
                            textAlign: "right",
                            fontWeight: "700",
                            fontSize: "1.125rem",
                            color: "#10b981",
                          }}
                        >
                          ${bulkAddStockTotal.toFixed(2)}
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* Invoice/Reason */}
            <div style={{ marginBottom: "1rem" }}>
              <label className="form-label">Invoice / Reason</label>
              <input
                type="text"
                value={bulkAddStockReason}
                onChange={(e) => setBulkAddStockReason(e.target.value)}
                className="form-input"
                placeholder="e.g., Invoice #1234, Customer Order"
              />
            </div>
            {/* Action Buttons */}
            <div className="bulk-sale-form-actions">
              <button
                onClick={handleCompleteAddStock}
                className="btn btn-success"
              >
                Complete Add Stock
              </button>
              <button
                onClick={() => {
                  setShowAddStock(false);
                  setBulkAddStockItems([]);
                  setBulkAddStockReason("");
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Stock History Table */}
      <div className="form-sale-stock-container">
        <div className="form-sale-stock-header">
          <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Package size={24} />
            Stock Movement History
          </h2>
        </div>
        <div
          style={{
            overflowX: "auto",
            maxWidth: "100%",
            width: "100%",
          }}
        >
          <table
            className="table"
            style={{
              marginTop: 0,
              width: "100%",
              tableLayout: "fixed",
            }}
          >
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                <th
                  style={{
                    textAlign: "left",
                    width: "10%",
                  }}
                >
                  Date
                </th>
                <th
                  style={{
                    textAlign: "left",
                    width: "15%",
                  }}
                >
                  Product
                </th>
                <th
                  style={{
                    textAlign: "left",
                    width: "8%",
                  }}
                >
                  Type
                </th>
                <th
                  style={{
                    textAlign: "left",
                    width: "8%",
                  }}
                >
                  Quantity
                </th>
                <th
                  style={{
                    textAlign: "right",
                    width: "10%",
                  }}
                >
                  Price
                </th>
                <th
                  style={{
                    textAlign: "right",
                    width: "12%",
                  }}
                >
                  Total Value
                </th>
                <th
                  style={{
                    textAlign: "center",
                    width: "25%",
                  }}
                >
                  Reason
                </th>
                <th
                  style={{
                    textAlign: "center",
                    width: "12%",
                  }}
                >
                  Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {stockHistory.map((entry) => (
                <tr
                  key={entry.id}
                  style={{ borderBottom: "1px solid #e2e8f0" }}
                >
                  <td style={{ padding: "1rem", textAlign: "left" }}>
                    {entry.created_at.toString().split("T")[0]}
                  </td>
                  <td
                    style={{
                      padding: "1rem",
                      fontWeight: "500",
                      textAlign: "left",
                    }}
                  >
                    {entry.product_name || "Unknown Product"}
                  </td>
                  <td style={{ padding: "1rem", textAlign: "left" }}>
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "50px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        background: entry.type === "IN" ? "#d1fae5" : "#fee2e2",
                        color: entry.type === "IN" ? "#065f46" : "#991b1b",
                      }}
                    >
                      {entry.type}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "1rem",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {entry.type === "IN" ? "+" : "-"}
                    {Math.abs(entry.quantity_change)}
                  </td>
                  <td style={{ padding: "1rem", color: "#64748b" }}>
                    ${entry?.product_price || 0}
                  </td>
                  <td style={{ padding: "1rem", fontWeight: "600" }}>
                    $
                    {(
                      Math.abs(entry.quantity_change) *
                      (entry.product_price || 0)
                    ).toFixed(2)}
                  </td>
                  <td
                    style={{
                      padding: "1rem",
                      color: "#64748b",
                      textAlign: "right",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {entry.reason}
                  </td>
                  <td
                    style={{
                      padding: "1rem",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {entry.balance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
