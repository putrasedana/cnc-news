import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import NewsCard from "./NewsCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopHeadlines } from "../features/newsSlice";
import StatusMessage from "./StatusMessage";
import Heading from "./Heading";
import PropTypes from "prop-types";

const PaginationNewsList = ({ title }) => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.news);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  useEffect(() => {
    dispatch(fetchTopHeadlines());
  }, [dispatch]);

  const onPageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const container = document.getElementById("news-pagination-container");
      if (container) {
        container.scrollIntoView({ block: "start" });
      }
    }
  };

  const currentArticle = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <div
      id="news-pagination-container"
      className="container mx-auto sm:pt-16 sm:mb-20 pb-16 sm:pb-0 sm:px-5 xl:w-[90%]"
    >
      <StatusMessage loading={loading} error={error} />
      <Heading title={title} section noChevron />
      <div className="xl:w-[80%] mx-auto">
        {currentArticle.map((article, index) => (
          <NewsCard key={index} article={article} image row />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

PaginationNewsList.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PaginationNewsList;
