import { useDispatch, useSelector } from "react-redux";
import NewsCard from "./NewsCard";
import Heading from "./Heading";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { fetchTopHeadlines } from "../features/newsSlice";
import StatusMessage from "./StatusMessage";

const NewsList = ({ title }) => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchTopHeadlines());
  }, [dispatch]);

  return (
    <div className="container mx-auto sm:pt-18 sm:px-5 xl:w-[90%]">
      <Heading title={title} section noChevron />
      <StatusMessage loading={loading} error={error} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
