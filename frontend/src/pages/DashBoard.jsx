import React from "react";
import styles from "../css/DashBoard.module.css";
import Navbar from "../components/Navbar/Navbar.jsx";
import Table from "../components/Table/Table";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import person1 from "../assets/person1.jpg";
import person2 from "../assets/person2.jpg";
import person3 from "../assets/person3.jpg";

const teamMembers = [
  {
    name: "Jeevant Verma",
    image: person1,
    github: "https://github.com/JeevantVerma",
    linkedin: "https://www.linkedin.com/in/jeevant-verma-8a7096297/",
    color: "#ff6b6b",
  },
  {
    name: "Akshat Nathani",
    image: person2,
    github: "https://github.com/thakksht",
    linkedin: "https://www.linkedin.com/in/akshatnathani/",
    color: "#48dbfb",
  },
  {
    name: "Priyanshi",
    image: person3,
    github: "https://github.com/priyanshigoyal2801",
    linkedin: "https://www.linkedin.com/in/priyanshi-goyal-51b006299/",
    color: "#1dd1a1"
  },
];

const DashBoard = () => {
  return (
    <>
      <div className={styles.bg}></div>
      <Navbar />
      <div className={styles.content}>
        <Table type="dashboard" className={styles.table} />
      </div>

      <footer className={styles.footer}>
        <div className={styles.line}></div>
        <div className={styles.cardsContainer}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.card}>
              <img src={member.image} alt={member.name} className={styles.image} />
              <h3 className={styles.name}>{member.name}</h3>
              <div className={styles.links}>
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className={styles.icon} />
                </a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className={styles.icon} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </footer>
    </>
  );
};

export default DashBoard;
