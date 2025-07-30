import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];
  while (i <= to) {
    range.push(i);
    i += step;
  }
  return range;
};

const Paging = ({
  totalRecords = 0,
  pageLimit = 30,
  pageNeighbours = 0,
  sizing = "",
  alignment = "",
  onPageChanged = () => {},
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const safePageNeighbours = Math.max(0, Math.min(pageNeighbours, 2));
  const totalPages = Math.ceil(totalRecords / pageLimit);

  const gotoPage = useCallback(
    (page) => {
      const safePage = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(safePage);
      onPageChanged({
        currentPage: safePage,
        totalPages,
        pageLimit,
        totalRecords,
      });
    },
    [onPageChanged, pageLimit, totalRecords, totalPages]
  );

  useEffect(() => {
    gotoPage(currentPage);
  }, [gotoPage, currentPage]);

  const handleClick = (page, e) => {
    e.preventDefault();
    gotoPage(page);
  };

  const handleMoveLeft = (e) => {
    e.preventDefault();
    gotoPage(currentPage - (safePageNeighbours * 2 + 1));
  };

  const handleMoveRight = (e) => {
    e.preventDefault();
    gotoPage(currentPage + (safePageNeighbours * 2 + 1));
  };

  const fetchPageNumbers = () => {
    const totalNumbers = safePageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];
      const leftBound = currentPage - safePageNeighbours;
      const rightBound = currentPage + safePageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);
      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [LEFT_PAGE, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, RIGHT_PAGE];
      } else if (leftSpill && rightSpill) {
        pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  if (!totalRecords || totalPages === 1) return null;

  const pages = fetchPageNumbers();

  return (
    <nav aria-label="Page navigation">
      <ul className={`pagination ${sizing} ${alignment}`}>
        {pages.map((page, index) => {
          if (page === LEFT_PAGE)
            return (
              <li key={index} className="page-item">
                <button className="page-link" onClick={handleMoveLeft}>&laquo;</button>
              </li>
            );

          if (page === RIGHT_PAGE)
            return (
              <li key={index} className="page-item">
                <button className="page-link" onClick={handleMoveRight}>&raquo;</button>
              </li>
            );

          return (
            <li
              key={index}
              className={`page-item${currentPage === page ? " active" : ""}`}
            >
              <button className="page-link" onClick={(e) => handleClick(page, e)}>
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Paging.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func,
  sizing: PropTypes.string,
  alignment: PropTypes.string,
};

export default Paging;
