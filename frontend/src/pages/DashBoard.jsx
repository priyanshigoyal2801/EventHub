import React from 'react'
import college from '../assets/Tiet_Track_Mhostel.jpg'
import styles from '../css/DashBoard.module.css'
import Navbar from '../components/Navbar/Navbar.jsx'


const DashBoard = () => {
  return (
    <>
        <div classname="container">
        <img src={college} alt="placeholder" className={styles.bg} />
          <Navbar />
        </div>
    </>
  )
}

export default DashBoard