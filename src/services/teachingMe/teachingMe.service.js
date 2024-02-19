import teachingMeInstance from "./teachingMe.instance.js";

const teachingMeService = {
  getCategories: () =>
    teachingMeInstance.get("categories", {
      headers: {
        "Accept-Language": "en",
      },
    }),

  getTeachers: (categoryCode, page = 0) => {
    const body = {
      categories: [categoryCode],
      page: page,
      pageSize: 10,
    };

    return teachingMeInstance.post("search", body, {
      headers: {
        "Accept-Language": "en",
        "Content-Type": "application/json",
      },
    });
  },

  postAveragePrice: (categoryName, averagePrice) => {
    const data = {
      categoryName,
      averagePrice,
    };

    return teachingMeInstance.post("average-price", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export { teachingMeService };
