import React from 'react'
import styles from '../css/DashBoard.module.css'
import Navbar from '../components/Navbar/Navbar.jsx'
import Table from '../components/Table/Table'

// public dashboard page where all the events will be listed

const DashBoard = () => {
  return (
    <>
      <div className={styles.bg}></div>
      <Navbar />
      <div className={styles.content}>
        <Table type="dashboard" className={styles.table} />
      </div>
    </>
  )
}

export default DashBoard