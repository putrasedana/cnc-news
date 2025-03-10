import NewsGridMain from "../components/NewsGridMain";
import NewsList from "../components/NewsList";
import PaginationNewsList from "../components/PaginationNewsList";

const SciencePage = () => {
  return (
    <div>
      <NewsGridMain heading title="Science" />
      <NewsList title="More News" />
      <PaginationNewsList title="More in Science" />
    </div>
  );
};

export default SciencePage;
