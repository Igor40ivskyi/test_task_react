import React from 'react';
import './Category.css';
import ChildrenCategories from "../ChildrenCategories/ChildrenCategories.jsx";

const Category = ({category, category: {childrenCategories}}) => {


    // console.log(category);

    return (
        <div className={'category-block'}>
            {category.name}
            <br/>
            {childrenCategories && childrenCategories.map(childrenCategory => <ChildrenCategories
                key={childrenCategory.id}
                childrenCategory={childrenCategory}/>)}
        </div>
    );
};

export default Category;