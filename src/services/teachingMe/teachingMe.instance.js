import axios from "axios";

const teachingMeInstance = axios.create({baseURL: 'https://test.teaching-me.org/categories/v1/open/'});
export default teachingMeInstance;



