import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Login.module.css";
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("Society");
  const [isRegistering, setIsRegistering] = useState(false);
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
        if (data.decoded.type === "Admin") {
          navigate("/admin");
        } else if (data.decoded.type === "Society") {
          navigate(`/society/${data.decoded.id}`);
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
      const endpoint = isRegistering ? "http://localhost:3000/register" : "http://localhost:3000/login";
      const body = isRegistering 
        ? { name, email, password, type }
        : { email, password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        if (isRegistering) {
          alert("Registration successful! Please login.");
          setIsRegistering(false);
        } else {
          Cookies.set("token", data.token, { expires: 1 });
          alert(data.message);
          await getUserFromToken();
        }
      } else {
        alert(data.error || (isRegistering ? "Registration failed" : "Login failed"));
      }
    } catch (error) {
      console.error(isRegistering ? "Registration failed:" : "Login failed:", error);
      alert("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.bg}></div>
      <div className={styles.container}>
        <h2>{isRegistering ? "Register" : "Login"} as Society/Admin</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {isRegistering && (
            <>
              <input
                type="text"
                placeholder="Name"
                className={styles.input}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <select
                className={styles.input}
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="Society">Society</option>
                <option value="Admin">Admin</option>
              </select>
            </>
          )}
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
            {loading ? (isRegistering ? "Registering..." : "Logging in...") : (isRegistering ? "Register" : "Login")}
          </button>
        </form>
        <button 
          className={styles.toggleSignup}
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
        </button>
      </div>
    </>
  );
};

export default Login;
