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

const ProductList = () => {
  const products = [
    { id: 1, name: "Wireless Mouse", price: 25.99, stock: 15 },
    { id: 2, name: "Mechanical Keyboard", price: 89.99, stock: 5 },
    { id: 3, name: "HD Monitor", price: 199.99, stock: 0 },
    { id: 4, name: "USB-C Hub", price: 45.0, stock: 8 },
    { id: 5, name: "External Hard Drive", price: 120.5, stock: 20 },
  ];

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
        <div className="card">
          <div className="card-header">
            <h3>Products ({products.length} items)</h3>
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
                {products.length > 0 ? (
                  products.map((product) => (
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
      </div>
    </div>
  );
};

export default ProductList;
