import React from "react";
import styles from "../styles/NavBar.module.css";
import { FaPhoneAlt, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavBar = ({ cartItem, dispatchParent, devMode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <FaPhoneAlt className={styles.iconCall} />
        <div className={styles.leftDetails}>
          <small>ORDER NOW!</small>
          <small>+63-917-858-0095</small>
        </div>
      </div>
      <div className={styles.center}>
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
        <div className={styles.logo}>
          {/* <FaDev /> */}
          <img
            src={"/images/Logo.png"}
            alt="logo"
            height="80px"
            width="80px"
            onClick={() =>
              dispatchParent({
                type: "DEV_MODE",
                payload: devMode ? false : true,
              })
            }
          />
        </div>

        <Link to="/Menu">Menu</Link>
        <Link to="/Blog">Blog</Link>
      </div>
      <div className={styles.right}>
        <Link to="/Cart">
          <FaShoppingCart className={styles.iconCart} />
        </Link>
        <div className={styles.counter}>
          {cartItem.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.quantity,
            0
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
