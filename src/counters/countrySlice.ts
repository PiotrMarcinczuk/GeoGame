import { createSlice } from "@reduxjs/toolkit";

export const countrySlice = createSlice({
  name: "country",
  initialState: null,
  reducers: {
    setCountryData: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { setCountryData } = countrySlice.actions;
export default countrySlice.reducer;
