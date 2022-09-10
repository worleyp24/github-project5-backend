import React, { useReducer } from "react";
import styles from "../styles/NewItem.module.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const NewItem = ({ optionsCategories, dispatchParent, products }) => {
  const initialState = {
    newItem: {
      id: uuidv4(),
      discount: "",
      image: "",
      name: "",
      category: [],
      price: "",
      description: "",
    },
    image: "",
    name: "",
    category: [],
    bestseller: false,
    new: false,
    price: "",
    description: "",
    newCategory: "",
    newCategoryInput: false,
  };

  //Reducer Setup
  const reducer = (state, action) => {
    switch (action.type) {
      case "NEW_ITEM": {
        return {
          ...state,
          newItem: { ...state.newItem, ...action.payload },
        };
      }
      case "NEW_ITEM_IMAGE": {
        return {
          ...state,
          image: action.payload.image,
        };
      }
      case "NEW_ITEM_NAME": {
        return {
          ...state,
          name: action.payload.name,
        };
      }
      case "NEW_ITEM_CATEGORY": {
        return {
          ...state,
          category: [action.payload.category],
        };
      }
      case "NEW_ITEM_PRICE": {
        return {
          ...state,
          price: action.payload.price,
        };
      }
      case "NEW_ITEM_DESCRIPTION": {
        return {
          ...state,
          description: action.payload.description,
        };
      }
      case "NEW_ITEM_BESTSELLER": {
        return {
          ...state,
          bestseller: action.payload.bestseller,
        };
      }
      case "NEW_ITEM_NEW": {
        return {
          ...state,
          new: action.payload.new,
        };
      }
      case "NEW_CATEGORY": {
        return {
          ...state,
          newCategory: action.payload.newCategory,
        };
      }
      case "NEW_CATEGORY_INPUT": {
        return {
          ...state,
          newCategoryInput: action.payload.newCategoryInput,
        };
      }
      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // Function for onChange of input & select box
  const onChange = (e) => {
    const inputName = e.target.name;
    switch (inputName) {
      case "image":
        dispatch({
          type: "NEW_ITEM",
          payload: { image: e.target.value },
        });
        dispatch({
          type: "NEW_ITEM_IMAGE",
          payload: { image: e.target.value },
        });
        break;
      case "name":
        dispatch({
          type: "NEW_ITEM",
          payload: { name: e.target.value },
        });
        dispatch({
          type: "NEW_ITEM_NAME",
          payload: { name: e.target.value },
        });
        break;
      case "category":
        if (e.target.value === "Add New Category") {
          dispatch({
            type: "NEW_CATEGORY_INPUT",
            payload: { newCategoryInput: true },
          });
        } else if (state.new && state.bestseller) {
          dispatch({
            type: "NEW_ITEM",
            payload: { category: [e.target.value, "New", "Best Seller"] },
          });
          dispatch({
            type: "NEW_CATEGORY_INPUT",
            payload: { newCategoryInput: false },
          });
        } else if (state.bestseller) {
          dispatch({
            type: "NEW_ITEM",
            payload: { category: [e.target.value, "Best Seller"] },
          });
          dispatch({
            type: "NEW_CATEGORY_INPUT",
            payload: { newCategoryInput: false },
          });
        } else if (state.new) {
          dispatch({
            type: "NEW_ITEM",
            payload: { category: [e.target.value, "New"] },
          });
          dispatch({
            type: "NEW_CATEGORY_INPUT",
            payload: { newCategoryInput: false },
          });
        } else {
          dispatch({
            type: "NEW_ITEM",
            payload: { category: [e.target.value] },
          });
          dispatch({
            type: "NEW_CATEGORY_INPUT",
            payload: { newCategoryInput: false },
          });
        }
        dispatch({
          type: "NEW_ITEM_CATEGORY",
          payload: { category: e.target.value },
        });
        break;
      case "price":
        dispatch({
          type: "NEW_ITEM",
          payload: { price: parseInt(e.target.value) },
        });
        dispatch({
          type: "NEW_ITEM_PRICE",
          payload: { price: parseInt(e.target.value) },
        });
        break;
      case "description":
        dispatch({
          type: "NEW_ITEM",
          payload: { description: e.target.value },
        });
        dispatch({
          type: "NEW_ITEM_DESCRIPTION",
          payload: { description: e.target.value },
        });
        break;
      case "bestseller":
        if (e.target.checked) {
          dispatch({
            type: "NEW_ITEM",
            payload: { category: [...state.newItem.category, "Best Seller"] },
          });
          dispatch({
            type: "NEW_ITEM_BESTSELLER",
            payload: { bestseller: !state.bestseller },
          });
        } else {
          dispatch({
            type: "NEW_ITEM",
            payload: {
              category: state.newItem.category.filter(
                (category) => category !== "Best Seller"
              ),
            },
          });
          dispatch({
            type: "NEW_ITEM_BESTSELLER",
            payload: { bestseller: !state.bestseller },
          });
        }
        break;
      case "new":
        if (e.target.checked) {
          dispatch({
            type: "NEW_ITEM",
            payload: { category: [...state.newItem.category, "New"] },
          });
          dispatch({
            type: "NEW_ITEM_NEW",
            payload: { new: !state.new },
          });
        } else {
          dispatch({
            type: "NEW_ITEM",
            payload: {
              category: state.newItem.category.filter(
                (category) => category !== "New"
              ),
            },
          });
          dispatch({
            type: "NEW_ITEM_NEW",
            payload: { new: !state.new },
          });
        }
        break;
      case "newCategory":
        dispatch({
          type: "NEW_CATEGORY",
          payload: { newCategory: e.target.value },
        });
        break;
      default:
        break;
    }
  };

  const onKeyUp = (event) => {
    if (event.charCode === 13) {
      dispatchParent({
        type: "ADD_NEW_CATEGORY",
        payload: state.newCategory,
      });
      dispatch({
        type: "NEW_CATEGORY_INPUT",
        payload: { newCategoryInput: false },
      });
      dispatch({
        type: "NEW_ITEM_CATEGORY",
        payload: { category: state.newCategory },
      });
      if (state.new && state.bestseller) {
        dispatch({
          type: "NEW_ITEM",
          payload: { category: [state.newCategory, "New", "Best Seller"] },
        });
      } else if (state.bestseller) {
        dispatch({
          type: "NEW_ITEM",
          payload: { category: [state.newCategory, "Best Seller"] },
        });
      } else if (state.new) {
        dispatch({
          type: "NEW_ITEM",
          payload: { category: [state.newCategory, "New"] },
        });
      } else {
        dispatch({
          type: "NEW_ITEM",
          payload: { category: [state.newCategory] },
        });
      }
    }
  };

  const handleAddItemClick = () => {
    const duplicateCheck = products.filter(
      (item) =>
        item.name.toLowerCase() === state.newItem.name.toLowerCase().trim()
    );
    if (
      state.newItem.name.trim() === "" ||
      state.newItem.price === "" ||
      state.newItem.category === ""
    ) {
      dispatchParent({
        type: "ALERT_MODAL",
        payload: {
          status: true,
          errorType: "empty",
          id: "",
          name: "",
          newItemForm: false,
          editItemForm: false,
          cartItemForm: false,
        },
      });
    } else if (duplicateCheck.length > 0) {
      dispatchParent({
        type: "ALERT_MODAL",
        payload: {
          status: true,
          errorType: "duplicate",
          id: "",
          name: duplicateCheck[0].name,
          newItemForm: false,
          editItemForm: false,
          cartItemForm: false,
        },
      });
    } else {
      axios
        .post("http://localhost:8080/Menu", state.newItem)
        .then((response) => {
          dispatchParent({
            type: "ADD_NEW_ITEM",
            payload: { newItem: state.newItem, newItemForm: false },
          });
          dispatchParent({
            type: "ALERT_MODAL",
            payload: {
              status: true,
              errorType: "add",
              id: "",
              name: state.newItem.name,
              newItemForm: false,
              editItemForm: false,
              cartItemForm: false,
            },
          });
        });
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
            value={state.name}
            onChange={onChange}
            placeholder="Enter the product name"
          />
          <span
            className={styles.closebtn}
            onClick={() =>
              dispatchParent({
                type: "ADD_ITEM_FORM",
                payload: false,
              })
            }
          >
            x
          </span>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.bucket}>
            <label className={styles.label}>Product Category: </label>
            <select name="category" value={state.category} onChange={onChange}>
              <option value="" disabled selected hidden>
                Please Choose...
              </option>
              {optionsCategories}
              <option value="Add New Category">+Add New Category</option>
            </select>
          </div>

          <div className={styles.bucket}>
            <label className={styles.label}>Product Price: </label>
            <input
              className={styles.price}
              name="price"
              type="number"
              value={state.price}
              onChange={onChange}
            />
          </div>
          <div className={styles.bucket}>
            <div className={styles.wrapper}>
              <input
                name="bestseller"
                type="checkbox"
                checked={state.bestseller}
                onChange={onChange}
              />
              <label className={styles.label}>Best Seller </label>
            </div>
            <div className={styles.wrapper}>
              <input
                name="new"
                type="checkbox"
                checked={state.new}
                onChange={onChange}
              />
              <label className={styles.label}>New </label>
            </div>
          </div>
          {state.newCategoryInput ? (
            <div className={styles.bucket}>
              <label className={styles.label}>New Category </label>
              <input
                className={styles.newCategory}
                name="newCategory"
                type="text"
                value={state.newCategory}
                onChange={onChange}
                onKeyPress={onKeyUp}
                placeholder="Enter a New Category"
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.inputContainer2}>
          <label className={styles.label}>Image url: </label>
          <input
            className={styles.image}
            name="image"
            type="url"
            value={state.image}
            onChange={onChange}
            placeholder="Enter the image url"
          />
          <label className={styles.label}>Product Description: </label>
          <input
            className={styles.description}
            name="description"
            type="text"
            value={state.description}
            onChange={onChange}
            placeholder="Enter the details"
          />
        </div>
        <div className={styles.footer}>
          <button onClick={() => handleAddItemClick()}>Add Item</button>
        </div>
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
};

export default NewItem;
