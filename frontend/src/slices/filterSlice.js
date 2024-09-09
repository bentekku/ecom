import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "default",
  reducers: {
    setSelectedFilter: (state, action) => action.payload,
  },
});

export const { setSelectedFilter } = filterSlice.actions;

export default filterSlice.reducer;
