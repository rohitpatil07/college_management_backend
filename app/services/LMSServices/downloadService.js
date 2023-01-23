import prisma from '../../config/prisma.js';

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
    try{
        const download_file = await prisma.submission.findUnique({
            where:{
                roll_no_assignment_id:{
                    roll_no: roll_no,
                    assignment_id: assignment_id
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
    getReadMatById,
    getSubmissionById,
}