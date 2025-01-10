import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
    adminJobs: [],
    searchQuery: null,
    searchJobs: [],
  },
  reducers: {
    //actions
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAdminJobs: (state, action) => {
      state.adminJobs = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchJobs: (state, action) => {
      state.searchJobs = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAdminJobs,
  setSearchJobs,
  setSearchQuery,
} = jobSlice.actions;
export default jobSlice.reducer;
