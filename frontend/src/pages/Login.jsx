import React, { useState } from "react";
import styles from "../css/login.module.css";

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
        credentials: "include",
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