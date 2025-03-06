import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    bookmarks: [],
    role: "",
  },
  reducers: {
    //actions
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setBookmarks: (state, action) => {
      state.bookmarks = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setUser, setBookmarks, setRole } = authSlice.actions;
export default authSlice.reducer;
