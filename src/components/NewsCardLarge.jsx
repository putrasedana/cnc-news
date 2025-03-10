import PropTypes from "prop-types";
import clsx from "clsx";
import Heading from "./Heading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNewsByCategory } from "../features/newsSlice";
import StatusMessage from "./StatusMessage";

const NewsCardLarge = ({ direction, title }) => {
  const dispatch = useDispatch();
  const { categoryArticles, loading, error } = useSelector(
    (state) => state.news
  );

  useEffect(() => {
    dispatch(fetchNewsByCategory(title.toLowerCase()));
  }, [dispatch, title]);

  const articles = categoryArticles[title.toLowerCase()] || [];
  const featuredArticle = articles.length > 0 ? articles[0] : null;

  return (
    <div
      className={"container mx-auto sm:px-6 lg:px-8 pt-16 sm:pt-18 xl:w-[90%]"}
    >
      <Heading title={title} section />

      {loading || error ? (
        <StatusMessage loading={loading} error={error} />
      ) : !featuredArticle ? (
        <p className="text-center text-gray-600">No articles available.</p>
      ) : (
        <div
          className={clsx("flex flex-col items-center gap-x-6", {
            "lg:flex-row-reverse": direction,
            "lg:flex-row": !direction,
          })}
        >
          <div className="w-full lg:w-[90%]">
            <img
              src={
                featuredArticle.urlToImage ||
                "https://via.placeholder.com/600x400"
              }
              alt={featuredArticle.title}
              className="w-full object-cover h-[20rem] sm:h-[25rem] lg:h-[29rem]"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center lg:text-left px-4 sm:px-0">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mt-4 lg:mt-0">
              {featuredArticle.title}
            </h2>
            <p className="text-gray-600 mt-2">
              {featuredArticle.description || "No description available."}
            </p>
            <a
              href={featuredArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-4 sm:px-0 py-2 border w-52 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition cursor-pointer text-center"
            >
              See more
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

NewsCardLarge.propTypes = {
  direction: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default NewsCardLarge;
