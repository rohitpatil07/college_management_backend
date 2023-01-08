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
        console.log(error);
        return error;
    }
}

export default{
    getReadMatById,
}