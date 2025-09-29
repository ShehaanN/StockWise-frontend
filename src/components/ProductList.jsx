import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import api from "../services/api";

const ProductList = () => {
  //   const products = [
  //     { id: 1, name: "Wireless Mouse", price: 25.99, stock: 15 },
  //     { id: 2, name: "Mechanical Keyboard", price: 89.99, stock: 5 },
  //     { id: 3, name: "HD Monitor", price: 199.99, stock: 0 },
  //     { id: 4, name: "USB-C Hub", price: 45.0, stock: 8 },
  //     { id: 5, name: "External Hard Drive", price: 120.5, stock: 20 },
  //     { id: 6, name: "Webcam", price: 75.0, stock: 12 },
  //     { id: 7, name: "Gaming Chair", price: 150.0, stock: 3 },
  //     { id: 8, name: "Laptop Stand", price: 30.0, stock: 25 },
  //     { id: 9, name: "Bluetooth Speaker", price: 60.0, stock: 0 },
  //     { id: 10, name: "Smartphone Charger", price: 20.0, stock: 18 },
  //     { id: 11, name: "Noise-Cancelling Headphones", price: 199.99, stock: 7 },
  //     { id: 12, name: "Portable SSD", price: 150.0, stock: 10 },
  //     { id: 13, name: "Fitness Tracker", price: 99.99, stock: 14 },
  //     { id: 14, name: "Smart Home Hub", price: 130.0, stock: 4 },
  //     { id: 15, name: "4K Action Camera", price: 250.0, stock: 6 },
  //     { id: 16, name: "E-Reader", price: 120.0, stock: 9 },
  //     { id: 17, name: "Wireless Earbuds", price: 80.0, stock: 11 },
  //     { id: 18, name: "VR Headset", price: 300.0, stock: 2 },
  //     { id: 19, name: "Smartwatch", price: 220.0, stock: 13 },
  //     { id: 20, name: "Tablet", price: 350.0, stock: 0 },
  //   ];

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate pagination
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Functions to handle page changes
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // functions to go to a specific page
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onEdit = (product) => {
    // Handle edit action
    console.log("Edit product:", product);
  };

  const onDelete = (productId) => {
    // Handle delete action
    console.log("Delete product with ID:", productId);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the product state here
    console.log(`Change ${name} to ${value}`);
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

  console.log("fproducts", products);

  const fetchProducts = () => {
    api
      .getProducts(searchTerm)
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Failed to fetch products: ", error);
      });
  };

  return (
    <div className="app-layout">
      <div className="sidebar">
        <div className="sidebar-logo">📦 StockWise</div>
        <ul className="sidebar-nav">
          <li>
            <a href="#" className="active">
              Products
            </a>
          </li>
          <li>
            <a href="#" className="">
              Add Product
            </a>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <div className="page-header">
          <h1 className="page-title">All Products</h1>
        </div>
        <div className="search-filters flex justify-end">
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="card">
          <div className="card-header">
            <h3>
              Products (Showing {indexOfFirstProduct + 1}-
              {Math.min(indexOfLastProduct, products.length)} of{" "}
              {products.length} items)
            </h3>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <strong>{product.name}</strong>
                      </td>
                      <td>${parseFloat(product.price).toFixed(2)}</td>
                      <td>{product.stock}</td>
                      <td>
                        {product.stock === 0 ? (
                          <span
                            className="status"
                            style={{ background: "#fee2e2", color: "#991b1b" }}
                          >
                            Out of Stock
                          </span>
                        ) : product.stock < 10 ? (
                          <span className="status status-low">Low Stock</span>
                        ) : (
                          <span className="status status-medium">In Stock</span>
                        )}
                      </td>
                      <td>
                        <div className="product-actions">
                          <Dialog>
                            <form>
                              <DialogTrigger asChild>
                                <button
                                  className="btn btn-sm btn-outline"
                                  onClick={() => onEdit(product)}
                                >
                                  Edit
                                </button>
                              </DialogTrigger>
                              <DialogContent
                                style={{ width: "500px", padding: "20px" }}
                              >
                                <DialogHeader>
                                  <DialogTitle>Edit Product</DialogTitle>
                                  <DialogDescription>
                                    Make changes to your product here. Click
                                    save when you&apos;re done.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                  <div className="grid gap-3">
                                    <label className="form-label">
                                      Product Name *
                                    </label>
                                    <input
                                      type="text"
                                      name="name"
                                      className="form-input"
                                      value={product.name}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </div>
                                  <div className="grid gap-3">
                                    <label className="form-label">
                                      Price *
                                    </label>
                                    <input
                                      type="number"
                                      name="price"
                                      className="form-input"
                                      value={product.price}
                                      onChange={handleInputChange}
                                      step="0.01"
                                      min="0"
                                      required
                                    />
                                  </div>
                                  <div className="grid gap-3">
                                    <label className="form-label">
                                      Stock Quantity *
                                    </label>
                                    <input
                                      type="number"
                                      name="stock"
                                      className="form-input"
                                      value={product.stock}
                                      onChange={handleInputChange}
                                      min="0"
                                      required
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick=""
                                    >
                                      Cancel
                                    </button>
                                  </DialogClose>
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
                                    Update Product
                                  </button>
                                </DialogFooter>
                              </DialogContent>
                            </form>
                          </Dialog>
                          <Dialog>
                            <form>
                              <DialogTrigger asChild>
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => onDelete(product.id)}
                                >
                                  Delete
                                </button>
                              </DialogTrigger>
                              <DialogContent
                                style={{ width: "500px", padding: "20px" }}
                              >
                                <DialogHeader>
                                  <DialogTitle>Delete Product</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4">
                                  <div className="grid gap-3">
                                    <p>
                                      Are you sure you want to delete this{" "}
                                      {product.name} product?
                                    </p>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick=""
                                    >
                                      Cancel
                                    </button>
                                  </DialogClose>
                                  <button
                                    type="submit"
                                    className="btn btn-danger"
                                  >
                                    Delete
                                  </button>
                                </DialogFooter>
                              </DialogContent>
                            </form>
                          </Dialog>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No products found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="pagination flex justify-end  items-center"
          style={{ marginTop: "1rem" }}
        >
          <button
            className="btn btn-secondary btn-sm "
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`btn btn-sm ${
                currentPage === index + 1 ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => goToPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="btn btn-secondary btn-sm "
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
