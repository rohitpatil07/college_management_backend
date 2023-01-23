import prisma from '../../config/prisma.js';

const addDILO = async (data) => {
  try {
    const roll_nos = data.roll_no;
    const subject_ids = data.subject_id;    
    const students = await prisma.students.findMany({
      where: { roll_no: { in: roll_nos } },
      select:{ roll_no: true}
    });
    const subjects = await prisma.subjects.findMany({
      where: { subject_id: { in: subject_ids } },
      select:{subject_id:true}
    });
    let subject_to_students = [];
    students.map(student => {
        subjects.map(subject=>  {
            subject_to_students.push({...student,...subject})
        }
        )
    })
    const finalydone = await prisma.subject_in_students.createMany({
      data: subject_to_students
    });
    return finalydone;
  } catch (error) {
    return error;
  }
};

const createSubject = async (data) => {
  try {
    const {
      subject_code,
      subject_name,
      semester,
      department,
      division,
      batch,
      type,
      email,
    } = data;

    if (type === 'DLO' || type === 'ILO') {
      const subject = await prisma.subjects.create({
        data: {
          subject_code: subject_code,
          subject_name: subject_name,
          semester: semester,
          department: department,
          division: division,
          batch: batch,
          type: type,
          email: email,
        },
      });

      return subject;
    } else if (type === 'LAB') {
      //get students roll_no if subject type is mandatory ie "MD" and connect the subject to faculty

      const students = await prisma.students.findMany({
        where: {
          department: department,
          batch: batch,
          division: { equals: division },
          semester: semester,
        },
        select: {
          roll_no: true,
        },
      });

      //from students extract roll_nos
      let student_data = [];

      students.forEach((stu) => {
        student_data.push({
          student: {
            connect: {
              roll_no: stu.roll_no,
            },
          },
        });
      });

      const subject = await prisma.subjects.create({
        data: {
          subject_code: subject_code,
          subject_name: subject_name,
          semester: semester,
          department: department,
          division: division,
          batch: batch,
          type: type,
          email: email,
          students: {
            create: student_data,
          },
        },
        include: {
          students: true,
        },
      });
      return subject;
    }

    //get students roll_no if subject type is mandatory ie "MD" and connect the subject to faculty

    const students = await prisma.students.findMany({
      where: {
        department: department,
        batch: batch,
        division: { contains: division },
        semester: semester,
      },
      select: {
        roll_no: true,
      },
    });

    //from students extract roll_nos
    let student_data = [];
    students.forEach((student) => {
      student_data.push({
        student: {
          connect: {
            roll_no: student.roll_no,
          },
        },
      });
    });

    //after extracting rollnos add the subject to them by creating an objects

    const subject = await prisma.subjects.create({
      data: {
        subject_code: subject_code,
        subject_name: subject_name,
        semester: semester,
        department: department,
        division: division,
        batch: batch,
        type: type,
        email: email,
        students: {
          create: student_data,
        },
      },
      include: {
        students: true,
      },
    });
    return subject;
  } catch (error) {
    return error;
  }
};

export default {
  addDILO,
  createSubject,
};
