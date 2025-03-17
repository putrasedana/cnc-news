import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import Heading from "./Heading";
import PropTypes from "prop-types";
import { fetchNewsByCategory } from "../utils/newsApi";
import StatusMessage from "./StatusMessage";

const NewsList = ({ title }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedArticles = await fetchNewsByCategory();
        setArticles(fetchedArticles);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto sm:pt-18 sm:px-5 xl:w-[90%]">
      <Heading title={title} section noChevron />
      <StatusMessage loading={loading} error={error} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {articles.slice(9, 14).map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

NewsList.propTypes = {
  title: PropTypes.string.isRequired,
};

export default NewsList;
