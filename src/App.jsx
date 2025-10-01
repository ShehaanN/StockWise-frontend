import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import SalesStock from "./pages/SalesStock";

const App = () => {
  return (
    <Routes>
      <Route path="/products" element={<Products />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/sales-stock" element={<SalesStock />} />
      <Route path="/" element={<Navigate to="/products" />} />
    </Routes>
  );
};

export default App;
