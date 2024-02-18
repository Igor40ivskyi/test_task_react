import React, {useState} from "react";
import "./ChildrenCategory.css";
import { teachingMeService } from "../../services/teachingMe/teachingMe.service.js";

const ChildrenCategory = ({ childrenCategory: { name, code } }) => {
  const [averagePrice, setAveragePrice] = useState(null);
  function fetchTeachers() {
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

    return (
        <div className={"children-category-block"}
             onClick={() => averagePrice ? setAveragePrice(null) : fetchTeachers()}>
            <h5>{name}</h5>

            <div>
                {averagePrice && averagePrice.toFixed(1)}
            </div>
        </div>
    );
};

export default ChildrenCategory;
