import React, { useState } from "react";
import styles from "../css/login.module.css";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState("Societies");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logged in as ${role}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.bg}></div>
      <h2>{isSignup ? "Signup" : "Login"} Page</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          required
        />

        <div className={styles.selectContainer}>
          <label className={styles.selectLabel}>Select Role:</label>
          <select
            className={styles.selectInput}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Societies">Societies</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>
          {isSignup ? "Sign Up" : "Login"}
        </button>
        <button
          type="button"
          onClick={() => setIsSignup((prev) => !prev)}
          className={styles.toggleSignup}
        >
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
