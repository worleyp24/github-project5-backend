import React from "react";
import ProductBox from "../components/ProductBox";
import FilterItem from "../components/FilterItem";
import NewItem from "../components/NewItem";
import styles from "../styles/Menu.module.css";
import EditItem from "../components/EditItem";
import { Routes, Route, Link } from "react-router-dom";
import Alert from "../components/Alert";

const Menu = ({
  products,
  newItemForm,
  dispatchPL,
  editItemForm,
  editItem,
  editCartItem,
  cartItem,
  alertModal,
  devMode,
  allCategories,
}) => {
  // Map all items
  const listItem =
    products.length === 0 ? (
      <p>No available products.</p>
    ) : (
      products.map((item, index) => (
        <ProductBox
          key={index}
          {...item}
          cartItem={cartItem}
          dispatch={dispatchPL}
          devMode={devMode}
        />
      ))
    );

  // Extract categories from list of products
  // const allCategories = products
  //   .flatMap((item) => item.category)
  //   .reduce((categories, item) => {
  //     if (!categories.includes(item)) {
  //       categories.push(item);
  //     }
  //     return categories;
  //   }, []);

  const categories = allCategories
    .filter((category) => category !== "New")
    .filter((category) => category !== "Best Seller");

  const optionsCategories = categories.map((category, index) => {
    return (
      <option key={category} value={category}>
        {category}
      </option>
    );
  });

  // If there is a "Best Seller" in category list, this code will relocate its position to 0 index
  if (allCategories.includes("Best Seller")) {
    categories.unshift("Best Seller");
  }

  // If there is a "New" in category list, this code will relocate its position to 0 index
  if (allCategories.includes("New")) {
    categories.unshift("New");
  }

  // Map Links for categories
  const links = categories.map((category) => {
    return (
      <li key={category}>
        <Link to={category}> {category}</Link>
      </li>
    );
  });

  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <h1 className={styles.header}>WELCOME TO OUR STORE</h1>
        <h2 className={styles.description}>
          <em>OUR RAMEN SUCKS!</em>
        </h2>
        <p>(better try to verify)</p>
        <ul className={styles.navigation}>
          <li>
            <Link to="">All</Link>
          </li>
          {links}
        </ul>
        {devMode ? (
          <button
            className={styles.addNewItembtn}
            onClick={() =>
              dispatchPL({
                type: "ADD_ITEM_FORM",
                payload: true,
              })
            }
          >
            Add New Item
          </button>
        ) : (
          ""
        )}
        {/* Modal for Add New Item */}
        {newItemForm ? (
          <NewItem
            optionsCategories={optionsCategories}
            dispatchParent={dispatchPL}
            products={products}
          />
        ) : (
          ""
        )}
        {/* Modal for Edit Existing Item */}
        {editItemForm ? (
          <EditItem
            optionsCategories={optionsCategories}
            dispatchParent={dispatchPL}
            forEdit={editItem}
            editCartItem={editCartItem}
            cartItem={cartItem}
            products={products}
          />
        ) : (
          ""
        )}
        {/* Modal for Alert */}
        {alertModal.status && alertModal.errorType !== "removeCart" ? (
          <Alert
            {...alertModal}
            stateParent={products}
            dispatchParent={dispatchPL}
          />
        ) : (
          ""
        )}
        <div className={styles.wrapper}>
          <Routes>
            <Route path="/" element={listItem} />
            <Route
              path=":status"
              element={
                <FilterItem
                  products={products}
                  dispatch={dispatchPL}
                  devMode={devMode}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Menu;
