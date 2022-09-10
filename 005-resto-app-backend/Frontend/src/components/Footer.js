import React from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>Footer Left</div>
      <div className={styles.right}>Footer Right</div>
    </div>
  );
};

export default Footer;
