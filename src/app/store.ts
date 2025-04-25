import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "../counters/countrySlice";
import correctCountryReducer from "../counters/correctCountrySlice";
export default configureStore({
  reducer: {
    country: countryReducer,
    correctCountry: correctCountryReducer,
  },
});
