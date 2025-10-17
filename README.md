<p align="center">
  <img src="public/logoicon.png" alt="StockWise Logo" width="70" />
</p>

<h1 align="center" >
 
  StockWise – Simple Inventory Manager
</h1>

<p align="center">
  <em>Smart, Secure, and Scalable Inventory Management for Small Businesses</em>
</p>



A complete, full-stack **inventory management system** designed for **small businesses**.  
This web-based application provides a **secure, multi-user environment** to track products, manage stock levels, and view inventory statistics through a **clean, modern interface**.

This project was built from the ground up, starting with a **pure Node.js backend** to demonstrate a deep understanding of core web principles, and evolving into a feature-rich Single-Page Application (SPA) with **React**.
<!--
'![StockWise Dashboard](https://your-image-host.com/dashboard.png)  -->

---

## ✨ **Key Features**

-   **☁️ Cloud Image Uploads:** Products can have images uploaded directly to Cloudinary for fast, scalable, and reliable media management.
-   **🔐 Secure Authentication:** Secure Authentication: Full user registration and login system using JWT (JSON Web Tokens) for secure, stateless sessions.
-   **📊 Interactive Dashboard:** At-a-glance view of key metrics like total product count, total inventory value, and low-stock item warnings.
-   **📦 Full Product Management (CRUD):**  Create, read, update, and delete products with details like name, price, stock, category, and an image.
-   **🔍 Search & Filtering:** Instantly search for products by name across the entire inventory.
-   **📈 Stock Movement Tracking:** A detailed audit trail for every product, showing a history of sales, stock purchases, and adjustments.
-   **📝 Sales Logging:** A dedicated page to record incoming stock and outgoing sales, which automatically updates inventory levels.
-   **⚙️ Comprehensive Settings:**
    -   **General:** Configure application-wide settings like business name and currency.
    -   **Categories:** Dynamically add, edit, and delete product categories.
    -   **Account:** Securely change user passwords.
    -   **Notifications:** Manage user-specific notification preferences.

---

## 🛠️ **Tech Stack**

### **Frontend**
*   **React/shadcn:** A declarative library for building dynamic and responsive user interfaces.
*   **React Router:** For client-side routing to create a seamless multi-page experience.
*   **React Context API:** For global state management, specifically for user authentication status.
*   **Native Fetch API:** For all communication with the backend RESTful API.
*   **CSS:** Custom styling for a clean and modern design without a heavy UI framework.

### **Backend**
*   **Node.js (Pure):** The backend is built using only native Node.js modules (`http`, `url`) to demonstrate a fundamental understanding of server-side logic without framework abstractions.
*   **MySQL:** A robust relational database for storing all application data.
*   **Busboy:** A high-performance, stream-based parser for handling multipart/form-data (file uploads) in a pure Node.js environment.
*   **Cloudinary:** For cloud-based image storage and delivery.
*   **jsonwebtoken (`jwt`):** To sign and verify JWTs for stateless user authentication.
*   **bcryptjs:** For securely hashing user passwords before storing them in the database.
*   **dotenv:** For managing environment variables

---

## 📂 **Project Structure**

```bash
StockWise-inventory-manager/
├── backend/
│   ├── node_modules/
│   ├── server.js
│   ├── Controller.js        
│   ├── db.js             
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/       
    │   ├── context/          
    │   ├── pages/            
    │   ├── services/        
    │   ├── App.jsx          
    │   ├── main.jsx          
    │   └── App.css          
    ├── package.json
    └── vite.config.js
```

## 🚀 **Getting Started**

Follow these instructions to get the project running on your local machine.

### Prerequisites

*   **Node.js & npm:** v18.x or higher
*   **MySQL Server:** v8.x or higher
*   A MySQL client like **MySQL Workbench** or **DBeaver** to manage the database.
*   A Cloudinary Account (a free account is sufficient).

---

