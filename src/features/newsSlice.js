import { createSlice } from "@reduxjs/toolkit";

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    bbcArticles: [],
    searchResults: [],
    categoryArticles: {},
    loading: false,
    error: null,
  },
  reducers: {},
});

export default newsSlice.reducer;
