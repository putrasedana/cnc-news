import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import StatusMessage from "./StatusMessage";
import Heading from "./Heading";
import { fetchNewsByCategory } from "../utils/newsApi";
import PropTypes from "prop-types";

const NewsGridMain = ({ heading, title }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      try {
        const category =
          title.toLowerCase() === "news" ? "" : title.toLowerCase();
        const data = await fetchNewsByCategory(category);
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [title]);

  return (
    <div className="container mx-auto sm:pt-40 pt-[56px] pb-16 sm:pb-0 sm:px-5 xl:w-[90%]">
      {heading && <Heading title={title} page noChevron />}
      <StatusMessage loading={loading} error={error} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {articles.slice(0, 6).map((article, index) => (
          <NewsCard
            key={article.url || index}
            article={article}
            image
            featured={index === 0}
            category={title.toLowerCase()}
          />
        ))}
      </div>
    </div>
  );
};

NewsGridMain.propTypes = {
  heading: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default NewsGridMain;
