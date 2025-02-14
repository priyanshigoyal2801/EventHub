import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import GetTokenData from '../../utils/GetTokenData';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("guest");
  const [userId, setUserId] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      setIsLoggedIn(false);
      setUserRole("guest");
      return;
    }

    const fetchUserRole = async () => {
      try {
        const tokenData = await GetTokenData(); 
        const role = tokenData?.decoded?.type || "guest"; 
        setIsLoggedIn(true);
        setUserRole(role.toLowerCase());
        setUserId(tokenData?.decoded?.id);
      } catch (error) {
        console.error("Failed to fetch token data:", error);
        setIsLoggedIn(false);
        setUserRole("guest");
      }
    };

    fetchUserRole();
  }, []);

  const handleAuth = () => {
    if (isLoggedIn) {
      Cookies.remove("token");
      setIsLoggedIn(false);
      setUserRole("guest");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <h1>Thapar University</h1>
      </div>
      <button 
        className={styles.menuIcon} 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      <div className={`${styles.navRight} ${menuOpen ? styles.show : ''}`}>
        {userRole === "guest" && (
          <a href="#" className={styles.navLink}>Stats</a>
        )}
        {userRole === "society" && (
          <>
            <a href="#" className={styles.navLink}>Requested Changes</a>
            <a href="#" className={styles.navLink}>Stats</a>
            <a href={`/society/${userId}`} className={styles.navLink}>My Events</a>
            <a href={`/society/create-event`} className={styles.navLink}>Create Event</a>
          </>
        )}
        {userRole === "admin" && (
          <>
            <a href="#" className={styles.navLink}>Manage Users</a>
            <a href="#" className={styles.navLink}>Event Approvals</a>
            <a href="/admin" className={styles.navLink}>Dashboard</a>
          </>
        )}
        <button onClick={handleAuth} className={styles.loginButton}>
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
