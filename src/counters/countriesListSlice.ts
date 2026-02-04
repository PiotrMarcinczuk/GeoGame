import { createSlice } from "@reduxjs/toolkit";

export const countriesSlice = createSlice({
  name: "countries",
  initialState: [],
  reducers: {
    setCountriesList: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCountriesList } = countriesSlice.actions;
export default countriesSlice.reducer;
