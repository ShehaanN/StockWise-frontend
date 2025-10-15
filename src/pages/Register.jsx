import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [error, setError] = useState("");
  console.log(formData, "terms", agreeTerms);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    if (agreeTerms) {
      try {
        setIsSignedUp(true);
        await api.register(formData.email, formData.password);
        alert("Registration successful! Please login.");
        navigate("/login");
      } catch (error) {
        setError(
          error.message || "Registration failed. Username may already be taken."
        );
        console.error(error);
      }
    } else {
      alert("Please agree to the terms and conditions.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSignUp();
    }
  };

  if (isSignedUp) {
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
            Welcome!
          </h1>
          <p style={{ color: "#64748b", margin: 0 }}>
            Your account has been created successfully.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex" }}>
      {/* Left Side - Sign Up Form */}
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
              Create an account
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
              Enter your details to create your account
            </p>
          </div>

          {/* left side- Registration Form */}
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Name Field */}
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
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  transition: "border-color 0.2s",
                  outline: "none",
                }}
                placeholder="Enter your name"
                onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
              />
            </div>

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
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  transition: "border-color 0.2s",
                  outline: "none",
                }}
                placeholder="Enter your mail"
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
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
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

            {/* Terms & Conditions */}
            <div style={{ marginBottom: "1.5rem" }}>
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
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  style={{
                    marginRight: "0.5rem",
                    cursor: "pointer",
                    width: "16px",
                    height: "16px",
                    accentColor: "#0f172a",
                  }}
                />
                <span style={{ color: "#374151" }}>
                  I agree to all the Terms & Conditions
                </span>
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              onClick={handleSignUp}
              style={{
                width: "100%",
                background: "#0f172a",
                color: "white",
                border: "none",
                padding: "0.875rem",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.2s",
                marginBottom: "1.5rem",
              }}
              onKeyPress={handleKeyPress}
              onMouseOver={(e) => (e.target.style.background = "#1e293b")}
              onMouseOut={(e) => (e.target.style.background = "#0f172a")}
            >
              Sign up
            </button>

            {/* Log In Link */}
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#64748b", fontSize: "0.875rem", margin: 0 }}>
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#0f172a",
                    textDecoration: "underline",
                    fontWeight: "600",
                  }}
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Right Side  */}
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
            Start Your Journey
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#94a3b8",
              lineHeight: "1.6",
            }}
          >
            Join thousands of businesses managing their inventory efficiently.
            Get started in minutes.
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
              <span style={{ color: "#cbd5e1" }}>Complete Dashboard</span>
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
              <span style={{ color: "#cbd5e1" }}>Smart Alerts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
