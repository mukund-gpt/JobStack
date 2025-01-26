import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    bookmarks: [],
  },
  reducers: {
    //actions
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setBookmarks: (state, action) => {
      state.bookmarks = action.payload;
    },
  },
});

export const { setUser, setBookmarks } = authSlice.actions;
export default authSlice.reducer;
