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

const postComment = async (data) => {
  try {
    const comment = await prisma.forum_messages.create({
      data,
    });
    if(data.reply_to != 0){
      const reply = await prisma.forum_messages.update({
        where: {
          message_id: data.reply_to
        },
        data: {
          replies: {
            increment: 1
          }
        }
      })
    }
    return comment;
  } catch (error) {
    return error;
  }
}

const updateComment = async (data) => {
  try {
    const reply = await prisma.forum_messages.update({
      where: {
        message_id: data.message_id
      },
      data,
    });
    return reply;
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
    postComment,
    updateComment,
    upsertForum,
    updateAssignmentStudents,
  };