import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsCard from "./NewsCard";
import StatusMessage from "./StatusMessage";
import Heading from "./Heading";
import { fetchNewsByCategory, fetchTopHeadlines } from "../features/newsSlice";
import PropTypes from "prop-types";

const NewsGridMain = ({ heading, title }) => {
  const dispatch = useDispatch();
  const { articles, categoryArticles, loading, error } = useSelector(
    (state) => state.news
  );

  const chosenArticles =
    title === "" || title === "News"
      ? articles
      : categoryArticles?.[title.toLowerCase()] || [];

  useEffect(() => {
    if (title === "" || title === "News") {
      dispatch(fetchTopHeadlines());
    } else {
      dispatch(fetchNewsByCategory(title.toLowerCase()));
    }
  }, [dispatch, title]);

  return (
    <div className="container mx-auto sm:pt-40 pb-16 sm:pb-0 sm:px-5 xl:w-[90%]">
      {heading && <Heading title={title} page noChevron />}
      <StatusMessage loading={loading} error={error} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {chosenArticles.slice(0, 6).map((article, index) => (
          <NewsCard
            key={article.url || index} // Use a unique key if possible
            article={article}
            image
            shadow
            featured={index === 0}
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
