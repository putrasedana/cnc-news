import { useDispatch, useSelector } from "react-redux";
import NewsCard from "./NewsCard";
import Heading from "./Heading";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { fetchBBCNews } from "../features/newsSlice";
import StatusMessage from "./StatusMessage";

const NewsCardInline = ({ title }) => {
  const dispatch = useDispatch();
  const { bbcArticles, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchBBCNews());
  }, [dispatch]);

  return (
    <div className="container mx-auto sm:pt-18 pb-16 sm:pb-0 sm:px-5 xl:w-[90%]">
      <Heading title={title} section />
      <StatusMessage loading={loading} error={error} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {bbcArticles.slice(7, 9).map((article, index) => (
          <NewsCard key={index} article={article} image inline />
        ))}
      </div>
    </div>
  );
};

NewsCardInline.propTypes = {
  title: PropTypes.string.isRequired,
};

export default NewsCardInline;
