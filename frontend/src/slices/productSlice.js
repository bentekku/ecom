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
      const {
        searchTerm = "",
        activeCategory = "",
        selectedColor = "",
        selectedFilter = "",
      } = action.payload;
      let updatedProducts = state.items;

      if (searchTerm.trim()) {
        updatedProducts = updatedProducts.filter((prod) =>
          prod.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (activeCategory) {
        if (activeCategory === "all") {
          updatedProducts = state.items;
          console.log(updatedProducts);
        } else {
          updatedProducts = updatedProducts.filter(
            (prod) =>
              prod.category.toLowerCase() === activeCategory.toLowerCase()
          );
          console.log(updatedProducts);
        }
      }

      if (selectedColor !== "all") {
        updatedProducts = updatedProducts.filter((prod) => {
          if (Array.isArray(prod.color)) {
            return prod.color.some(
              (col) => col.toLowerCase() === selectedColor.toLowerCase()
            );
          }
          return prod.color.toLowerCase() === selectedColor.toLowerCase();
        });
      }

      // Sorting
      switch (selectedFilter) {
        case "price-low":
          updatedProducts = [...updatedProducts].sort(
            (a, b) => a.price - b.price
          );
          break;

        case "price-high":
          updatedProducts = [...updatedProducts].sort(
            (a, b) => b.price - a.price
          );
          break;

        case "pop-low":
          updatedProducts = [...updatedProducts].sort(
            (a, b) => a.isMostPopular - b.isMostPopular
          );
          break;

        case "pop-high":
          updatedProducts = [...updatedProducts].sort(
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
