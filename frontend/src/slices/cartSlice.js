import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching product details
export const fetchProductDetails = createAsyncThunk(
  "cart/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue("Error fetching product details");
    }
  }
);

const initialState = {
  productDetails: null,
  quantity: 1,
  itemsInCart: JSON.parse(localStorage.getItem("itemsInCart")) || [], // Initialize from localStorage
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementQuantity: (state) => {
      if (state.quantity < 15) state.quantity += 1;
    },
    decrementQuantity: (state) => {
      if (state.quantity > 1) state.quantity -= 1;
    },
    resetCart: (state) => {
      state.productDetails = null;
      state.quantity = 1;
      state.loading = false;
      state.error = null;
      state.itemsInCart = []; // Clear cart
      localStorage.removeItem("itemsInCart"); // Clear localStorage
    },
    addToCart: (state, action) => {
      const { id, name, price, quantity, imgURL } = action.payload;

      const existingItemIndex = state.itemsInCart.findIndex(
        (cartItem) => cartItem.id === id
      );

      if (existingItemIndex >= 0) {
        state.itemsInCart[existingItemIndex].quantity += quantity;
      } else {
        state.itemsInCart.push({ id, name, price, quantity, imgURL });
      }

      localStorage.setItem("itemsInCart", JSON.stringify(state.itemsInCart)); // Save to localStorage
    },
    removeFromCart: (state, action) => {
      const index = state.itemsInCart.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        state.itemsInCart.splice(index, 1);
        localStorage.setItem("itemsInCart", JSON.stringify(state.itemsInCart)); // Save to localStorage
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  incrementQuantity,
  decrementQuantity,
  resetCart,
  addToCart,
  removeFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
