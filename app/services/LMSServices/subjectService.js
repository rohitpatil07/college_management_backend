import prisma from '../../config/prisma.js';

const createSubject = async (data) => {
  try {
    const {
      subject_id,
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
          subject_id: subject_id,
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
          subject_id: subject_id,
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
        subject_id: subject_id,
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

//needs schema work regarding storing subject ids in students before usage
const addDILO = async (data) => {
  try {
    let subject_data = [];
    data.subject_id.forEach((subject_id) => {
      subject_data.push({
        subject: {
          connect: {
            subject_id: subject_id,
          },
        },
      });
    });
    const subjects = await prisma.students.update({
      where: {
        roll_no: data.roll_no,
      },
      data:{
        subjects: {
          create: subject_data
        },
      }
    });
    return subjects;
  } catch (error) {
    return error;
  }
};
//-------------------*-------------------//

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
    if (
      data.reading_material_id == null ||
      data.reading_material_id == undefined
    ) {
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
  createSubject,
  addDILO,
  upsertModule,
  upsertReadingMaterial,
};
