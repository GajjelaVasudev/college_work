import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    list: []
  },
  reducers: {
    addFeedback: (state, action) => {
      state.list.push(action.payload);
    },
    clearFeedback: (state) => {
      state.list = [];
    }
  }
});

export const { addFeedback, clearFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
