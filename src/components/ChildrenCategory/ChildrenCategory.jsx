import React, { useEffect, useState } from "react";
import "./ChildrenCategory.css";
import { teachingMeService } from "../../services/teachingMe/teachingMe.service.js";

const ChildrenCategory = ({ childrenCategory: { name, code } }) => {
  const [averagePrice, setAveragePrice] = useState(null);
  function calculateAveragePrice() {
    let sumOfTeachersPrices = 0;
    let totalResults = 0;

    teachingMeService
      .getTeachers(code)
      .then(({ data }) => {
        totalResults = data.totalResults;

        data.teachers.forEach(
          (item) => (sumOfTeachersPrices += item.pricePerHour),
        );

        const promises = [];

        for (let i = 1; i < Math.ceil(data.totalResults / 10); i++) {
          const promise = teachingMeService.getTeachers(code, i);
          promises.push(promise);
        }

        return Promise.all(promises);
      })
      .then((value) =>
        value.reduce((acc, next) => {
          next.data.teachers.forEach((item) => (acc += item.pricePerHour));
          return acc;
        }, 0),
      )
      .then((value) =>
        setAveragePrice((value + sumOfTeachersPrices) / totalResults),
      );
  }

  useEffect(() => {
    if (averagePrice == null) return;

    teachingMeService
      .postAveragePrice(name, averagePrice)
      .then((value) => console.log(value));
  }, [averagePrice]);

  return (
    <div className={`children-category-block`}>
      <label>{name}</label>

      <div className={"button-and-price-block"}>
        <div>{averagePrice && averagePrice.toFixed(1)}</div>

        <button
          onClick={() =>
            averagePrice ? setAveragePrice(null) : calculateAveragePrice()
          }
        >
          Show average price
        </button>
      </div>
    </div>
  );
};

export default ChildrenCategory;
