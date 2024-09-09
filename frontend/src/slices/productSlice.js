import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("/api/products");
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filteredItems: [],
    status: "idle",
    error: null,
  },
  reducers: {
    filterProducts: (state, action) => {
      // Apply filters here
      const { searchTerm, activeCategory, selectedColor, selectedFilter } =
        action.payload;
      let updatedProducts = state.items;

      if (searchTerm.trim()) {
        updatedProducts = updatedProducts.filter((prod) =>
          prod.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (activeCategory !== "all") {
        updatedProducts = updatedProducts.filter(
          (prod) => prod.category.toLowerCase() === activeCategory
        );
      }

      if (selectedColor) {
        updatedProducts = updatedProducts.filter(
          (prod) => prod.color.toLowerCase() === selectedColor
        );
      }

      switch (selectedFilter) {
        case "price-low":
          updatedProducts = updatedProducts.sort((a, b) => a.price - b.price);
          break;

        case "price-high":
          updatedProducts = updatedProducts.sort((a, b) => b.price - a.price);
          break;

        case "pop-low":
          updatedProducts = updatedProducts.sort(
            (a, b) => a.isMostPopular - b.isMostPopular
          );
          break;

        case "pop-high":
          updatedProducts = updatedProducts.sort(
            (a, b) => b.isMostPopular - a.isMostPopular
          );
          break;

        default:
          break;
      }

      state.filteredItems = updatedProducts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { filterProducts } = productSlice.actions;
export default productSlice.reducer;
