import React, { useState } from "react";
import styles from "../css/login.module.css";
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure your backend allows this for CORS
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const getUserFromToken = async () => {
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure your backend allows this for CORS
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User data:", data);
        alert(`User data: ${JSON.stringify(data)}`);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      alert("Something went wrong. Please try again!");
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

          <button type="button" className={styles.submitButton} onClick={getUserFromToken}>
            Check token
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
