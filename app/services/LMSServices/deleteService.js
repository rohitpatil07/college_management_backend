import prisma from '../../config/prisma.js';

const deleteDILO = async (subject_id,roll_no) => {
  try {
    const data = await prisma.subject_in_students.delete({
      where:{
        roll_no_subject_id : {roll_no,subject_id}
      }
    });
    return { success: 'DLO/ILO deleted.' };
  } catch (error) {
    return { error: 'Error deleting DLO/ILO' };
  }
};

const deleteForum = async (forum_id) => {
  try {
    const commentdata = await prisma.forum_messages.deleteMany({
      where:{
        forum_id : forum_id
      }
    });
    const forumdata = await prisma.forum.delete({
      where:{
        forum_id : forum_id
      }
    });
    return { success: 'Forum deleted.' };
  } catch (error) {
    return { error: 'Error deleting forum' };
  }
}

export default {
    deleteDILO,
    deleteForum,
  };