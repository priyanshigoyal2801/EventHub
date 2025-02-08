import React from 'react'
import styles from '../css/DashBoard.module.css'
import Navbar from '../components/Navbar/Navbar.jsx'
import Table from '../components/Table/Table'

// Society dashboard page where all the particular society relevant events will be listed
// and society can see approval status of the events and can delete it

const SocietyDashboard = () => {
  return (
    <>
      Society
      <div className={styles.bg}></div>
      <Navbar />
      <div className={styles.content}>
        <Table type="society" className={styles.table} />
      </div>
    </>
  )
}

export default SocietyDashboard