const API_URL = "http://localhost:3000";

const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    // headers["Authorization"] = `Bearer ${token}`;
    headers["Authorization"] = token;
  }

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }
  //cases with no response body
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  }
  return;
};

const api = {
  login: (email, password) => {
    return fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());
  },
  register: (email, password) => {
    return fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());
  },
  // protected routes
  getProducts: (searchTerm = "") =>
    fetchWithAuth(
      `${API_URL}/products${searchTerm ? `?search=${searchTerm}` : ""}`
    ),

  addTransaction: (transactionData) => {
    return fetchWithAuth(`${API_URL}/transactions`, {
      method: "POST",
      body: JSON.stringify(transactionData),
    });
  },
  addProduct: (product) =>
    fetchWithAuth(`${API_URL}/products`, {
      method: "POST",
      body: JSON.stringify(product),
    }),
  updateProduct: (id, product) =>
    fetchWithAuth(`${API_URL}/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    }),
  deleteProduct: (id) =>
    fetchWithAuth(`${API_URL}/products/${id}`, {
      method: "DELETE",
    }),
  getProductById: (id) => {
    return fetchWithAuth(`${API_URL}/products/${id}`);
  },

  getProductStockHistory: (id) => {
    return fetchWithAuth(`${API_URL}/products/${id}/stock-history`);
  },
  getProductMovements: () => {
    return fetchWithAuth(`${API_URL}/products/movements`);
  },
  getStats: () => {
    return fetchWithAuth(`${API_URL}/stats`);
  },
};

export default api;
