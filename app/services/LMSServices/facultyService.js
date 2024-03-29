import prisma from '../../config/prisma.js';
import password from '../authService.js';

const closeForum = async (forum_id) => {
  console.log(forum_id);
  try {
    const forum = await prisma.forum.update({
      where: {
        forum_id: forum_id
      },
      data: {
        status: false
      }
    })
    return forum;
  } catch (error) {
    console.log(error)
    return error;
  }
}

const createForm = async(data) => {
  try{
    const form = await prisma.forms.create({
      data
    })
    return form;
  } catch (error) {
    return error;
  }
}

const takeAttendance = async (data) => {
  try {
    const attendance = await prisma.attendance.create({
      data
    })
    return attendance;
  } catch (error) {
    return error;
  }
}

const upsertAssignmentTeachers = async (data) => {
  try {
    if (data.assignment_id == null || data.assignment_id == undefined) {
      const assignment = await prisma.assignment.create({
        data,
      });
      return assignment;
    } else {
      const assignment = await prisma.assignment.update({
        where: {
          assignment_id: data.assignment_id,
        },
        data,
      });
      return assignment;
    }
  } catch (error) {
    return error;
  }
}

const upsertFaculty = async (data) =>{
    try{
        data.password = await password.hash_password(data.password);
        const faculty = await prisma.Faculty.upsert({
            where:{
                email : data.email 
              },
              update: data,
              create: data,
        })
        return { message: "Faculty Created/Updated Successfully"}
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
    if (data.reading_material_id == null ||data.reading_material_id == undefined){
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
    closeForum,
    createForm,
    takeAttendance,
    upsertAssignmentTeachers,
    upsertFaculty,
    upsertModule,
    upsertReadingMaterial,
};