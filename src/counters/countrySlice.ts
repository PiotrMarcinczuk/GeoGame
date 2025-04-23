import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
export const countrySlice = createSlice({
  name: "country",
  initialState: {
    "NE.IMP.GNFS.ZS": 0,
    "NE.EXP.GNFS.ZS": 0,
    "EG.ELC.ACCS.UR.ZS": 0,
  },
  reducers: {
    setCountryData: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { setCountryData } = countrySlice.actions;
export default countrySlice.reducer;
