import React from "react";
import "./Category.css";
import ChildrenCategory from "../ChildrenCategory/ChildrenCategory.jsx";

const Category = ({ category, category: { childrenCategories } }) => {

  return (
    <div className={"category-block"}>
      {category.name}
      <br />
      {childrenCategories &&
        childrenCategories.map((childrenCategory) => (
          <ChildrenCategory
            key={childrenCategory.id}
            childrenCategory={childrenCategory}
          />
        ))}
    </div>
  );
};

export default Category;
