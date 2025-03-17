import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchSearchResults } from "../utils/newsApi";
import StatusMessage from "../components/StatusMessage";
import NewsCard from "../components/NewsCard";

const SearchPage = () => {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("q");
    setQuery(searchQuery || "");

    if (searchQuery) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
          const { articles } = await fetchSearchResults({
            query: searchQuery,
          });
          setSearchResults(articles);
        } catch (err) {
          setError(err.message);
        }

        setLoading(false);
      };

      fetchData();
    }
  }, [location.search]);

  return (
    <div className="container pt-24 mx-auto sm:pt-40 pb-10 sm:pb-0 sm:px-5 xl:w-[90%]">
      <h2 className="text-2xl font-bold mb-10 mx-2">
        Search Results for: &quot;{query}&quot;
      </h2>
      <StatusMessage loading={loading} error={error} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {searchResults.length > 0
          ? searchResults.map((article, index) => (
              <NewsCard key={index} article={article} image />
            ))
          : !loading && <p className="text-gray-500">No articles found.</p>}
      </div>
    </div>
  );
};

export default SearchPage;
