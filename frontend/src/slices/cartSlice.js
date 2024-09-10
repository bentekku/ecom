import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch product details (example)
export const fetchProductDetails = createAsyncThunk(
  "cart/fetchProductDetails",
  async (productId) => {
    const response = await fetch(`/api/products/${productId}`); // Update with your API endpoint
    const data = await response.json();
    return data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsInCart: [],
    productDetails: null,
    quantity: 1, // Initial quantity
    loading: false,
    error: null,
  },
  reducers: {
    incrementQuantity: (state) => {
      state.quantity += 1; // Increase quantity
    },
    decrementQuantity: (state) => {
      if (state.quantity > 1) {
        state.quantity -= 1; // Decrease quantity but keep it above 1
      }
    },
    addToCart: (state, action) => {
      state.itemsInCart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.itemsInCart = state.itemsInCart.filter(
        (item) => item.id !== productId
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
