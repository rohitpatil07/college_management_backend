import prisma from '../../config/prisma.js';

const upsertFaculty = async (data) =>{
    try{
        const faculty = await prisma.Faculty.upsert({
            where:{
                email : data.email 
              },
              update: data,
              create: data,
        })
        return faculty
    } catch (error){
        return res.json(error);
    }
}

export default { 
    upsertFaculty,
};