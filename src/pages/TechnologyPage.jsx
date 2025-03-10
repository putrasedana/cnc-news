import NewsGridMain from "../components/NewsGridMain";
import NewsList from "../components/NewsList";
import PaginationNewsList from "../components/PaginationNewsList";

const TechnologyPage = () => {
  return (
    <div>
      <NewsGridMain heading title="Technology" />
      <NewsList title="More News" />
      <PaginationNewsList title="More in Technology" />
    </div>
  );
};

export default TechnologyPage;
