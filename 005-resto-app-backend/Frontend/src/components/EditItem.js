import React, { useState } from "react";
import styles from "../styles/NewItem.module.css";
import axios from "axios";

const EditItem = ({
  forEdit,
  editCartItem,
  cartItem,
  optionsCategories,
  dispatchParent,
  products,
}) => {
  const [editItem, setEditItem] = useState({
    id: forEdit.id,
    discount: forEdit.discount,
    image: forEdit.image,
    name: forEdit.name,
    category: forEdit.category,
    price: forEdit.price,
    description: forEdit.description,
    quantity: editCartItem.quantity,
  });

  const [valueBestSeller, setValueBestSeller] = useState(
    editItem.category.includes("Best Seller") ? true : false
  );
  const [valueNew, setValueNew] = useState(
    editItem.category.includes("New") ? true : false
  );

  const handleEditItem = () => {
    if (cartItem.length <= 0) {
      axios
        .put(`http://localhost:8080/Menu/${editItem.id}`, editItem)
        .then((response) => {
          dispatchParent({
            type: "EDIT_ITEM",
            payload: {
              id: editItem.id,
              discount: editItem.discount,
              image: editItem.image,
              name: editItem.name,
              category: editItem.category,
              price: editItem.price,
              description: editItem.description,
            },
          });
        });
    } else {
      axios
        .put(`http://localhost:8080/Menu/${editItem.id}`, editItem)
        .then((response) => {
          dispatchParent({
            type: "EDIT_ITEM",
            payload: {
              id: editItem.id,
              discount: editItem.discount,
              image: editItem.image,
              name: editItem.name,
              category: editItem.category,
              price: editItem.price,
              description: editItem.description,
            },
          });
        });
      axios
        .put(`http://localhost:8080/Cart/${editItem.id}`, editItem)
        .then((response) => {
          dispatchParent({
            type: "EDIT_CART_ITEM",
            payload: {
              id: editItem.id,
              discount: editItem.discount,
              image: editItem.image,
              name: editItem.name,
              category: editItem.category,
              price: editItem.price,
              description: editItem.description,
              quantity: editItem.quantity,
            },
          });
        });
    }
  };

  const editItemClick = () => {
    const duplicateCheck = products.filter(
      (item) => item.name.toLowerCase() === editItem.name.toLowerCase().trim()
    );
    if (
      editItem.name.trim() === "" ||
      isNaN(editItem.price) ||
      editItem.price <= 0
    ) {
      setEditItem({
        ...editItem,
        name: forEdit.name,
        category: forEdit.category,
        price: forEdit.price,
      });
    } else if (editItem.name.trim() === forEdit.name) {
      setEditItem({
        ...editItem,
        name: editItem.name,
      });
      handleEditItem();
    } else if (duplicateCheck.length > 0) {
      dispatchParent({
        type: "ALERT_MODAL",
        payload: {
          status: true,
          errorType: "duplicateEdit",
          id: "",
          name: duplicateCheck[0].name,
          newItemForm: false,
          editItemForm: false,
          cartItemForm: false,
        },
      });
    } else {
      handleEditItem();
    }
  };

  // Function for onChange of input & select box
  const onChange = (e) => {
    const inputName = e.target.name;
    switch (inputName) {
      case "image":
        setEditItem({
          ...editItem,
          image: e.target.value,
        });
        break;
      case "name":
        setEditItem({
          ...editItem,
          name: e.target.value,
        });
        break;
      case "category":
        if (
          editItem.category.includes("Best Seller") &&
          editItem.category.includes("New")
        ) {
          setEditItem({
            ...editItem,
            category: ["New", e.target.value, "Best Seller"],
          });
        } else if (editItem.category.includes("Best Seller")) {
          setEditItem({
            ...editItem,
            category: [e.target.value, "Best Seller"],
          });
        } else if (editItem.category.includes("New")) {
          setEditItem({
            ...editItem,
            category: ["New", e.target.value],
          });
        } else {
          setEditItem({
            ...editItem,
            category: [e.target.value],
          });
        }
        break;
      case "price":
        setEditItem({
          ...editItem,
          price: parseInt(e.target.value),
        });
        break;
      case "description":
        setEditItem({
          ...editItem,
          description: e.target.value,
        });
        break;
      case "bestseller":
        if (e.target.checked && valueBestSeller === false) {
          setEditItem({
            ...editItem,
            category: [...editItem.category, "Best Seller"],
          });
          setValueBestSeller(!valueBestSeller);
        } else {
          setEditItem({
            ...editItem,
            category: editItem.category.filter(
              (category) => category !== "Best Seller"
            ),
          });
          setValueBestSeller(!valueBestSeller);
        }
        break;
      case "new":
        if (e.target.checked && valueNew === false) {
          setEditItem({
            ...editItem,
            category: [...editItem.category, "New"],
          });
          setValueNew(!valueNew);
        } else {
          setEditItem({
            ...editItem,
            category: editItem.category.filter(
              (category) => category !== "New"
            ),
          });
          setValueNew(!valueNew);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <input
            className={styles.name}
            name="name"
            type="text"
            value={editItem.name}
            onChange={onChange}
            placeholder="Enter the product name"
          />
          <span
            className={styles.closebtn}
            onClick={() =>
              dispatchParent({
                type: "ALERT_MODAL",
                payload: {
                  status: true,
                  errorType: "cancel",
                  id: "",
                  name: "",
                  newItemForm: false,
                  editItemForm: false,
                  cartItemForm: false,
                },
              })
            }
          >
            x
          </span>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.bucket}>
            <label className={styles.label}>Product Category: </label>
            <select
              name="category"
              value={editItem.category
                .filter((category) => category !== "New")
                .filter((category) => category !== "Best Seller")}
              onChange={onChange}
            >
              <option value="" disabled selected hidden>
                Please Choose...
              </option>
              {optionsCategories}
            </select>
          </div>
          <div className={styles.bucket}>
            <label className={styles.label}>Product Price: </label>
            <input
              className={styles.price}
              name="price"
              type="number"
              value={editItem.price}
              onChange={onChange}
            />
          </div>
          <div className={styles.bucket}>
            <div className={styles.wrapper}>
              <input
                name="bestseller"
                type="checkbox"
                checked={valueBestSeller}
                onChange={onChange}
              />
              <label className={styles.label}>Best Seller </label>
            </div>
            <div className={styles.wrapper}>
              <input
                name="new"
                type="checkbox"
                checked={valueNew}
                onChange={onChange}
              />
              <label className={styles.label}>New </label>
            </div>
          </div>
        </div>
        <div className={styles.inputContainer2}>
          <label className={styles.label}>Image url: </label>
          <input
            className={styles.image}
            name="image"
            type="url"
            value={editItem.image}
            onChange={onChange}
            placeholder="Enter the image url"
          />
          <label className={styles.label}>Product Description: </label>
          <input
            className={styles.description}
            name="description"
            type="text"
            value={editItem.description}
            onChange={onChange}
            placeholder="Enter the details"
          />
        </div>
        <div className={styles.footer}>
          <button className="submit-btn" onClick={() => editItemClick()}>
            Edit Item
          </button>
        </div>
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
};

export default EditItem;
