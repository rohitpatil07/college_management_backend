import prisma from '../../config/prisma.js';

const createSubject = async (data) => {
  try {
    console.log(data)
    const subjects = await prisma.subjects.create({
      data,
    })
   return subjects;
  } catch (error) {
    console.log(error)
    return error;
  }
}

//needs schema work regarding storing subject ids in students before usage
const updateStudents = async (data)=> {
  try{
    console.log(data)
    const subjects = await prisma.students.update({
      where:{
        roll_no:data.roll_no
      },
      data,
    })
   return subjects;
  } catch (error) {
    console.log(error)
    return error;
  }
}
//-------------------*-------------------//

const upsertModule = async (data) => {
  try {
    if(data.module_id==null||data.module_id==undefined){
      const modules = await prisma.modules.create({
        data,
      });
      return modules;
    }
    else{
      const modules = await prisma.modules.update({
        where:{
          module_id:data.module_id
        },
        data,
      })
      return modules;
    }
  } catch (error) {
    console.log(error)
    return error;
  }
}

const upsertReadingMaterial = async (data) => {
  try {
    if(data.reading_material_id==null||data.reading_material_id==undefined){
      const reading = await prisma.reading_material.create({
        data,
      });
      return reading;
    }
    else{
      const reading = await prisma.reading_material.update({
        where:{
          reading_material_id:data.reading_material_id
        },
        data,
      })
      return reading;
    }
  } catch (error) {
    console.log(error)
    return error;
  }
}

export default { 
  createSubject,
  updateStudents,
  upsertModule,
  upsertReadingMaterial,
 };
