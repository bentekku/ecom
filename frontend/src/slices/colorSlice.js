import { createSlice } from "@reduxjs/toolkit";

const colorSlice = createSlice({
  name: "color",
  initialState: "",
  reducers: {
    setSelectedColor: (state, action) => action.payload,
  },
});

export const { setSelectedColor } = colorSlice.actions;

export default colorSlice.reducer;
