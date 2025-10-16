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
  addCategory: (category) =>
    fetchWithAuth(`${API_URL}/categories`, {
      method: "POST",
      body: JSON.stringify(category),
    }),
  updateProduct: (id, product) =>
    fetchWithAuth(`${API_URL}/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    }),

  updateCategory: (id, category) =>
    fetchWithAuth(`${API_URL}/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(category),
    }),
  updateAppSettings: (id, settings) =>
    fetchWithAuth(`${API_URL}/appSettings/${id}`, {
      method: "PUT",
      body: JSON.stringify(settings),
    }),
  deleteProduct: (id) =>
    fetchWithAuth(`${API_URL}/products/${id}`, {
      method: "DELETE",
    }),
  deleteCategory: (id) =>
    fetchWithAuth(`${API_URL}/categories/${id}`, {
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
  getAllCategories: () => {
    return fetchWithAuth(`${API_URL}/categories`);
  },
  getAppSettings: () => {
    return fetchWithAuth(`${API_URL}/appsettings`);
  },
  changePassword: (passwords) => {
    return fetchWithAuth(`${API_URL}/users/change-password`, {
      method: "PUT",
      body: JSON.stringify(passwords),
    });
  },
};

export default api;
