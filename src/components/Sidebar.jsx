import { Link } from "react-router-dom";

const Sidebar = ({ activeItem }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">📦 StockWise</div>
      <ul className="sidebar-nav">
        <li>
          <Link
            to="/dashboard"
            className={activeItem === "dashboard" ? "active" : ""}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className={activeItem === "products" ? "active" : ""}
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/add-product"
            className={activeItem === "addProduct" ? "active" : ""}
          >
            Add Product
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className={activeItem === "settings" ? "active" : ""}
          >
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
