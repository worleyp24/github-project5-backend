import React from "react";
import styles from "../styles/Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.container}>
      <p>
        Congrats, lucky ones get ₱100 off! Use code EXAITEDKUMAIN on the food
        upon checkout. Min. order of ₱599. 3x redemptions only.
      </p>
    </div>
  );
};

export default Banner;
