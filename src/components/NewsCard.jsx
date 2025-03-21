import PropTypes from "prop-types";
import { BsClock } from "react-icons/bs";
import clsx from "clsx";
import { formatDate, getHoursAgo, normalizeTitle } from "../utils";
import { Link } from "react-router-dom";

const NewsCard = ({
  article,
  image,
  direction,
  featured,
  inline,
  category,
  row,
}) => {
  return (
    <div
      className={clsx(
        "relative overflow-hidden flex-col flex sm:px-0",
        { "sm:flex-col": !row, "sm:flex-row mb-6": row },
        featured
          ? {
              "md:flex-row-reverse": direction,
              "md:flex-row": !direction,
            }
          : "",
        featured
          ? "md:col-span-3 lg:col-span-4 xl:col-span-3 flex-col"
          : {
              "flex-row": !inline && !row,
              "flex-col": inline && !row,
            }
      )}
    >
      {image && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className={clsx(
            "object-cover self-center mr-0 sm:mr-0",
            !featured && {
              "w-full h-[250px] md:w-[300px] sm:h-[200px] md:pr-3": row,
              "sm:h-40 sm:w-full px-2 md:px-0": !row,
            },
            featured
              ? "object-contain md:w-[50%] md:h-full"
              : {
                  "h-40 w-[40%]": !inline,
                  "h-full w-full": inline,
                },
            inline && "sm:h-90 block"
          )}
        />
      )}

      <div
        className={clsx(
          "flex flex-col flex-grow px-2",
          featured ? "md:px-2" : "md:px-0"
        )}
      >
        <Link
          to={
            category
              ? `/news/${category}/${normalizeTitle(article)
                  .toLowerCase()
                  .replace(/[^\w-]+/g, "-")}`
              : `/news/${normalizeTitle(article)
                  .toLowerCase()
                  .replace(/[^\w-]+/g, "-")}`
          }
        >
          <h2
            className={clsx(
              "font-semibold hover:underline",
              featured ? "text-4xl" : "text-lg",
              inline && "md:text-2xl mt-4"
            )}
          >
            {article.title}
          </h2>
        </Link>

        <p
          className={clsx(
            inline ? "block" : "hidden",
            "text-sm text-gray-600 mt-2 flex-grow sm:block"
          )}
        >
          {article.description}
        </p>

        <div className="flex items-center text-gray-500 text-xs mt-3 border-b-2 border-gray-200 pb-2">
          <BsClock size={14} className="mr-1" />
          <span>{formatDate(article.publishedAt)}</span>
          <span className="mx-2">|</span>
          <span className="font-semibold">
            {getHoursAgo(article.publishedAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    urlToImage: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  image: PropTypes.bool,
  direction: PropTypes.bool,
  featured: PropTypes.bool,
  inline: PropTypes.bool,
  category: PropTypes.string,
  row: PropTypes.bool,
};

export default NewsCard;
