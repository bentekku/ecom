import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/productSlice";
import categoryReducer from "../slices/categorySlice";
import colorReducer from "../slices/colorSlice";
import filterReducer from "../slices/filterSlice";
import visibilityReducer from "../slices/visibilitySlice";
import cartReducer from "../slices/cartSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    category: categoryReducer,
    color: colorReducer,
    filter: filterReducer,
    visibility: visibilityReducer,
    cart: cartReducer,
  },
});

export default store;
