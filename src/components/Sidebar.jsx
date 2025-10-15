import { Link, NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  return (
    <div className="sidebar">
      <div className="sidebar-logo">📦 StockWise</div>

      <ul className="sidebar-nav">
        <li>
          <NavLink to="/">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/products">Products</NavLink>
        </li>
        <li>
          <NavLink to="/add-product">Add Product</NavLink>
        </li>
        <li>
          <NavLink to="/settings">Settings</NavLink>
        </li>
      </ul>
      <div
        style={{
          marginTop: "2rem",
          paddingTop: "1rem",
          borderTop: "1px solid #414e64",
        }}
      >
        <button
          onClick={logout}
          style={{
            display: "flex",

            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
            padding: "0.75rem 1rem",
            backgroundColor: "#1e293b",
            borderRadius: "8px",
            width: "100%",
          }}
        >
          <LogOut />
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
