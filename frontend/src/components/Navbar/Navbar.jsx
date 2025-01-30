import React, { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <h1>EventHub</h1>
      </div>

      {/* Mobile Menu Icon */}
      <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`${styles.navRight} ${menuOpen ? styles.show : ''}`}>
      <a href="#" className={styles.navLink}>Requested changes</a>
        <a href='#' className={styles.navLink}>Stats</a>
        <a href="#" className={styles.navLink}>My Events</a>
        <button className={styles.loginButton}>Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
