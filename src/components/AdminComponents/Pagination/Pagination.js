import React from 'react';

const Pagination = ({ currentPage, usersPerPage, totalCount, onPageChange }) => {
    const totalPages = Math.ceil(totalCount / usersPerPage);

    const handlePageClick = (page) => {
        onPageChange(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers.map((number) => (
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
                        Previous
                    </a>
                </li>
                {renderPageNumbers()}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a onClick={() => handlePageClick(currentPage + 1)} href="#" className="page-link">
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
