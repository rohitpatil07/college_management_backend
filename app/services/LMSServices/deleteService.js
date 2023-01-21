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
        console.log(error)
      return { error: 'Error deleting DLO/ILO' };
    }
};

export default {
    deleteDILO,
  };