import PropTypes from "prop-types";

const StatusMessage = ({ loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-slate-800"></div>
        <p className="ml-2 text-slate-900 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-40 bg-red-100 text-red-600 p-4 rounded-md">
        <p className="text-lg font-semibold">Error: {error}</p>
      </div>
    );
  }

  return null;
};

StatusMessage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default StatusMessage;
