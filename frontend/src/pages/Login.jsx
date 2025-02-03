import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/login.module.css";
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getUserFromToken = async () => {
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User data:", data);
        // alert(`User data: ${JSON.stringify(data)}`);
        if (data.decoded.type === "Admin") {
          navigate("/admin");
        } else if (data.decoded.type === "Society") {
          navigate("/society");
        } else {
          alert("Invalid user type");
        }
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      navigate("/login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set("token", data.token, { expires: 1 }); // Store token
        alert(data.message);
        await getUserFromToken(); // Fetch user data and navigate
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.bg}></div>
      <div className={styles.container}>
        <h2>Login as Society/Admin</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
