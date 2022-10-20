import React from "react";
import styles from "../styles/Alert.module.css";
import axios from "axios";

import {
  // BsInfoCircle,
  BsExclamationCircle,
  BsCheckCircle,
  BsQuestionCircle,
} from "react-icons/bs";

const Alert = ({ errorType, dispatchParent, id, name }) => {
  const handleRemoveItem = () => {
    axios.delete(`http://localhost:8080/Menu/${id}`).then((response) => {
      dispatchParent({
        type: "REMOVE_ITEM",
        payload: {
          id: id,
        },
      });

      dispatchParent({
        type: "ALERT_MODAL",
        payload: {
          status: false,
          errorType: "",
          id: "",
          name: "",
          newItemForm: false,
          editItemForm: false,
          cartItemForm: false,
        },
      });
    });
    axios.delete(`http://localhost:8080/Cart/${id}`).then((response) => {
      dispatchParent({
        type: "REMOVE_CART_ITEM",
        payload: {
          id: id,
        },
      });
    });
  };

  const handleRemoveCartItem = () => {
    axios.delete(`http://localhost:8080/Cart/${id}`).then((response) => {
      dispatchParent({
        type: "REMOVE_CART_ITEM",
        payload: {
          id: id,
        },
      });
      dispatchParent({
        type: "ALERT_MODAL",
        payload: {
          status: false,
          errorType: "",
          id: "",
          name: "",
          newItemForm: false,
          editItemForm: false,
          cartItemForm: true,
        },
      });
    });
  };

  const handleDiscard = () => {
    dispatchParent({
      type: "ALERT_MODAL",
      payload: {
        status: false,
        errorType: "",
        id: "",
        name: "",
        newItemForm: false,
        editItemForm: false,
        cartItemForm: false,
      },
    });
    dispatchParent({
      type: "EDIT_ITEM_FORM",
      payload: false,
    });
  };

  const duplicateEditOnClick = () => {
    dispatchParent({
      type: "ALERT_MODAL",
      payload: {
        status: false,
        errorType: "",
        id: "",
        name: "",
        newItemForm: false,
        editItemForm: true,
        cartItemForm: false,
      },
    });
  };

  const alertType = {
    empty: (
      <BsExclamationCircle className={styles.icon} style={{ color: "red" }} />
    ),
    duplicate: (
      <BsExclamationCircle className={styles.icon} style={{ color: "red" }} />
    ),
    duplicateEdit: (
      <BsExclamationCircle className={styles.icon} style={{ color: "red" }} />
    ),
    add: <BsCheckCircle className={styles.icon} style={{ color: "green" }} />,
    remove: (
      <BsQuestionCircle className={styles.icon} style={{ color: "orange" }} />
    ),
    removeCart: (
      <BsQuestionCircle className={styles.icon} style={{ color: "orange" }} />
    ),
    cancel: (
      <BsQuestionCircle className={styles.icon} style={{ color: "blue" }} />
    ),
  };

  const buttonType = {
    empty: (
      <button
        className={styles.buttonGreen}
        onClick={() =>
          dispatchParent({
            type: "ALERT_MODAL",
            payload: {
              status: false,
              errorType: "",
              id: "",
              name: "",
              newItemForm: true,
              editItemForm: false,
              cartItemForm: false,
            },
          })
        }
      >
        OK
      </button>
    ),
    duplicate: (
      <button
        className={styles.buttonGreen}
        onClick={() =>
          dispatchParent({
            type: "ALERT_MODAL",
            payload: {
              status: false,
              errorType: "",
              id: "",
              name: "",
              newItemForm: true,
              editItemForm: false,
              cartItemForm: false,
            },
          })
        }
      >
        OK
      </button>
    ),
    duplicateEdit: (
      <button
        className={styles.buttonGreen}
        onClick={() => duplicateEditOnClick()}
      >
        OK
      </button>
    ),
    add: (
      <button
        className={styles.buttonGreen}
        onClick={() =>
          dispatchParent({
            type: "ALERT_MODAL",
            payload: {
              status: false,
              errorType: "",
              id: "",
              name: "",
              newItemForm: false,
              editItemForm: false,
              cartItemForm: false,
            },
          })
        }
      >
        OK
      </button>
    ),
    remove: (
      <>
        <button
          className={styles.buttonGreen}
          onClick={() => handleRemoveItem()}
        >
          OK
        </button>
        <button
          className={styles.buttonRed}
          onClick={() =>
            dispatchParent({
              type: "ALERT_MODAL",
              payload: {
                status: false,
                errorType: "",
                id: "",
                name: "",
                newItemForm: false,
                editItemForm: false,
                cartItemForm: false,
              },
            })
          }
        >
          Cancel
        </button>
      </>
    ),
    removeCart: (
      <>
        <button
          className={styles.buttonGreen}
          onClick={() => handleRemoveCartItem()}
        >
          OK
        </button>
        <button
          className={styles.buttonRed}
          onClick={() =>
            dispatchParent({
              type: "ALERT_MODAL",
              payload: {
                status: false,
                errorType: "",
                id: "",
                name: "",
                newItemForm: false,
                editItemForm: false,
                cartItemForm: true,
              },
            })
          }
        >
          Cancel
        </button>
      </>
    ),
    cancel: (
      <>
        <button
          className={styles.buttonGreen}
          onClick={() =>
            dispatchParent({
              type: "ALERT_MODAL",
              payload: {
                status: false,
                errorType: "",
                id: "",
                name: "",
                newItemForm: false,
                editItemForm: true,
                cartItemForm: false,
              },
            })
          }
        >
          Cancel
        </button>
        <button className={styles.buttonRed} onClick={() => handleDiscard()}>
          Discard
        </button>
      </>
    ),
  };
  const alertMessage = {
    empty: (
      <p className={styles.message}>Provide sufficient product details.</p>
    ),
    duplicate: (
      <p className={styles.message}>
        The product <em>{name}</em> is already in list.
      </p>
    ),
    duplicateEdit: (
      <p className={styles.message}>
        The product <em>{name}</em> is already in list.
      </p>
    ),
    add: (
      <p className={styles.message}>
        The new product <br />
        <b>
          <em>"{name}"</em>
        </b>
        <br />
        has been successfully added to the Menu.
      </p>
    ),
    remove: (
      <p className={styles.message}>
        Are you sure you want to delete this product?
        <br />
        Click ‘OK’ to delete the current product or
        <br />
        ‘Cancel’ to go back to product list.
      </p>
    ),
    removeCart: (
      <p className={styles.message}>
        Are you sure you want to delete this product in your cart?
        <br />
        Click ‘OK’ to delete the current product or
        <br />
        ‘Cancel’ to go continue ordering.
      </p>
    ),
    cancel: <p className={styles.message}>Discard draft?</p>,
  };

  return (
    <div>
      <div className={styles.container}>
        {alertType[errorType]}
        {/* <div className={styles.header}>Alert</div> */}
        {alertMessage[errorType]}
        <div className={styles.buttonContainer}>{buttonType[errorType]}</div>
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
};

export default Alert;
