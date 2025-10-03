import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Dashboard from "./pages/Dashboard";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/products" element={<Products />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products/:id" element={<ProductDetails />} />

      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default App;
