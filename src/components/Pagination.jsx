import { useDispatch, useSelector } from "react-redux";
import "./Pagination.scss";
import { useState } from "react";
import { discoverActions } from "../store/DiscoverSlice";

const Pagination = ({ totalResults }) => {
  const [currentStart, setCurrentStart] = useState(1);
  const totalPages = Math.ceil(totalResults / 20);
  const maxVisiblePages = 10;
  const activePage = useSelector((state) => state.discover.page);
  const dispatch = useDispatch();

  //handle pagination reset
  const handleReset = () => {
    setCurrentStart(1);
    dispatch(discoverActions.changePage(1));
  };

  // handle moving to the last page
  const handleOnJump = () => {
    setCurrentStart(totalPages - maxVisiblePages + 1);
    dispatch(discoverActions.changePage(totalPages - maxVisiblePages + 1));
  };

  //handle next button

  const handleNext = () => {
    if (currentStart + maxVisiblePages <= totalPages) {
      setCurrentStart(currentStart + maxVisiblePages);
      dispatch(discoverActions.changePage(currentStart + maxVisiblePages));
    }
  };

  // handle previous button
  const handlePrev = () => {
    if (currentStart - maxVisiblePages >= 1) {
      setCurrentStart(currentStart - maxVisiblePages);
      dispatch(discoverActions.changePage(currentStart - maxVisiblePages));
    }
  };
  //handle clicking on page number
  const handlePageClick = (i) => {
    dispatch(discoverActions.changePage(i));
  };

  //pagination logic
  const paginationCreator = () => {
    const paginationItems = [];

    for (
      let i = currentStart;
      i <= totalPages && i < currentStart + maxVisiblePages;
      i++
    ) {
      paginationItems.push(
        <p
          onClick={() => {
            handlePageClick(i);
          }}
          style={
            activePage === i
              ? { color: "#1ab7fd", cursor: "pointer" }
              : { cursor: "pointer" }
          }
          key={i}
        >
          {i}
        </p>
      );
    }

    if (currentStart + maxVisiblePages <= totalPages) {
      paginationItems.push(<span key="ellipsis">...</span>);
      paginationItems.push(
        <span
          key="last-page"
          style={{ color: "orange", cursor: "pointer" }}
          onClick={handleOnJump}
        >
          {totalPages}
        </span>
      );
    }

    //display first page to the user if he wants to navigate back
    if (currentStart !== 1) {
      paginationItems.splice(
        0,
        0,
        <span
          key="first-page"
          style={{ color: "orange", cursor: "pointer" }}
          onClick={handleReset}
        >
          1
        </span>
      );
    }

    return paginationItems;
  };

  return (
    <div className="pagination_container">
      {currentStart !== 1 && <button onClick={handlePrev}>Previous</button>}

      {paginationCreator()}

      {currentStart !== totalPages - maxVisiblePages + 1 && (
        <button onClick={handleNext}>Next</button>
      )}
    </div>
  );
};

export default Pagination;
