import React from 'react';

const Pagination = ({ currentPage, usersPerPage, totalCount, onPageChange }) => {
    const totalPages = Math.ceil(totalCount / usersPerPage);

    const handlePageClick = (page) => {
        onPageChange(page);
    };

    // only show 3 page numbers at a time, and change the page numbers based on the current page
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, currentPage + 1);

        if (currentPage === 1) {
            endPage = Math.min(totalPages, 3);
        } else if (currentPage === totalPages) {
            startPage = Math.max(1, totalPages - 2);
        }

        return pageNumbers.slice(startPage - 1, endPage).map((number) => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                <a onClick={() => handlePageClick(number)} href="#" className="page-link">
                    {number}
                </a>
            </li>
        ));
    };

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a onClick={() => handlePageClick(currentPage - 1)} href="#" className="page-link">
                        &lt;
                    </a>
                </li>
                {renderPageNumbers()}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a onClick={() => handlePageClick(currentPage + 1)} href="#" className="page-link">
                        &gt;
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
