import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
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
        <button onClick={()=>{
          navigate('/login');
        }} className={styles.loginButton}>Login</button>
      </div>
    </nav>
  );
};

export default Navbar;