import NewsCardInline from "../components/NewsCardInline";
import NewsGridMain from "../components/NewsGridMain";
import PaginationNewsList from "../components/PaginationNewsList";

const BusinessPage = () => {
  return (
    <div>
      <NewsGridMain heading title="Business" />
      <NewsCardInline title="Popular in Business" />
      <PaginationNewsList title="More in Business" />
    </div>
  );
};

export default BusinessPage;
