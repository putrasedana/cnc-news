import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import NewsCard from "./NewsCard";
import { fetchNewsByCategory } from "../utils/newsApi";
import StatusMessage from "./StatusMessage";
import Heading from "./Heading";
import PropTypes from "prop-types";
import { menuItems } from "../utils";

const PaginationNewsList = ({ title }) => {
  const validCategories = menuItems
    .map((item) => item.name.toLowerCase())
    .filter((name) => name !== "home" && name !== "news");

  const extractedCategory = title.split("in")[1]?.trim().toLowerCase() || "";
  const category = validCategories.includes(extractedCategory)
    ? extractedCategory
    : "";

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log(category);

        const fetchedArticles = await fetchNewsByCategory(category);
        setArticles(fetchedArticles);
      } catch (err) {
        setError(err.message);
      }

      setLoading(false);
    };

    fetchData();
  }, [category]);

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
      className="container mx-auto sm:pt-16 sm:mb-20 py-16 sm:pb-0 sm:px-5 xl:w-[90%]"
    >
      <StatusMessage loading={loading} error={error} />
      <Heading title={title} section noChevron />
      <div className="xl:w-[80%] mx-auto">
        {currentArticle.map((article, index) => (
          <NewsCard
            key={index}
            article={article}
            category={category}
            image
            row
          />
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
