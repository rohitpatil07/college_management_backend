import prisma from '../config/prisma.js';

const getAllStudents = async () => {
  try {
    const student_data = await prisma.students.findMany();

    let students = [];

    student_data.forEach((student_info) => {
      const { password, ...student } = student_info;
      students.push(student);
    });

    return students;
  } catch (error) {
    return error;
  }
};

const getStudent = async (roll_no) => {
  try {
    let student_data = await prisma.students.findUnique({
      where: {
        roll_no: roll_no,
      },
      include: {
        resume_data: true,
        academic_info: true,
        offers: true,
        work_experience: true,
        projects: true,
        applied_to_drives: true,
        extra_curricular: true,
      },
    });

    const { password, ...student } = student_data;

    return student;
  } catch (error) {
    return error;
  }
};

const getStudentsByDept = async (department) => {
  try {
    let student_data = await prisma.students.findMany({
      where: {
        department: department,
      },
    });

    let students = [];

    student_data.forEach((student_info) => {
      const { password, ...student } = student_info;
      students.push(student);
    });

    return students;
  } catch (error) {
    return error;
  }
};

const getPaginatedDashboard = async (select_fields, queries, page, limit) => {
  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const students = await prisma.students.findMany({
      select: select_fields,
      where: queries,
      skip: startIndex,
      take: endIndex - startIndex,
    });

    let results = {};
    results['students'] = students;

    if (page == 1) {
      results['previous'] = 1;
    } else {
      results['previous'] = page - 1;
    }

    if (results.students.length < 1) {
      results['next'] = 2;
      results['previous'] = 1;
      const students = await prisma.students.findMany({
        where: queries,
        select: select_fields,
        skip: 0,
        take: limit,
      });

      results['students'] = students;
    } else if (results.students.length < limit) {
      results['next'] = 1;
    } else {
      results['next'] = page + 1;
    }

    return results;
  } catch (error) {
    return error;
  }
};

const getDashboard = async (select_fields, queries) => {
  try {
    const students = await prisma.students.findMany({
      select: select_fields,
      where: queries,
    });

    return students;
  } catch (error) {
    return error;
  }
};
const getAllDrives = async () => {
  try {
    let available_drives = await prisma.drives.findMany({});
    let company_name = await prisma.company.findMany({
      select: {
        company_id: true,
        company_name: true,
      },
    });
    for (var i = 0; i < available_drives.length; i++) {
      for (var j = 0; j < company_name.length; j++) {
        if (company_name[j].company_id == available_drives[i].company_id) {
          available_drives[i].company_name = company_name[j].company_name;
        }
      }
    }
    return available_drives;
  } catch (error) {
    return error;
  }
};

const getEligibleData = async (roll_no) => {
  try {
    let student_data = await prisma.students.findUnique({
      where: {
        roll_no: roll_no,
      },
      select: {
        gender: true,
        academic_info: {
          select: {
            tenth_percent: true,
            twelveth_percent: true,
            diploma_percent: true,
            cgpa: true,
            be_percent: true,
            gap: true,
            livekt: true,
            deadkt: true,
          },
        },
        applied_to_drives: true,
        offers: {
          select: {
            company_name: true,
            package: true,
          },
        },
      },
    });
    return student_data;
  } catch (error) {
    console.log(error);
  }
};

const getAllCompanies = async () => {
  try {
    const students = await prisma.company.findMany();
    return students;
  } catch (error) {
    return error;
  }
};

export default {
  getAllStudents,
  getStudent,
  getStudentsByDept,
  getPaginatedDashboard,
  getDashboard,
  getAllDrives,
  getEligibleData,
  getAllCompanies,
};
