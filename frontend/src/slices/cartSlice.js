import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const response = await axios.get("/api/orders");
    return response.data; // Returning the data to be used in the slice
  }
);
// Thunk to fetch orders (cart items)

// Thunk to fetch product details
export const fetchProductDetails = createAsyncThunk(
  "cart/fetchProductDetails",
  async (productId) => {
    const response = await axios.get(`/api/products/${productId}`);
    return response.data; // Return product details from the API response
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsInCart: [],
    productDetails: null,
    quantity: 1,
    loading: false,
    error: null,
  },
  reducers: {
    incrementQuantity: (state) => {
      state.quantity += 1;
    },
    decrementQuantity: (state) => {
      if (state.quantity > 1) {
        state.quantity -= 1;
      }
    },
    addToCart: (state, action) => {
      state.itemsInCart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.itemsInCart = state.itemsInCart.filter(
        (item) => item._id !== productId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  incrementQuantity,
  decrementQuantity,
  addToCart,
  removeFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
