import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
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
