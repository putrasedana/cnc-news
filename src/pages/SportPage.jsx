import NewsGridMain from "../components/NewsGridMain";
import NewsList from "../components/NewsList";
import PaginationNewsList from "../components/PaginationNewsList";

const SportPage = () => {
  return (
    <div>
      <NewsGridMain heading title="Sport" />
      <NewsList title="More News" />
      <PaginationNewsList title="More in Sport" />
    </div>
  );
};

export default SportPage;
