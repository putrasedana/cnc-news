import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

// Fetch news top headlines
export const fetchTopHeadlines = createAsyncThunk(
  "news/fetchTopHeadlines",
  async (_, { getState, rejectWithValue }) => {
    const { lastFetched } = getState().news;

    if (lastFetched) {
      return rejectWithValue("Data already exists, skip fetch.");
    }

    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: { country: "us", apiKey: API_KEY },
    });

    return {
      articles: response.data.articles,
      lastFetched: Date.now(),
    };
  }
);

// Fetch news by category
export const fetchNewsByCategory = createAsyncThunk(
  "news/fetchNewsByCategory",
  async (category, { getState, rejectWithValue }) => {
    const { categoryArticles } = getState().news;

    if (categoryArticles[category]) {
      return rejectWithValue(
        `Data for '${category}' already exists, skip fetch.`
      );
    }

    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: { category, country: "us", apiKey: API_KEY },
    });

    return {
      category,
      articles: response.data.articles,
    };
  }
);

export const fetchSearchResults = createAsyncThunk(
  "news/fetchSearchResults",
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/everything`, {
        params: {
          q: query,
          apiKey: API_KEY,
          language: "en",
          sortBy: "relevancy",
          page,
          pageSize: 5, // Adjust the number of articles per page
        },
      });

      return {
        articles: response.data.articles,
        totalResults: response.data.totalResults,
        page,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch every news from BBC
export const fetchBBCNews = createAsyncThunk(
  "news/fetchBBCNews",
  async (_, { getState, rejectWithValue }) => {
    const { lastFetched } = getState().news;

    if (lastFetched) {
      return rejectWithValue("BBC News data already exists, skip fetch.");
    }

    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: { sources: "bbc-news", apiKey: API_KEY },
    });

    return {
      articles: response.data.articles,
      lastFetched: Date.now(),
    };
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopHeadlines.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopHeadlines.fulfilled, (state, action) => {
        state.articles = action.payload.articles;
        state.lastFetched = action.payload.lastFetched;
        state.loading = false;
      })
      .addCase(fetchTopHeadlines.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          console.warn(action.payload);
        } else {
          state.error = action.error.message;
        }
      })

      // Handle fetchNewsByCategory
      .addCase(fetchNewsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsByCategory.fulfilled, (state, action) => {
        state.categoryArticles[action.payload.category] =
          action.payload.articles;
        state.loading = false;
      })
      .addCase(fetchNewsByCategory.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          console.warn(action.payload);
        } else {
          state.error = action.error.message;
        }
      })

      // Handle Search
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetchBBCNews
      .addCase(fetchBBCNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBBCNews.fulfilled, (state, action) => {
        state.loading = false;
        state.bbcArticles = action.payload.articles;
      })
      .addCase(fetchBBCNews.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          console.warn(action.payload);
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default newsSlice.reducer;
