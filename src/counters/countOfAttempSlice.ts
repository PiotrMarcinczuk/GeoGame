import { createSlice } from "@reduxjs/toolkit";

export const countOfAttemptSlice = createSlice({
  name: "countOfAttempt",
  initialState: 0,
  reducers: {
    incrementCountOfAttempt: (state) => {
      return (state += 1);
    },
    resetCountOfAttempt: (state) => {
      return (state = 0);
    },
  },
});

export const { incrementCountOfAttempt, resetCountOfAttempt } =
  countOfAttemptSlice.actions;
export default countOfAttemptSlice.reducer;
