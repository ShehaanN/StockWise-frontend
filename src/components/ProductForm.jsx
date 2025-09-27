const ProductForm = () => {
  return (
    <div className="app-layout">
      <div className="sidebar">
        <div className="sidebar-logo">📦 StockWise</div>
        <ul className="sidebar-nav">
          <li>
            <a href="#" className="">
              Products
            </a>
          </li>
          <li>
            <a href="#" className="active">
              Add Product
            </a>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <div className="page-header">
          <h1 className="page-title">Add Product</h1>
        </div>
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg  text-gray-700 font-bold">
              Add New Product
            </h2>
          </div>
          <div className="card-body">
            <form onSubmit="">
              <div className="form-group">
                <label className="form-label">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  // value={product.name}
                  // onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Price *</label>
                <input
                  type="number"
                  name="price"
                  className="form-input"
                  // value={product.price}
                  // onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Stock Quantity *</label>
                <input
                  type="number"
                  name="stock"
                  className="form-input"
                  // value={product.stock}
                  // onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>
              <div style={{ marginTop: "2.5rem" }}>
                <button type="submit" className="btn btn-primary">
                  Save Product
                </button>
                <button type="button" className="btn btn-secondary" onClick="">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
