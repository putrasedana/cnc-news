import PropTypes from "prop-types";

const NewsListColumns = ({ children }) => {
  return (
    <div className="container gap-4 mx-auto py-18 sm:px-6 xl:w-[90%]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-4">
        {children}
      </div>
    </div>
  );
};

NewsListColumns.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NewsListColumns;
