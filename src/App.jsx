import { useEffect, useState } from "react";
import Category from "./components/Category/Category.jsx";
import { teachingMeService } from "./services/teachingMe/teachingMe.service.js";

function App() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    teachingMeService.getCategories().then(({ data }) => setCategories(data));
  }, []);

  return (
    <>
      {categories &&
        categories.map((category) => (
          <Category key={category.id} category={category} />
        ))}
    </>
  );
}

export default App;
