import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults } from "../features/newsSlice";
import StatusMessage from "../components/StatusMessage";
import NewsCard from "../components/NewsCard";
import Pagination from "../components/Pagination";

const SearchPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { searchResults, totalResults, loading, error } = useSelector(
    (state) => state.news
  );
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;
  const totalPages = Math.ceil(totalResults / articlesPerPage);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("q");
    setQuery(searchQuery || "");

    if (searchQuery) {
      dispatch(fetchSearchResults({ query: searchQuery, page: currentPage }));
    }
  }, [location.search, dispatch, currentPage]);

  const onPageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto sm:pt-40 pb-16 mb-16 sm:pb-0 sm:px-5 xl:w-[90%]">
      <h2 className="text-2xl font-bold mb-10">
        Search Results for: &quot;{query}&quot;
      </h2>
      <StatusMessage loading={loading} error={error} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResults.articles.length > 0
          ? searchResults.articles.map((article, index) => (
              <NewsCard key={index} article={article} image />
            ))
          : !loading && <p className="text-gray-500">No articles found.</p>}
      </div>
      {totalResults > articlesPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default SearchPage;
