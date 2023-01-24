import prisma from '../../config/prisma.js';

const getAllSubmissions=async(assignment_id)=>{
    try{
        const download_file = await prisma.assignment_submissions.findMany({
            where:{
                assignment_id: assignment_id
            },
            select:{
                file_name: true,
                file: true,
                file_type: true
            }
        })
        return download_file;
    }
    catch(error){
        return error;
    }
}

const getReadMatById=async(reading_material_id)=>{
    try{
        const download_file = await prisma.reading_material.findUnique({
            where:{
                reading_material_id: reading_material_id
            },
            select:{
                file_name: true,
                file: true,
                file_type: true
            }
        })
        return download_file;
    }
    catch(error){
        return error;
    }
}

const getSubmissionById=async(assignment_id,roll_no)=>{
    console.log(assignment_id,roll_no)
    try{
        const download_file = await prisma.assignment_submissions.findUnique({
            where:{
                roll_no_assignment_id:{
                    roll_no,
                    assignment_id
                }
            },
            select:{
                file_name: true,
                file: true,
                file_type: true
            }
        })
        return download_file;
    }
    catch(error){
        return error;
    }
}

export default{
    getAllSubmissions,
    getReadMatById,
    getSubmissionById,
}