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
    updateAssignmentStudents,
  };