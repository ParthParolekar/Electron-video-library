import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { CategoryCard } from "../index";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      axios
        .get("/api/categories")
        .then((res) => setCategories(res.data.categories));
    } catch (error) {}
  }, []);

  return (
    <>
      <section className="product-list">
        <div className="product-list-title filter-btn-container">
          <h3>Categories</h3>
        </div>
        <div className="card-container flex-row align-center justify-center flex-wrap mg-lg-top-bottom">
          {categories.map((category) => {
            return <CategoryCard key={category._id} categoryData={category} />;
          })}
        </div>
      </section>
    </>
  );
};

export default Categories;
