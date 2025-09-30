const API_URL = "http://localhost:3000";

const api = {
  getProducts: (searchTerm = "") =>
    fetch(
      `${API_URL}/products${searchTerm ? `?search=${searchTerm}` : ""}`
    ).then((res) => res.json()),
  addProduct: (product) =>
    fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }).then((res) => res.json()),
  updateProduct: (id, product) =>
    fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }).then((res) => res.json()),
  deleteProduct: (id) =>
    fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    }),
};

export default api;
