import React from 'react'
import styles from '../css/DashBoard.module.css'
import Navbar from '../components/Navbar/Navbar.jsx'
import Table from '../components/Table/Table'

// Admin dashboard page where all the events will be listed in different format
// and admin can approve or reject the application
// and can see the list of all the applications submitted by the users

const AdminDashboard = () => {
  return (
    <>
      Admin
      <div className={styles.bg}></div>
      <Navbar />
      <div className={styles.content}>
        <Table type="admin" className={styles.table} />
      </div>
    </>
  )
}

export default AdminDashboard