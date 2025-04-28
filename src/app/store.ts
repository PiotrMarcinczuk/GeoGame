import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "../counters/countrySlice";
import correctCountryReducer from "../counters/correctCountrySlice";
import countriesListReducer from "../counters/countriesListSlice";
export default configureStore({
  reducer: {
    country: countryReducer,
    correctCountry: correctCountryReducer,
    countries: countriesListReducer,
  },
});
