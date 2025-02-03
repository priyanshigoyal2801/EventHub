import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleAuth = () => {
    if (isLoggedIn) {
      Cookies.remove("token");
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <h1>Events</h1>
      </div>
      <button 
        className={styles.menuIcon} 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      <div className={`${styles.navRight} ${menuOpen ? styles.show : ''}`}>
        <a href="#" className={styles.navLink}>Requested changes</a>
        <a href='#' className={styles.navLink}>Stats</a>
        <a href="#" className={styles.navLink}>My Events</a>
        <button onClick={handleAuth} className={styles.loginButton}>
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
