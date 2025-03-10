import NewsGridMain from "../components/NewsGridMain";
import NewsList from "../components/NewsList";
import PaginationNewsList from "../components/PaginationNewsList";

const HealthPage = () => {
  return (
    <div>
      <NewsGridMain heading title="Health" />
      <NewsList title="More News" />
      <PaginationNewsList title="More in Health" />
    </div>
  );
};

export default HealthPage;
