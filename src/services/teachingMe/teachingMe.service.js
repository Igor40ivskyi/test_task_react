import teachingMeInstance from "./teachingMe.instance.js";

const teachingMeService = {
    getCategories:()=> teachingMeInstance.get('categories',{
        headers:{
            'Accept-Language': 'en',
        }
    })
}

export {teachingMeService};