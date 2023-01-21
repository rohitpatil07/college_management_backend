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

const upsertModule = async (data) => {
    try {
      if (data.module_id == null || data.module_id == undefined) {
        const modules = await prisma.modules.create({
          data,
        });
        return modules;
      } else {
        const modules = await prisma.modules.update({
          where: {
            module_id: data.module_id,
          },
          data,
        });
        return modules;
      }
    } catch (error) {
      return error;
    }
  };
  
  const upsertReadingMaterial = async (data) => {
    try {
      if (
        data.reading_material_id == null ||
        data.reading_material_id == undefined
      ) {
        const reading = await prisma.reading_material.create({
          data,
        });
        return reading;
      } else {
        const reading = await prisma.reading_material.update({
          where: {
            reading_material_id: data.reading_material_id,
          },
          data,
        });
        return reading;
      }
    } catch (error) {
      return error;
    }
  };
  
export default { 
    upsertFaculty,
    upsertModule,
    upsertReadingMaterial,
};