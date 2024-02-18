import {teachingMeService} from "../services/teachingMe/teachingMe.service.js";

async function getAllTeachers(code, totalPages) {

    let currentPage = 0;
    let teachers = [];

    while (currentPage <= totalPages) {
        teachingMeService.getTeachers(code, currentPage).then(({data}) => teachers.push(data.teachers));

        currentPage++;
    }

    
}

export {getAllTeachers};