import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "../counters/countrySlice";
export default configureStore({
  reducer: {
    country: countryReducer,
  },
});
