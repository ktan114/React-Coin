import React from "react";
import PropTypes from "prop-types";

import "./Pagination.css";

const Pagination = props => {
  const { page, totalPages, handlePaginationClick } = props;
  return (
    <div className="Pagination">
      <button
        onClick={() => handlePaginationClick("prev")}
        className="Pagination__Button"
        disabled={page <= 1}
      >
        &larr;
      </button>
      <span className="Pagination__Info">
        <b>{page}</b> of <b>{totalPages}</b>
      </span>
      <button
        onClick={() => handlePaginationClick("next")}
        className="Pagination__Button"
        disabled={page >= totalPages}
      >
        &rarr;
      </button>
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handlePaginationClick: PropTypes.func.isRequired
};

export default Pagination;
