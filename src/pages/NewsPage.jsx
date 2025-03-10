import NewsCardInline from "../components/NewsCardInline";
import NewsCardLarge from "../components/NewsCardLarge";
import NewsGridMain from "../components/NewsGridMain";
import NewsList from "../components/NewsList";
import PaginationNewsList from "../components/PaginationNewsList";

const NewsPage = () => {
  return (
    <div>
      <NewsGridMain heading title="News" />
      <NewsCardInline title="From the BBC News" />
      <NewsList title="More News" />
      <NewsCardLarge title="Entertainment" />
      <NewsCardLarge title="Sport" direction />
      <PaginationNewsList title="All News" />
    </div>
  );
};

export default NewsPage;
