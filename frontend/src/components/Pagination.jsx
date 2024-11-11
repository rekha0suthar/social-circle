import React, { useContext } from 'react';
import { GrPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';
import { UserContext } from '../context/UserContext';
import '../styles/pagination.css';

const Pagination = () => {
  const { currentPage, setCurrentPage, totalPages } = useContext(UserContext);
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        <GrPrevious />
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        <GrNext />
      </button>
    </div>
  );
};

export default Pagination;
