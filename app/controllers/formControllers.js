import prisma from '../config/prisma.js';

const createStudent = async (req, res) => {
  try {
    // await prisma.students.create({
    //   roll_no: '19IT1024',
    //   first_name: 'Rohit',
    //   last_name: 'Patil',
    // });

    const test = await prisma.students.findMany();
    console.log(test);
    //   let students = await filterService.getAllStudents();
    res.json({ student: 'student' });
  } catch (error) {
    res.json(error);
  }
};

export default { createStudent };
