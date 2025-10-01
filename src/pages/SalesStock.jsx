import { Plus, ShoppingCart } from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function SalesStock() {
  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar activeItem="salesStock" />

      {/* Main Content */}
      <div className="main-content">
        {/* Page Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Sales & Stock Management</h1>
            <p style={{ color: "#64748b", marginTop: "0.5rem" }}>
              Track inventory movements and sales transactions
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="btn btn-success">
              <ShoppingCart size={20} />
              Bulk Sale
            </button>
            <button className="btn btn-primary">
              <Plus size={20} />
              Add Stock Movement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