### **Installation & Setup**

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ShehaanN/StockWise-frontend.git
    git clone https://github.com/ShehaanN/StockWise-backend.git
    ```

2.  **Database Setup:**
    *   Connect to your MySQL server.
    *   Create a new database named `inventory_manager_db`.
    *   Execute the SQL commands in a `database_setup.sql` file (you should create this) to set up all the required tables (`users`, `products`, `categories`, `stock_movements`, `app_settings`).

3.  **Backend Setup:**
    ```bash
     cd StockWise-backend

    # Install dependencies
    npm install

    # Create a .env file and add your credentials
    # Replace placeholder values with your actual credentials
    touch .env

    # Update database credentials in db.js if they are different from the defaults.

    # Start the backend server
    npm start
    ```
    Add the following to your backend/.env file:
    ```bash
    JWT_SECRET=your_super_secret_and_long_random_string
    CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```
5.  **Frontend Setup:**
    ```bash
    # Open a new terminal and navigate to the frontend folder
    cd frontend

    # Install dependencies
    npm install

    # Start the React development server
    npm run dev
    ```
    The frontend will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

6.  **Access the Application:** Open your browser and go to `http://localhost:5173`. You can register a new user to begin.

---

## 📄 **Pages & Routes**

| Page                | Route                   | Authentication | Description                                             |
| ------------------- | ----------------------- | -------------- | ------------------------------------------------------- |
| **Login**           | `/login`                | Public         | User login form.                                        |
| **Register**        | `/register`             | Public         | New user registration form.                             |
| **Dashboard**       | `/`                     | **Protected**  | Main dashboard with inventory statistics.               |
| **Products List**   | `/products`             | **Protected**  | View, search, and manage all products.                  |
| **Product Detail**  | `/products/:id`         | **Protected**  | View a single product's details and stock history.      |
| **Add Product**     | `/add-product`          | **Protected**  | Form to add a new product to the inventory.             |
| **Settings**        | `/settings`             | **Protected**  | Manage general, category, and account settings.         |

---

## 🔐 **Authentication & File Upload Flow**

The application uses a token-based authentication flow with JWT.

1.  **Registration:** A new user submits their `username` and `password`. The backend hashes the password with `bcryptjs` and stores the credentials in the `users` table.
2.  **Login:** A user submits their credentials. The backend verifies the username and compares the provided password against the stored hash.
3.  **Token Generation:** If credentials are valid, the backend generates a signed JWT containing user information (e.g., user ID) and an expiration time.
4.  **Client-Side Storage:** The frontend receives the JWT and stores it in the browser's `localStorage`.
5.  **Authenticated Requests:** For every subsequent request to a protected route, the frontend includes the JWT in the `Authorization: Bearer <token>` header.
6.  **Server-Side Verification:** A middleware on the backend intercepts each request, verifies the JWT's signature and expiration, and grants or denies access accordingly.

Image Uploads

The image upload process is handled through a multipart/form-data stream, demonstrating advanced backend capabilities:

1.  The React frontend sends the form data, including the image file, using the FormData API.
2.  The pure Node.js backend uses the busboy library to parse the incoming multipart stream directly from the request.
3.  As busboy processes the file stream, it is piped directly to the Cloudinary upload stream.
4.  Once the upload to Cloudinary is complete, the secure image URL is returned and stored in the products table in the database.

This stream-based approach is highly efficient as it avoids saving the file to the server's disk temporarily.
---

## 🧱 **Future Improvements**

- 🌐 Multi-language support  
- 📦 CSV/Excel import & export  
- 📱 Mobile responsive design enhancements  
- 📧 Email-based notifications for stock alerts  
- 💾 Backup & restore system  

---

## 💡 **Author**

**👤 Shehan Nadeesha**  
📧 [Email Me](mailto:shehannadeesha51@gmail.com)  
🌐 [GitHub – ShehaanN](https://github.com/ShehaanN)
