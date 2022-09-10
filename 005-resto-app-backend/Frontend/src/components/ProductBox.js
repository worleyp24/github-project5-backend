import React from "react";
import styles from "../styles/ProductBox.module.css";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";

const Products = ({
  discount,
  id,
  image,
  name,
  category,
  price,
  description,
  dispatch,
  devMode,
  cartItem,
}) => {
  const displayCategory = category
    .filter((cat) => cat !== "Best Seller")
    .filter((cat) => cat !== "New");

  const deleteItem = () => {
    dispatch({
      type: "ALERT_MODAL",
      payload: {
        status: true,
        errorType: "remove",
        id: id,
        name: "",
        newItemForm: false,
        editItemForm: false,
        cartItemForm: false,
      },
    });
  };

  const editItem = () => {
    dispatch({
      type: "FOR_EDIT_ITEM",
      payload: {
        id: id,
        discount: discount,
        image: image,
        name: name,
        category: category,
        price: price,
        description: description,
      },
    });
    dispatch({
      type: "FOR_EDIT_CART_ITEM",
      payload: {
        id: id,
        discount: discount,
        image: image,
        name: name,
        category: category,
        price: price,
        description: description,
      },
    });
  };

  const handleAddToCartClick = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: id,
        discount: discount,
        image: image,
        name: name,
        category: category,
        price: price,
        description: description,
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <span
          className={
            category.includes("Best Seller") ? styles.bestseller : styles.none
          }
        >
          {category.includes("Best Seller") ? "Best Seller" : ""}
        </span>
        <span className={category.includes("New") ? styles.fresh : styles.none}>
          {category.includes("New") ? "New" : ""}
        </span>
        <img src={image} alt={name} height="200px" width="200px" />
      </div>
      <div className={styles.buttonContainer}>
        {devMode ? (
          <FaPencilAlt className={styles.icon} onClick={() => editItem()} />
        ) : (
          ""
        )}
        {devMode ? (
          <button
            className={styles.button}
            onClick={() => handleAddToCartClick()}
            disabled
          >
            + Add to Cart
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={() => handleAddToCartClick()}
          >
            + Add to Cart
          </button>
        )}

        {devMode ? (
          <FaTrashAlt className={styles.icon} onClick={() => deleteItem()} />
        ) : (
          ""
        )}
      </div>

      <div className={styles.details}>
        <h1 className={styles.name}>{name}</h1>
        <span className={styles.price}>
          {price.toLocaleString("en-US", {
            style: "currency",
            currency: "PHP",
          })}
        </span>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.category}>
        <small>{displayCategory}</small>
      </div>
    </div>
  );
};

export default Products;
