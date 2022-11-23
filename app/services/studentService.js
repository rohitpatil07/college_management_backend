import prisma from '../config/prisma.js';

const addStudent = async (data) => {
  try {
    await prisma.students.create({
      data,
    });
    return { success: 'Student added' };
  } catch (error) {
    return { error: 'Error adding student' };
  }
};

export default { addStudent };
