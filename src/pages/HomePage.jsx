import NewsGridMain from "../components/NewsGridMain";
import NewsCardInline from "../components/NewsCardInline";
import NewsList from "../components/NewsList";
import NewsCardLarge from "../components/NewsCardLarge";
import NewsListCol from "../components/NewsListCol";
import NewsListColumns from "../components/NewsListColumns";

const HomePage = () => {
  return (
    <div>
      <NewsGridMain title="" />
      <NewsCardInline title="From the BBC News" />
      <NewsList title="More News" />

      <NewsCardLarge title="Business" />
      <NewsCardLarge direction title="Health" />

      <NewsListColumns>
        <NewsListCol title="Entertainment" />
        <NewsListCol title="Sport" />
        <NewsListCol title="Technology" />
        <NewsListCol title="Science" />
      </NewsListColumns>
    </div>
  );
};

export default HomePage;
