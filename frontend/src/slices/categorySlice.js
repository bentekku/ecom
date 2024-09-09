import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: "all",
  reducers: {
    setActiveCategory: (state, action) => action.payload,
  },
});

export const { setActiveCategory } = categorySlice.actions;
export default categorySlice.reducer;
