import React from "react";
import { useParams } from "react-router";
import ProductBox from "./ProductBox";
import styles from "../styles/FilterItem.module.css";

const FilterItem = ({ products, dispatch, devMode }) => {
  const { status } = useParams();
  const filteredProducts =
    products.filter((item) => item.category?.includes(status)).length === 0 ? (
      <p>
        No <strong>{status}</strong> products is available.
      </p>
    ) : (
      products
        .filter((item) => item.category?.includes(status))
        .map((item, index) => (
          <ProductBox
            key={index}
            {...item}
            dispatch={dispatch}
            devMode={devMode}
          />
        ))
    );
  return <div className={styles.wrapper}>{filteredProducts}</div>;
};

export default FilterItem;
