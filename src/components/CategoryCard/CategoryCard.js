import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ categoryData }) => {
  const navigate = useNavigate();
  const categoryClickHandler = () => {
    navigate("/browse");
  };
  return (
    <div
      onClick={categoryClickHandler}
      className="category-card card-shadow flex-column justify-center align-center"
    >
      <h3>{categoryData.categoryName}</h3>
    </div>
  );
};

export default CategoryCard;
