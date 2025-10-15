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
import { useState } from "react";
// import api from "../services/api";
import Sidebar from "./Sidebar";
// import { debounce } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import dummyImage from "../assets/dummyimg.jpg";

const ProductList = () => {
  const navigate = useNavigate();

  const [currentProduct, setCurrentProduct] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop",
      price: 999.99,
      stock: 15,
      description:
        "A high-performance laptopA high-performance laptopA high-performance laptopA high-performance laptopA high-performance laptopA high-performance laptopA high-performance laptopA high-performance laptopA high-performance laptopA high-performance laptopA high-performance laptopA high-performance laptopA high-performance laptopA high-performance laptopA high-performance laptopA high-performance laptopA high-performance laptopA high-performance laptop",
      category: "Electronics",
      barcode: "1234567890123",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 2,
      name: "Mouse",
      price: 19.99,
      stock: 50,
      description: "Wireless mouse",
      category: "Accessories",
      barcode: "1234567890124",
      image: "",
    },
    {
      id: 3,
      name: "Keyboard",
      price: 49.99,
      stock: 30,
      description: "Mechanical keyboard",
      category: "Accessories",
      barcode: "1234567890125",
      image: "",
    },
    {
      id: 4,
      name: "Monitor",
      price: 199.99,
      stock: 20,
      description: "24-inch monitor",
      category: "Electronics",
      barcode: "1234567890126",
      image: "",
    },
    {
      id: 5,
      name: "Desk Chair",
      price: 89.99,
      stock: 10,
      description: "Ergonomic desk chair",
      category: "Office",
      barcode: "1234567890127",
      image: "",
    },
    {
      id: 6,
      name: "Notebook",
      price: 2.99,
      stock: 100,
      description: "College-ruled notebook",
      category: "Books",
      barcode: "1234567890128",
      image: "",
    },
    {
      id: 7,
      name: "Pen Set",
      price: 5.99,
      stock: 200,
      description: "Set of 10 pens",
      category: "Office",
      barcode: "1234567890129",
      image: "",
    },
    {
      id: 8,
      name: "Headphones",
      price: 59.99,
      stock: 25,
      description: "Over-ear headphones",
      category: "Electronics",
      barcode: "1234567890130",
      image: "",
    },
    {
      id: 9,
      name: "USB Drive",
      price: 14.99,
      stock: 75,
      description: "32GB USB flash drive",
      category: "Accessories",
      barcode: "1234567890131",
      image: "",
    },
    {
      id: 10,
      name: "Backpack",
      price: 39.99,
      stock: 40,
      description: "Durable backpack",
      category: "Accessories",
      barcode: "1234567890132",
      image: "",
    },
    {
      id: 11,
      name: "Smartphone",
      price: 699.99,
      stock: 18,
      description: "Latest model smartphone",
      category: "Electronics",
      barcode: "1234567890133",
      image: "",
    },
    {
      id: 12,
      name: "Tablet",
      price: 299.99,
      stock: 22,
      description: "10-inch tablet",
      category: "Electronics",
      barcode: "1234567890134",
      image: "",
    },
    {
      id: 13,
      name: "Charger",
      price: 24.99,
      stock: 60,
      description: "Fast charging adapter",
      category: "Accessories",
      barcode: "1234567890135",
      image: "",
    },
    {
      id: 14,
      name: "Desk Lamp",
      price: 29.99,
      stock: 35,
      description: "LED desk lamp",
      category: "Office",
      barcode: "1234567890136",
      image: "",
    },
    {
      id: 15,
      name: "Planner",
      price: 12.99,
      stock: 80,
      description: "2024 daily planner",
      category: "Books",
      barcode: "1234567890137",
      image: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate pagination
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const productsPerPage = products.slice(
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the product state here
    setCurrentProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log("Current Product:", currentProduct);

  // useEffect(() => {
  //   fetchProducts();
  // }, [searchTerm]);

  // const fetchProducts = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const data = await api.getProducts(searchTerm);
  //     setProducts(data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //     setError("Failed to fetch products");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleDelete = async (productId) => {
  //   try {
  //     await api.deleteProduct(productId);
  //     fetchProducts();
  //   } catch (error) {
  //     console.error("Error deleting product:", error);
  //   }
  // };

  // const handleUpdate = async (event) => {
  //   event.preventDefault();
  //   if (!currentProduct || !currentProduct.id) return;
  //   try {
  //     const poductToUpdate = {
  //       name: currentProduct.name,
  //       price: currentProduct.price,
  //       stock: currentProduct.stock,
  //     };

  //     await api.updateProduct(currentProduct.id, poductToUpdate);
  //     fetchProducts();
  //     setCurrentProduct(null);

  //     console.log("Product updated successfully");
  //   } catch (error) {
  //     console.error("Error updating product:", error);
  //   }
  // };

  //  debounced search function
  // const debouncedSearch = debounce((term) => {
  //   setSearchTerm(term);
  // }, 300);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">All Products</h1>
      </div>
      <div className="search-filters flex justify-end items-center">
        <div className="relative">
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search products by name..."
            // value={searchTerm}
            // onChange={(e) => debouncedSearch(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 gap-2"
              onClick={() => setSearchTerm("")}
            >
              ✖
            </button>
          )}
        </div>
      </div>
      {isLoading && <p>Loading products...</p>}
      {error && (
        <div
          className="card"
          style={{
            padding: "1rem",
            color: "#ef4444",
            backgroundColor: "#fee2e2",
          }}
        >
          {error}
        </div>
      )}
      {!isLoading && !error && (
        <>
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
                    <th style={{ textAlign: "left" }}>#</th>
                    <th style={{ textAlign: "left" }}>Image</th>
                    <th style={{ textAlign: "left" }}>Name</th>
                    <th style={{ textAlign: "left" }}>Category</th>
                    <th style={{ textAlign: "left" }}>Price</th>
                    <th style={{ textAlign: "left" }}>Stock</th>
                    <th style={{ textAlign: "left" }}>Status</th>
                    <th style={{ textAlign: "left" }}>Barcode</th>
                    <th style={{ textAlign: "left", width: "350px" }}>
                      Description
                    </th>
                    <th style={{ textAlign: "center" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productsPerPage.length > 0 ? (
                    productsPerPage.map((product, index) => (
                      <tr key={product.id}>
                        <td>{indexOfFirstProduct + index + 1}</td>
                        <td>
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                                borderRadius: "4px",
                              }}
                            />
                          ) : (
                            <img
                              src={dummyImage}
                              alt={product.name}
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                                borderRadius: "4px",
                              }}
                            />
                          )}
                        </td>
                        <td>
                          <strong>{product.name}</strong>
                        </td>
                        <td>
                          <strong>{product.category}</strong>
                        </td>
                        <td>${parseFloat(product.price).toFixed(2)}</td>
                        <td>{product.stock}</td>
                        <td>
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
                            <span className="status status-medium">
                              In Stock
                            </span>
                          )}
                        </td>
                        <td>{product.barcode}</td>
                        <td>
                          {product.description.length > 50
                            ? `${product.description.substring(0, 50)}...`
                            : product.description}
                        </td>
                        <td>
                          <div
                            className="product-actions"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              gap: "0.5rem",
                            }}
                          >
                            <button
                              className="btn btn-sm btn-primary-view"
                              onClick={() =>
                                navigate(`/products/${product.id}`)
                              }
                            >
                              View
                            </button>
                            <Dialog>
                              <form>
                                <DialogTrigger asChild>
                                  <button
                                    className="btn btn-sm btn-outline"
                                    onClick={() => setCurrentProduct(product)}
                                  >
                                    Edit
                                  </button>
                                </DialogTrigger>
                                <DialogContent
                                  style={{
                                    width: "100%",
                                    padding: "20px",
                                    maxHeight: "80vh",
                                    overflowY: "auto",
                                  }}
                                >
                                  <DialogHeader>
                                    <DialogTitle>Edit Product</DialogTitle>
                                    <DialogDescription>
                                      Make changes to your product here. Click
                                      save when you&apos;re done.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4">
                                    {/* name */}
                                    <div className="grid gap-3">
                                      <label className="form-label">
                                        Product Name *
                                      </label>
                                      <input
                                        type="text"
                                        name="name"
                                        className="form-input"
                                        value={currentProduct?.name || ""}
                                        onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                    {/* category */}
                                    <div className="grid gap-3">
                                      <label className="form-label">
                                        Category *
                                      </label>
                                      <input
                                        type="text"
                                        name="category"
                                        className="form-input"
                                        value={currentProduct?.category || ""}
                                        onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                    {/* price */}
                                    <div className="grid gap-3">
                                      <label className="form-label">
                                        Price *
                                      </label>
                                      <input
                                        type="text"
                                        name="name"
                                        className="form-input"
                                        value={currentProduct?.name || ""}
                                        onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                    {/* description */}
                                    <div className="grid gap-3">
                                      <label className="form-label">
                                        Description *
                                      </label>
                                      <textarea
                                        type="text"
                                        name="description"
                                        className="form-input"
                                        value={
                                          currentProduct?.description || ""
                                        }
                                        onChange={handleInputChange}
                                        required
                                      />
                                    </div>

                                    {/* image */}
                                    <div className="grid gap-3">
                                      <label className="form-label">
                                        Product Image
                                      </label>
                                      <input
                                        type="text"
                                        name="image"
                                        className="form-input"
                                        value={currentProduct?.image || ""}
                                        onChange={handleInputChange}
                                      />
                                    </div>
                                    {/* barcode */}
                                    <div className="grid gap-3">
                                      <label className="form-label">
                                        Barcode
                                      </label>
                                      <input
                                        type="text"
                                        name="barcode"
                                        className="form-input"
                                        value={currentProduct?.barcode || ""}
                                        onChange={handleInputChange}
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                      >
                                        Cancel
                                      </button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                      <button
                                        type="button"
                                        className="btn btn-primary"
                                        // onClick={() => (
                                        //   handleUpdate(event),
                                        //   navigate("/products")
                                        // )}
                                      >
                                        Update Product
                                      </button>
                                    </DialogClose>
                                  </DialogFooter>
                                </DialogContent>
                              </form>
                            </Dialog>
                            <Dialog>
                              <form>
                                <DialogTrigger asChild>
                                  <button className="btn btn-sm btn-danger">
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
                                      onClick={() => handleDelete(product.id)}
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
        </>
      )}
    </div>
  );
};

export default ProductList;
