import React from 'react'
import college from '../assets/Tiet_Track_Mhostel.jpg'
import styles from '../css/DashBoard.module.css'
import Navbar from '../components/Navbar/Navbar.jsx'
import Table from '../components/Table/Table'

const DashBoard = () => {
  return (
    <>
      <div className={styles.bg}></div>
      <Navbar />
      <div className={styles.content}>
        <Table className={styles.table} />
      </div>
    </>
  )
}

export default DashBoard