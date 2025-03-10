import NewsCard from "./NewsCard";
import PropTypes from "prop-types";
import Heading from "./Heading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNewsByCategory } from "../features/newsSlice";
import StatusMessage from "./StatusMessage";

const NewsListCol = ({ title }) => {
  const dispatch = useDispatch();
  const { categoryArticles, loading, error } = useSelector(
    (state) => state.news
  );

  useEffect(() => {
    if (title) {
      dispatch(fetchNewsByCategory(title.toLowerCase()));
    }
  }, [dispatch, title]);

  const articles = categoryArticles[title.toLowerCase()] || [];

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
