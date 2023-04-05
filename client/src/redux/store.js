import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cart from "./slices/cart";
import products from "./slices/products";

const reducer = combineReducers({
  products,
  cart,
});

export default configureStore({
  reducer,
});
