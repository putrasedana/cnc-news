import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import PropTypes from "prop-types";
import Heading from "./Heading";
import { fetchNewsByCategory } from "../utils/newsApi";
import StatusMessage from "./StatusMessage";

const NewsListCol = ({ title }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!title) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedArticles = await fetchNewsByCategory(title.toLowerCase());
        setArticles(fetchedArticles);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [title]);

  return (
    <div>
      <Heading title={title} section />
      <StatusMessage loading={loading} error={error} />
      <div className="flex flex-col gap-y-5">
        {articles.slice(0, 3).map((article, index) => (
          <NewsCard
            key={index}
            article={article}
            image={index === 0}
            category={title.toLowerCase()}
          />
        ))}
      </div>
    </div>
  );
};

NewsListCol.propTypes = {
  title: PropTypes.string.isRequired,
};

export default NewsListCol;
