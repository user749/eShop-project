import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cart from "./slices/cart";
import products from "./slices/products";
import user from "./slices/user";

const reducer = combineReducers({
  products,
  cart,
  user,
});

export default configureStore({
  reducer,
});
