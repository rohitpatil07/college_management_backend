import prisma from '../../config/prisma.js';

const getAllFaculty = async()=> {
    try{
        const faculty = await prisma.faculty.findMany()
        return faculty;
    } catch (error) {
        console.log(error)
        return error;
    }
}

const getAllFacSubs = async(subject_id)=> {
    console.log(subject_id[0])
    try{
        const faculty = await prisma.subjects.findMany({
            where:{
                subject_id: {in : subject_id}
            }
        })
        return faculty;
    } catch (error) {
        console.log(error)
        return error;
    }
}

const getAllSubject = async () => {
    try {
        const subjects = await prisma.subjects.findMany()
        return subjects;
    } catch (error) {
        console.log(error)
        return error;
    }
};

const getFacultybyDept = async(department)=> {
    try{
        const faculty = await prisma.faculty.findMany({
            where:{
                department: department
            }
        })
        return faculty;
    } catch (error) {
        console.log(error)
        return error;
    }
}

const getFacultybyMail = async(mail)=> {
    try{
        const faculty = await prisma.faculty.findMany({
            where:{
                email: mail
            }
        })
        return faculty;
    } catch (error) {
        console.log(error)
        return error;
    }
}


const getModbySub = async (subject_id) => {
    try {
        const modules = await prisma.modules.findMany({
            where:{
                subject_id: subject_id
            }
        })
        return modules;
    } catch (error) {
        console.log(error)
        return error;
    }
}

const getOneModbyID = async (module_id) => {
    try {
        const modules = await prisma.modules.findUnique({
            where:{
                module_id: module_id
            }
        })
        return modules;
    } catch (error) {
        console.log(error)
        return error;
    }
}

const getSubbyDept = async (batch,department) => {
    try {
        const subjects = await prisma.subjects.findMany({
            where:{
                department : department,
                batch: batch
            }
        })
        return subjects;
    } catch (error) {
        console.log(error)
        return error;
    }
}

const getSubjectbyID = async (subject_id) => {
    try {
        const subjects = await prisma.subjects.findUnique({
            where:{
                subject_id: subject_id
            }
        })
        return subjects;
    } catch (error) {
        console.log(error)
        return error;
    }
}

export default { 
    getAllFaculty,
    getAllFacSubs,
    getAllSubject,
    getFacultybyDept,
    getFacultybyMail,
    getModbySub,
    getOneModbyID,
    getSubbyDept,
    getSubjectbyID,
};
