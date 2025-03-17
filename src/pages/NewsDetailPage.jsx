import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchNewsByCategory } from "../utils/newsApi";
import { formatDate, normalizeTitle } from "../utils";
import StatusMessage from "../components/StatusMessage";

const NewsDetailPage = () => {
  const { id, category } = useParams();
  const [articles, setArticles] = useState([]);
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedArticles = await fetchNewsByCategory(category);
        setArticles(fetchedArticles);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [category]);

  useEffect(() => {
    if (!id) return;

    const normalizedId = decodeURIComponent(id)
      .toLowerCase()
      .replace(/[^\w-]+/g, "-");

    const foundNews = articles.find((article) => {
      const cleanedTitle = normalizeTitle(article);

      const normalizedTitle = cleanedTitle
        .toLowerCase()
        .replace(/[^\w-]+/g, "-");

      return normalizedTitle === normalizedId;
    });

    setNews(foundNews);
  }, [id, articles]);

  if (loading || error)
    return <StatusMessage loading={loading} error={error} />;
  if (!news)
    return <p className="text-center text-gray-500 py-16">News not found.</p>;

  return (
    <div className="container mx-auto sm:px-6 lg:px-8 pt-[56px] pb-16 sm:py-18 xl:w-[60%]">
      <img src={news.urlToImage} alt={news.title} />
      <h1 className="text-4xl font-bold mt-4 px-2 mb-2">{news.title}</h1>
      <p className="text-gray-600 text-sm px-2 mt-2">
        By <span className="font-semibold">{news.author}</span> |{" "}
        {formatDate(news.publishedAt)}
      </p>
      <p className="text-gray-700 mt-4 px-2">{news.content}</p>
      <a
        href={news.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 mx-2 inline-block bg-slate-900 text-white border py-2 px-10 hover:border-slate-900 hover:bg-transparent hover:text-slate-950 transition"
      >
        Read More
      </a>
    </div>
  );
};

export default NewsDetailPage;
