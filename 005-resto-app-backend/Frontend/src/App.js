import React, { useReducer, useEffect } from "react";
import "./App.css";
// import Footer from "./components/Footer";
import Banner from "./components/Banner";
import NavBar from "./components/NavBar";
import Menu from "./pages/Menu";
import CartItem from "./pages/CartItem";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

const App = () => {
  const initialState = {
    products: [],
    newItemForm: false,
    editItemForm: false,
    editItem: {
      id: "",
      discount: "",
      image: "",
      name: "",
      category: [],
      price: "",
      description: "",
    },
    editCartItem: {
      id: "",
      discount: "",
      image: "",
      name: "",
      category: [],
      price: "",
      description: "",
      quantity: "",
    },
    cartItem: [],
    cartItemForm: false,
    alertModal: { status: false, errorType: "", id: "", name: "" },
    devMode: false,
    allCategories: [],
  };

  //Reducer Setup
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_NEW_ITEM": {
        return {
          ...state,
          products: [...state.products, action.payload.newItem],
          newItemForm: false,
        };
      }
      case "REMOVE_ITEM": {
        return {
          ...state,
          products: state.products.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      }
      case "REMOVE_CART_ITEM": {
        return {
          ...state,
          cartItem: state.cartItem.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      }
      case "ADD_TO_CART": {
        const cartCopy = [...state.cartItem];
        let updatedCart = [];
        const tartgetItem = cartCopy.filter(
          (item) => item.id === action.payload.id
        );
        if (tartgetItem.length > 0) {
          updatedCart = cartCopy.map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
        } else {
          updatedCart = [...cartCopy, { ...action.payload, quantity: 1 }];
        }
        axios.post("http://localhost:8080/Cart", updatedCart);
        return {
          ...state,
          cartItem: updatedCart,
        };
      }
      case "ADD_ITEM_FORM": {
        return {
          ...state,
          newItemForm: action.payload,
        };
      }
      case "EDIT_ITEM_FORM": {
        return {
          ...state,
          editItemForm: action.payload,
        };
      }
      case "FOR_EDIT_ITEM": {
        return {
          ...state,
          editItem: { ...state.editItem, ...action.payload },
          editItemForm: true,
        };
      }
      case "FOR_EDIT_CART_ITEM": {
        const indexOfItem = state.cartItem.findIndex(
          (item) => item.id === action.payload.id
        );
        const quantity = state.cartItem[indexOfItem]?.quantity;
        const cartItem = { ...action.payload, quantity: quantity };
        return {
          ...state,
          editCartItem: { ...state.editCartItem, ...cartItem },
        };
      }
      case "EDIT_ITEM": {
        const indexOfItem = state.products.findIndex(
          (item) => item.id === action.payload.id
        );
        const productsCopy = [...state.products];
        productsCopy.splice(indexOfItem, 1, action.payload);
        return {
          ...state,
          products: [...productsCopy],
          editItemForm: false,
        };
      }
      case "EDIT_CART_ITEM": {
        const indexOfItem = state.cartItem.findIndex(
          (item) => item.id === action.payload.id
        );
        const cartItemCopy = [...state.cartItem];
        cartItemCopy.splice(indexOfItem, 1, action.payload);
        return {
          ...state,
          cartItem: [...cartItemCopy],
        };
      }
      case "CART_ITEM_FORM": {
        return {
          ...state,
          cartItemForm: action.payload,
        };
      }
      case "DEV_MODE": {
        return {
          ...state,
          devMode: action.payload,
        };
      }
      case "ALERT_MODAL": {
        return {
          ...state,
          alertModal: {
            ...state.alertModal,
            status: action.payload.status,
            errorType: action.payload.errorType,
            id: action.payload.id,
            name: action.payload.name,
          },
          newItemForm: action.payload.newItemForm,
          editItemForm: action.payload.editItemForm,
          cartItemForm: action.payload.cartItemForm,
        };
      }
      case "LOAD_PRODUCTS": {
        return {
          ...state,
          products: action.payload,
        };
      }
      case "LOAD_CART_ITEMS": {
        return {
          ...state,
          cartItem: action.payload,
        };
      }
      case "GET_ALL_CATEGORIES": {
        const allCategories = action.payload
          .flatMap((item) => item.category)
          .reduce((categories, item) => {
            if (!categories.includes(item)) {
              categories.push(item);
            }
            return categories;
          }, []);
        return {
          ...state,
          allCategories: allCategories,
        };
      }
      case "ADD_NEW_CATEGORY": {
        return {
          ...state,
          allCategories: [...state.allCategories, action.payload],
        };
      }
      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get("http://localhost:8080/Menu").then((response) => {
      dispatch({
        type: "LOAD_PRODUCTS",
        payload: response.data,
      });
      dispatch({
        type: "GET_ALL_CATEGORIES",
        payload: response.data,
      });
    });
    axios.get("http://localhost:8080/Cart").then((response) => {
      dispatch({
        type: "LOAD_CART_ITEMS",
        payload: response.data,
      });
    });
  }, []);

  return (
    <div>
      <NavBar {...state} dispatchParent={dispatch} />
      <Banner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Menu/*"
          element={<Menu {...state} dispatchPL={dispatch} />}
        />
        <Route
          path="/Cart"
          element={<CartItem {...state} dispatchParent={dispatch} />}
        />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
