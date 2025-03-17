import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";
const CACHE_EXPIRATION = 30 * 60 * 1000;
const VALID_CATEGORIES = [
  "sport",
  "business",
  "health",
  "science",
  "technology",
  "entertainment",
];

const getCachedData = (key) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_EXPIRATION) {
    localStorage.removeItem(key);
    return null;
  }
  return data;
};

const cacheData = (key, data) => {
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
};

export const fetchBBCNews = async () => {
  const cacheKey = "bbc_news";
  const cachedData = getCachedData(cacheKey);
  if (cachedData) return cachedData;

  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        sources: "bbc-news",
        apiKey: API_KEY,
      },
    });
    const articles = response.data.articles;
    cacheData(cacheKey, articles);
    return articles;
  } catch (error) {
    throw new Error("Failed to fetch BBC News: " + error);
  }
};

export const fetchNewsByCategory = async (category) => {
  const cacheKey = `news_${category}`;
  const cachedData = getCachedData(cacheKey);
  if (cachedData) return cachedData;

  const params = {
    country: "us",
    apiKey: API_KEY,
  };

  if (VALID_CATEGORIES.includes(category)) {
    params.category = category;
  }

  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, { params });
    const articles = response.data.articles;
    cacheData(cacheKey, articles);
    return articles;
  } catch (error) {
    throw new Error(`Failed to fetch news: ` + error);
  }
};

export const fetchSearchResults = async ({ query, page = 1 }) => {
  if (!query) return { articles: [], totalResults: 0 };

  const cacheKey = `search_${query}_page_${page}`;
  const cachedData = getCachedData(cacheKey);
  if (cachedData) return cachedData;

  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: query,
        page,
        pageSize: 12,
        sortBy: "publishedAt",
        language: "en", // Hanya ambil artikel yang berbahasa Inggris
        apiKey: API_KEY,
      },
    });

    // Filter hanya artikel yang memiliki sumber (source.name)
    const filteredArticles = response.data.articles.filter(
      (article) => article.source?.name
    );

    const data = {
      articles: filteredArticles,
      totalResults: filteredArticles.length, // Sesuaikan total hasil setelah filter
    };

    cacheData(cacheKey, data);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch search results: ${error}`);
  }
};
