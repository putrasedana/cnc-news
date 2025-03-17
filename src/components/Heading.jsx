import PropTypes from "prop-types";
import { BsChevronDoubleRight } from "react-icons/bs";

const Heading = ({ title, section, page, noChevron }) => {
  return (
    <>
      {section && (
        <div className={`mb-6 px-2 sm:px-0`}>
          <hr className="border-slate-900 border-1" />
          <h2 className="mt-2 text-xl font-semibold text-gray-900">
            {noChevron ? (
              <div className="inline-flex items-center gap-1">
                <span className="pb-1">{title}</span>
              </div>
            ) : (
              <a
                href="#"
                className="hover:underline inline-flex items-center gap-1"
              >
                <span className="pb-1">{title}</span>
                <BsChevronDoubleRight />
              </a>
            )}
          </h2>
        </div>
      )}

      {page && (
        <div className={`mb-12 px-4 sm:px-0`}>
          <h1 className="mt-10 md:mt-0 text-4xl font-semibold text-gray-900">
            <div className="inline-flex items-center pb-2">{title}</div>
          </h1>
          <hr className="border-slate-900 border-1" />
        </div>
      )}
    </>
  );
};

Heading.propTypes = {
  title: PropTypes.string.isRequired,
  section: PropTypes.string,
  page: PropTypes.string,
  noChevron: PropTypes.bool,
};

export default Heading;
