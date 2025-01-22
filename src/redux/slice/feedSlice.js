import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: [],
  },
  reducers: {
    addFeedUsers: (state, action) => {
        state.feed = action.payload
    },
    removeFeedUser: (state, action) => {
      state.feed = state.feed.filter((user) => user._id !== action.payload);
    },
  },
});

export const { addFeedUsers, removeFeedUser } = feedSlice.actions;
export default feedSlice.reducer;
