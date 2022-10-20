import React from "react";
import styles from "../styles/CartItem.module.css";
import Alert from "../components/Alert";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const CartItem = ({ cartItem, dispatchParent, alertModal, products }) => {
  const cart =
    cartItem.length === 0 ? (
      <>
        <tr rowSpan="5">
          <td className={styles.noAvailable} colSpan="5">
            <em>No available items in the cart</em>
          </td>
        </tr>
      </>
    ) : (
      cartItem.map((item) => {
        const onChange = (e) => {
          dispatchParent({
            type: "EDIT_CART_ITEM",
            payload: {
              id: item.id,
              discount: item.discount,
              image: item.image,
              name: item.name,
              category: item.category,
              price: item.price,
              description: item.description,
              quantity: parseInt(e.target.value),
            },
          });
          axios.put(`http://localhost:8080/Cart/${item.id}`, {
            id: item.id,
            discount: item.discount,
            image: item.image,
            name: item.name,
            category: item.category,
            price: item.price,
            description: item.description,
            quantity: parseInt(e.target.value),
          });
        };
        const decreaseQty = () => {
          if (item.quantity < 2) {
            axios
              .delete(`http://localhost:8080/Cart/${item.id}`)
              .then((response) => {
                dispatchParent({
                  type: "REMOVE_CART_ITEM",
                  payload: {
                    id: item.id,
                  },
                });
              });
          } else {
            axios
              .put(`http://localhost:8080/Cart/${item.id}`, {
                id: item.id,
                discount: item.discount,
                image: item.image,
                name: item.name,
                category: item.category,
                price: item.price,
                description: item.description,
                quantity: item.quantity - 1,
              })
              .then((response) => {
                dispatchParent({
                  type: "EDIT_CART_ITEM",
                  payload: {
                    id: item.id,
                    discount: item.discount,
                    image: item.image,
                    name: item.name,
                    category: item.category,
                    price: item.price,
                    description: item.description,
                    quantity: item.quantity - 1,
                  },
                });
              });
          }
        };
        return (
          <tr>
            <td>
              <div className={styles.imageContainer}>
                <img
                  src={item.image}
                  alt={item.name}
                  height="100px"
                  width="100px"
                />
              </div>
            </td>
            <td>
              <span className={styles.name}>{item.name}</span>
            </td>
            <td>
              <span className={styles.price}>
                {item.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "PHP",
                })}
              </span>
            </td>
            <td className={styles.quantityWrapper}>
              <button className={styles.button} onClick={() => decreaseQty()}>
                -
              </button>
              <input
                className={styles.quantity}
                type="number"
                value={item.quantity}
                onChange={(e) => onChange(e)}
              />
              <button
                className={styles.button}
                onClick={() =>
                  axios
                    .put(`http://localhost:8080/Cart/${item.id}`, {
                      id: item.id,
                      discount: item.discount,
                      image: item.image,
                      name: item.name,
                      category: item.category,
                      price: item.price,
                      description: item.description,
                      quantity: item.quantity + 1,
                    })
                    .then((response) => {
                      dispatchParent({
                        type: "EDIT_CART_ITEM",
                        payload: {
                          id: item.id,
                          discount: item.discount,
                          image: item.image,
                          name: item.name,
                          category: item.category,
                          price: item.price,
                          description: item.description,
                          quantity: item.quantity + 1,
                        },
                      });
                    })
                }
              >
                +
              </button>
            </td>
            <td className={styles.price}>
              {(item.quantity * item.price).toLocaleString("en-US", {
                style: "currency",
                currency: "PHP",
              })}
            </td>
            <td>
              <div className={styles.deleteCartItem}>
                <FaTrashAlt
                  onClick={() =>
                    dispatchParent({
                      type: "ALERT_MODAL",
                      payload: {
                        status: true,
                        errorType: "removeCart",
                        id: item.id,
                        name: "",
                        newItemForm: false,
                        editItemForm: false,
                        cartItemForm: false,
                      },
                    })
                  }
                />
              </div>
            </td>
          </tr>
        );
      })
    );

  return (
    <div className={styles.main}>
      <h1>My Cart</h1>
      <div className={styles.header}>
        <Link to="/Menu">
          <span className={styles.cartNav}>Continue Ordering</span>
        </Link>
      </div>
      {/* Modal for Alert */}
      {alertModal.status && alertModal.errorType === "removeCart" ? (
        <Alert
          {...alertModal}
          stateParent={products}
          dispatchParent={dispatchParent}
        />
      ) : (
        ""
      )}
      <div className={styles.container}>
        <div className={styles.left}>
          <table className={styles.table}>
            <tr className={styles.tr}>
              <th className={styles.tableProduct}>Product</th>
              <th className={styles.tableName}>Name</th>
              <th className={styles.tablePrice}>Price</th>
              <th className={styles.tableQuantity}>Quantity</th>
              <th className={styles.tableTotal}>Total</th>
              <th className={styles.tableRemove}></th>
            </tr>
            {cart}
          </table>
        </div>
        <div className={styles.right}>
          <h2>Cart Total</h2>
          <br />
          <div className={styles.promo}>
            <p>PROMO CODE</p>
            <input
              className={styles.inputPromo}
              type="text"
              placeholder="Input promo code"
            />
          </div>
          <br />
          <div className={styles.subtotal}>
            <p>Subtotal</p>
            <p>
              {(
                cartItem.reduce(
                  (previousValue, currentValue) =>
                    previousValue + currentValue.price * currentValue.quantity,
                  0
                ) * 0.88
              ).toLocaleString("en-US", {
                style: "currency",
                currency: "PHP",
              })}
            </p>
          </div>
          <div className={styles.VAT}>
            <p>VAT 12%</p>
            <p>
              {(
                cartItem.reduce(
                  (previousValue, currentValue) =>
                    previousValue + currentValue.price * currentValue.quantity,
                  0
                ) * 0.12
              ).toLocaleString("en-US", {
                style: "currency",
                currency: "PHP",
              })}
            </p>
          </div>
          <div className={styles.total}>
            <h4>Total</h4>
            <h4>
              {cartItem
                .reduce(
                  (previousValue, currentValue) =>
                    previousValue + currentValue.price * currentValue.quantity,
                  0
                )
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "PHP",
                })}
            </h4>
          </div>
          <br />
          <div className={styles.btnContainer}>
            <button
              className={styles.checkout}
              onClick={() => alert("That's All Thank you.")}
            >
              CHECK OUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
