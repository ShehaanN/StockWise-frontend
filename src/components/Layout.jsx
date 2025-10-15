import { Link, NavLink, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="main-content" style={{ padding: "2rem 4rem" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
