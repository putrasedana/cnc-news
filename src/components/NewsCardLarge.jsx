import PropTypes from "prop-types";
import clsx from "clsx";
import { useState, useEffect } from "react";
import Heading from "./Heading";
import { fetchNewsByCategory } from "../utils/newsApi";
import StatusMessage from "./StatusMessage";

const NewsCardLarge = ({ direction, title }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  const featuredArticle = articles.length > 0 ? articles[0] : null;

  return (
    <div className="container mx-auto sm:px-6 lg:px-8 pt-16 sm:pt-18 xl:w-[90%]">
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
              src={featuredArticle.urlToImage}
              alt={featuredArticle.title}
              className="w-full object-cover h-[20rem] sm:h-[25rem] lg:h-[29rem]"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center lg:text-left px-2 sm:px-0">
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
              className="mt-4 px-4 mx-auto lg:mx-0 sm:px-0 py-2 border w-52 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition cursor-pointer text-center"
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
