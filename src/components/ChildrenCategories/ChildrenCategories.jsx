import React from 'react';
import './ChildrenCategories.css';
const ChildrenCategories = ({childrenCategory}) => {

    function fetchTeachers() {
        console.log(childrenCategory);
    }

    return (
        <div className={'children-category-block'} onClick={fetchTeachers}>
            <h5>{childrenCategory.name}</h5>
        </div>
    );
};

export default ChildrenCategories;