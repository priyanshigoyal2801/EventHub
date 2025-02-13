import React, { useEffect, useState } from 'react';
import styles from '../css/DashBoard.module.css';
import Navbar from '../components/Navbar/Navbar.jsx';
import Table from '../components/Table/Table';
import Cookies from 'js-cookie';

const SocietyDashboard = () => {
  const [events, setEvents] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/society/table", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();
        if (response.ok) {
          setEvents(data);
        } else {
          console.error("Failed to fetch events:", data.error);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, [token]);

  return (
    <>
      Society
      <div className={styles.bg}></div>
      <Navbar />
      <div className={styles.content}>
        <Table type="society" className={styles.table} data={events} />
      </div>
    </>
  );
};

export default SocietyDashboard;