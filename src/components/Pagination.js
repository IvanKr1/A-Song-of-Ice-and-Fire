import React from "react";
import Button from "./Button";
import RightArrow from "../assets/right.png";
import LeftArrow from "../assets/left.png";
import "../scss/Pagination.scss"

const Pagination = ({
  onClickFirstPage,
  onClickLastPage,
  onClickPreviousPage,
  onClickNextPage,
}) => {
  return (
    <nav className="pagionation__container">
      <Button onClick={onClickFirstPage}>First Page</Button>
      <Button onClick={onClickPreviousPage}>
        <img src={LeftArrow} alt="previous" />
      </Button>
      <Button onClick={onClickNextPage}>
        <img src={RightArrow} alt="next" />
      </Button>
      <Button onClick={onClickLastPage}>Last Page</Button>
    </nav>
  );
};

export default Pagination;
