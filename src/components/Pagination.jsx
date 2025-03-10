import PropTypes from "prop-types";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center space-x-2 mt-16 justify-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 text-lg border cursor-pointer hover:bg-slate-900 hover:text-white disabled:hover:bg-white disabled:hover:border disabled:hover:text-black"
      >
        <BiChevronLeft size={28} />
      </button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`py-2 px-4 text-lg border cursor-pointer hover:bg-slate-900 hover:text-white ${
            currentPage === index + 1
              ? "bg-slate-950 text-white"
              : "bg-gray-100"
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 text-lg border cursor-pointer hover:bg-slate-900 hover:text-white disabled:hover:bg-white disabled:hover:border disabled:hover:text-black"
      >
        <BiChevronRight size={28} />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
