import prisma from '../../config/prisma.js';

const createAssignmentStudents = async (data) => {
  try {
      const assignment = await prisma.assignment_submissions.create({
        data,
      });
      return assignment;
  } catch (error) {
    return error;
  }
}

const createBulkStudent = async (data) => {
  try{
    const bulkstudents = await prisma.student.createMany({
      data,
    })
    return bulkstudents;
  } catch (error) {
    return error;
  }
}

const upsertForum = async (data) => {
  try {
    if(data.forum_id == null || data.forum_id == undefined){
      const forum = await prisma.forum.create({
        data
      })
      return forum;
    }
    else {
      const forum = await prisma.forum.update({
        where: {
          forum_id: data.forum_id
        },
        data
      })
      return forum;
    }
  } catch (error) {
    return error;
  }
}

const updateAssignmentStudents = async (data) => {
  try {
      const {roll_no, assignment_id}=data
      const assignment = await prisma.assignment_submissions.update({
        where: {
          roll_no_assignment_id:{
              roll_no, assignment_id,
            }
        },
        data,
      });
      return assignment;
  } catch (error) {
      return error;
  }
}  

export default {
    createAssignmentStudents,
    createBulkStudent,
    upsertForum,
    updateAssignmentStudents,
  };