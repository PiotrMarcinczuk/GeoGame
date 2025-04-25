import { createSlice } from "@reduxjs/toolkit";

export const correctCountrySlice = createSlice({
  name: "correctCountry",
  initialState: null,
  reducers: {
    setCorrectCountry: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { setCorrectCountry } = correctCountrySlice.actions;
export default correctCountrySlice.reducer;
