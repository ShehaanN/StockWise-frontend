import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const handleLogin = () => {
    alert("Login successful!");
    setIsLoggedIn(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  if (isLoggedIn) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            padding: "3rem",
            maxWidth: "450px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "#d1fae5",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              fontSize: "2.5rem",
            }}
          >
            ✓
          </div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "0.5rem",
            }}
          >
            Welcome Back!
          </h1>
          <p style={{ color: "#64748b", margin: 0 }}>
            You have successfully logged in to Inventory Manager.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex" }}>
      {/* Left Side - Branding */}
      <div
        style={{
          flex: 1,
          background: "#0f172a",
          padding: "4rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <div style={{ maxWidth: "500px" }}>
          <div style={{ fontSize: "4rem", marginBottom: "2rem" }}>📦</div>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              marginBottom: "1rem",
              color: "white",
            }}
          >
            Inventory Manager
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#94a3b8",
              lineHeight: "1.6",
            }}
          >
            Manage your products, track stock levels, and streamline your
            inventory operations all in one place.
          </p>
          <div style={{ marginTop: "3rem", display: "grid", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#1e293b",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✓
              </div>
              <span style={{ color: "#cbd5e1" }}>Real-time stock tracking</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#1e293b",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✓
              </div>
              <span style={{ color: "#cbd5e1" }}>Sales management</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#1e293b",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✓
              </div>
              <span style={{ color: "#cbd5e1" }}>Low stock alerts</span>
            </div>
          </div>
        </div>
      </div>
      {/* Right Side - Login Form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div style={{ width: "100%", maxWidth: "450px" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontSize: "1.875rem",
                fontWeight: "700",
                color: "#0f172a",
                marginBottom: "0.5rem",
              }}
            >
              Sign in to your account
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
              Enter your credentials to access your dashboard
            </p>
          </div>

          {/* Login Form */}
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Email Field */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                  color: "#374151",
                  fontSize: "0.875rem",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  transition: "border-color 0.2s",
                  outline: "none",
                }}
                placeholder="name@company.com"
                onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
              />
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                  color: "#374151",
                  fontSize: "0.875rem",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    paddingRight: "3rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    transition: "border-color 0.2s",
                    outline: "none",
                  }}
                  placeholder="Enter your password"
                  onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#64748b",
                    padding: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    marginRight: "0.5rem",
                    cursor: "pointer",
                    width: "16px",
                    height: "16px",
                  }}
                />
                <span style={{ color: "#374151" }}>Remember me</span>
              </label>
              <a
                href="#"
                style={{
                  color: "#3b82f6",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              style={{
                width: "100%",
                background: "#3b82f6",
                color: "white",
                border: "none",
                padding: "0.875rem",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#2563eb")}
              onMouseOut={(e) => (e.target.style.background = "#3b82f6")}
            >
              Sign In
            </button>

            {/* Sign Up Link */}
            <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
              <p style={{ color: "#64748b", fontSize: "0.875rem", margin: 0 }}>
                Don't have an account?{" "}
                <a
                  href="#"
                  style={{
                    color: "#3b82f6",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
