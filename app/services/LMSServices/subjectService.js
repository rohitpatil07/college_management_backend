import prisma from '../../config/prisma.js';

const upsertSubject = async (data) => {
  try {
    console.log(data)
    //const subjects = await prisma.subjects.upsert({
    //   where:{
    //     subject_id : data.subject_id 
    //   },
    //   update: data,
    //   create: data,
    // })
//    return subjects;
  } catch (error) {
    console.log(error)
    return error;
  }
}

const upsertModule = async (data) => {
  try {
    const modules = await prisma.modules.upsert({
      where:{
        module_id : data.module_id 
      },
      update: data,
      create: data,
    })
    return modules;
  } catch (error) {
    console.log(error)
    return error;
  }
}

const upsertReadingMaterial = async (data) => {
  try {
    const reading = await prisma.reading_material.upsert({
      where:{
        reading_material_id : data.reading_material_id 
      },
      update: data,
      create: data,
    })
    return reading;
  } catch (error) {
    console.log(error)
    return error;
  }
}

export default { 
  upsertSubject,
  upsertModule,
  upsertReadingMaterial,
 };
