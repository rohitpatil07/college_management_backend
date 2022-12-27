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

const getAllDrives = async () =>{
  try{
    const drives = await prisma.drives.findMany();
    const len=drives.length;
    const id=drives.company_id;
    const company= await prisma.company.findMany({
      where:{
        company_id:id,
      },
      select:{
        company_name:true,
      }
     
    })
    for(var i=0;i<len;i++)
    {
      drives[i].company_name=company[i].company_name;
    }
    console.log(drives);
    return drives;
  }
  catch(error)
  {
    return error;
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
  getAllCompanies,
};
