import React, { useEffect, useState } from "react";
import "./ChildrenCategory.css";
import { teachingMeService } from "../../services/teachingMe/teachingMe.service.js";

const ChildrenCategory = ({ childrenCategory: { name, code } }) => {
  const [totalPages, setTotalPages] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [averagePrice, setAveragePrice] = useState(null);

  async function fetchTeachers() {
    const { data } = await teachingMeService.getTeachers(code);
    setTotalResults(data.totalResults);
    await setTotalPages(Math.ceil(data.totalResults / 10));
  }

  useEffect(() => {
    if (totalPages == null) return;

    const promises = [];

    for (let i = 0; i < totalPages; i++) {
      const promise = teachingMeService.getTeachers(code, i);
      promises.push(promise);
    }

    Promise.all(promises)
      .then((value) =>
        value.reduce((acc, next) => {
          next.data.teachers.forEach((item) => (acc += item.pricePerHour));
          return acc;
        }, 0),
      )
      .then((value) => setAveragePrice(value / totalResults));
  }, [totalPages]);

  return (
    <div className={"children-category-block"} onClick={fetchTeachers}>
      <h5>{name}</h5>

      <h1>{averagePrice && averagePrice}</h1>
    </div>
  );
};

export default ChildrenCategory;
