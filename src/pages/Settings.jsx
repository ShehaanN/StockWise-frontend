import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Plus, Trash2, Edit2, Save } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [generalSettings, setGeneralSettings] = useState({
    businessName: "My Store",
    currency: "LKR",
    lowStockThreshold: 10,
  });
  const tabs = [
    { id: "general", label: "General" },
    { id: "categories", label: "Categories" },
    { id: "notifications", label: "Notifications" },
    { id: "account", label: "Account" },
  ];

  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Accessories" },
    { id: 3, name: "Office Supplies" },
    { id: 4, name: "Books" },
  ]);
  const [notifications, setNotifications] = useState({
    lowStockAlerts: true,

    newProductAlerts: true,
  });

  const [accountSettings, setAccountSettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  const handleChangePassword = () => {
    if (
      !accountSettings.currentPassword ||
      !accountSettings.newPassword ||
      !accountSettings.confirmPassword
    ) {
      alert("Please fill in all password fields");
      return;
    }
    if (accountSettings.newPassword !== accountSettings.confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    if (accountSettings.newPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    alert("Password changed successfully!");
    setAccountSettings({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleEditCategory = (id) => {
    setEditingCategory(id);
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { id: Date.now(), name: newCategory }]);
      setNewCategory("");
    }
  };

  const handleSaveCategory = (id, newName) => {
    setCategories(
      categories.map((c) => (c.id === id ? { ...c, name: newName } : c))
    );
    setEditingCategory(null);
  };

  console.log("cate:", categories);

  const handleDeleteCategory = (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  const handleSaveGeneral = () => {
    alert("General settings saved successfully!");
  };
  return (
    <div className="app-layout">
      <Sidebar activeItem="settings" />
      <div className="main-content" style={{ padding: "2rem 4rem" }}>
        {/* page header */}
        <div className="page-header">
          <h1 className="page-title">Settings</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              if (activeTab === "general") handleSaveGeneral();
              else if (activeTab === "account") handleChangePassword();
            }}
          >
            <Save size={20} /> Save Changes
          </button>
        </div>
        {/* tabs */}
        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              borderBottom: "2px solid #e2e8f0",
            }}
          ></div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: "transparent",
                border: "none",
                padding: "1rem 1.5rem",
                fontSize: "1rem",
                fontWeight: "500",
                cursor: "pointer",
                color: activeTab === tab.id ? "#3b82f6" : "#64748b",
                borderBottom:
                  activeTab === tab.id ? "2px solid #3b82f6" : "none",
                marginBottom: "-2px",
                transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* tab content */}
        <div>
          {/* General Settings */}
          {activeTab === "general" && (
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
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  General Settings
                </h2>
              </div>
              <div style={{ padding: "2rem" }}>
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
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "500",
                        color: "#374151",
                      }}
                    >
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={generalSettings.businessName}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          businessName: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "1rem",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "500",
                        color: "#374151",
                      }}
                    >
                      Currency
                    </label>
                    <select
                      value={generalSettings.currency}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          currency: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "1rem",
                      }}
                    >
                      <option value="LKR">LKR (Rs)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#374151",
                    }}
                  >
                    Default Low Stock Threshold
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={generalSettings.lowStockThreshold}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        lowStockThreshold: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "1rem",
                    }}
                  />
                  <small style={{ color: "#64748b", fontSize: "0.875rem" }}>
                    Products below this quantity will show as low stock
                  </small>
                </div>
              </div>
            </div>
          )}
          {/* Categories */}
          {activeTab === "categories" && (
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
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
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
                  Product Categories
                </h2>
              </div>
              <div style={{ padding: "2rem" }}>
                {/* Add Category */}
                <div
                  style={{
                    marginBottom: "2rem",
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Enter new category name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "1rem",
                    }}
                  />
                  <button
                    onClick={handleAddCategory}
                    style={{
                      background: "#10b981",
                      color: "white",
                      border: "none",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "8px",
                      fontWeight: "500",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Plus size={20} />
                    Add Category
                  </button>
                </div>

                {/* Categories List */}
                <div style={{ display: "grid", gap: "0.75rem" }}>
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem",
                        background: "#f8fafc",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      {editingCategory === category.id ? (
                        <input
                          type="text"
                          defaultValue={category.name}
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            handleSaveCategory(category.id, e.target.value)
                          }
                          autoFocus
                          style={{
                            flex: 1,
                            padding: "0.5rem",
                            border: "1px solid #3b82f6",
                            borderRadius: "6px",
                            fontSize: "1rem",
                          }}
                        />
                      ) : (
                        <span style={{ fontWeight: "500", color: "#0f172a" }}>
                          {category.name}
                        </span>
                      )}

                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => handleEditCategory(category.id)}
                          style={{
                            background: "transparent",
                            border: "1px solid #3b82f6",
                            color: "#3b82f6",
                            padding: "0.5rem 1rem",
                            borderRadius: "6px",
                            fontWeight: "500",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <Edit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          style={{
                            background: "#ef4444",
                            color: "white",
                            border: "none",
                            padding: "0.5rem 1rem",
                            borderRadius: "6px",
                            fontWeight: "500",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* Notifications */}
          {activeTab === "notifications" && (
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
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  Notification Preferences
                </h2>
              </div>
              <div style={{ padding: "2rem" }}>
                <div style={{ display: "grid", gap: "1.5rem" }}>
                  {Object.entries(notifications).map(([key, value]) => (
                    <div
                      key={key}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1.25rem",
                        background: "#f8fafc",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <div>
                        <strong
                          style={{
                            display: "block",
                            marginBottom: "0.25rem",
                            color: "#0f172a",
                          }}
                        >
                          {key === "lowStockAlerts" && "Low Stock Alerts"}

                          {key === "newProductAlerts" && "New Product Alerts"}
                        </strong>
                        <p
                          style={{
                            color: "#64748b",
                            fontSize: "0.875rem",
                            margin: 0,
                          }}
                        >
                          {key === "lowStockAlerts" &&
                            "Get notified when products are running low"}

                          {key === "newProductAlerts" &&
                            "Get notified when new products are added"}
                        </p>
                      </div>
                      <label
                        style={{
                          position: "relative",
                          display: "inline-block",
                          width: "52px",
                          height: "28px",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              [key]: e.target.checked,
                            })
                          }
                          style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: value ? "#10b981" : "#cbd5e1",
                            borderRadius: "28px",
                            transition: "0.3s",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              content: "",
                              height: "20px",
                              width: "20px",
                              left: value ? "28px" : "4px",
                              bottom: "4px",
                              background: "white",
                              borderRadius: "50%",
                              transition: "0.3s",
                            }}
                          />
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* Account */}
          {activeTab === "account" && (
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
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  Account Settings
                </h2>
              </div>
              <div style={{ padding: "2rem" }}>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#0f172a",
                    marginBottom: "1.5rem",
                  }}
                >
                  Change Password
                </h3>
                <div
                  style={{ maxWidth: "500px", display: "grid", gap: "1.5rem" }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "500",
                        color: "#374151",
                      }}
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={accountSettings.currentPassword}
                      onChange={(e) =>
                        setAccountSettings({
                          ...accountSettings,
                          currentPassword: e.target.value,
                        })
                      }
                      placeholder="Enter current password"
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "1rem",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "500",
                        color: "#374151",
                      }}
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      value={accountSettings.newPassword}
                      onChange={(e) =>
                        setAccountSettings({
                          ...accountSettings,
                          newPassword: e.target.value,
                        })
                      }
                      placeholder="Enter new password"
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "1rem",
                      }}
                    />
                    <small style={{ color: "#64748b", fontSize: "0.875rem" }}>
                      Must be at least 8 characters long
                    </small>
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "500",
                        color: "#374151",
                      }}
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={accountSettings.confirmPassword}
                      onChange={(e) =>
                        setAccountSettings({
                          ...accountSettings,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Confirm new password"
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "1rem",
                      }}
                    />
                  </div>
                  <div>
                    <button
                      onClick={handleChangePassword}
                      style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.75rem 1.5rem",
                        borderRadius: "8px",
                        fontWeight: "500",
                        cursor: "pointer",
                      }}
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "2rem",
                    padding: "1rem",
                    background: "#dbeafe",
                    border: "1px solid #3b82f6",
                    borderRadius: "8px",
                  }}
                >
                  <p
                    style={{
                      color: "#1e40af",
                      fontSize: "0.875rem",
                      margin: 0,
                    }}
                  >
                    <strong>Security Tip:</strong> Use a strong password that
                    includes uppercase and lowercase letters, numbers, and
                    special characters.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
