import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "../counters/countrySlice";
import correctCountryReducer from "../counters/correctCountrySlice";
import countriesListReducer from "../counters/countriesListSlice";
import loadingReducer from "../counters/loadingSlice";

export default configureStore({
  reducer: {
    country: countryReducer,
    correctCountry: correctCountryReducer,
    countries: countriesListReducer,
    loading: loadingReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
