import { createSlice } from "@reduxjs/toolkit";

const visibilitySlice = createSlice({
  name: "visibility",
  initialState: 5,
  reducers: {
    loadMore: (state) => state + 5,
  },
});

export const { loadMore } = visibilitySlice.actions;

export default visibilitySlice.reducer;
