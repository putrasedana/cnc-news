import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import Heading from "./Heading";
import PropTypes from "prop-types";
import { fetchBBCNews } from "../utils/newsApi";
import StatusMessage from "./StatusMessage";

const NewsCardInline = ({ title }) => {
  const [bbcArticles, setBbcArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBBCNews = async () => {
      setLoading(true);
      try {
        const data = await fetchBBCNews();
        setBbcArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getBBCNews();
  }, []);

  return (
    <div className="container mx-auto sm:pt-18 pb-16 sm:pb-0 sm:px-5 xl:w-[90%]">
      <Heading title={title} section />
      <StatusMessage loading={loading} error={error} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {bbcArticles.slice(7, 9).map((article, index) => (
          <NewsCard key={article.url || index} article={article} image inline />
        ))}
      </div>
    </div>
  );
};

NewsCardInline.propTypes = {
  title: PropTypes.string.isRequired,
};

export default NewsCardInline;
