import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTopHeadlines, fetchNewsByCategory } from "../features/newsSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../utils";
import StatusMessage from "./StatusMessage";

const NewsDetail = () => {
  const { id, category } = useParams();
  const dispatch = useDispatch();
  const { articles, categoryArticles, loading, error } = useSelector(
    (state) => state.news
  );
  const [news, setNews] = useState(null);

  useEffect(() => {
    if (category) {
      dispatch(fetchNewsByCategory(category));
    } else {
      dispatch(fetchTopHeadlines());
    }
  }, [dispatch, category]);

  useEffect(() => {
    if (!id) return;

    const normalizedId = decodeURIComponent(id)
      .toLowerCase()
      .replace(/[^\w-]+/g, "-");

    let allArticles =
      category && categoryArticles[category]
        ? [...categoryArticles[category]]
        : [...articles];

    const foundNews = allArticles.find((article) => {
      const normalizedTitle = article.title
        .toLowerCase()
        .replace(/[^\w-]+/g, "-");

      return normalizedTitle === normalizedId;
    });

    setNews(foundNews);
  }, [id, category, articles, categoryArticles]);

  if (loading || error)
    return <StatusMessage loading={loading} error={error} />;
  if (!news)
    return <p className="text-center text-gray-500 py-16">News not found.</p>;

  return (
    <div className="container mx-auto sm:px-6 lg:px-8 pt-16 sm:py-18 xl:w-[60%]">
      <img src={news.urlToImage} alt={news.title} />
      <h1 className="text-4xl font-bold mt-4 mb-2">{news.title}</h1>
      <p className="text-gray-600 text-sm mt-2">
        By <span className="font-semibold">{news.author}</span> |{" "}
        {formatDate(news.publishedAt)}
      </p>
      <p className="text-gray-700 mt-4">{news.content}</p>
      <a
        href={news.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block bg-slate-900 text-white border py-2 px-10 hover:border-slate-900 hover:bg-transparent hover:text-slate-950 transition"
      >
        Read More
      </a>
    </div>
  );
};

export default NewsDetail;
