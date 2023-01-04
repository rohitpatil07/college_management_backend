import prisma from '../config/prisma.js';

const getAllStudents = async () => {
  try {
    const student_data = await prisma.students.findMany();

    let students = [];

    student_data.forEach((student_info) => {
      // eslint-disable-next-line no-unused-vars
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

    // eslint-disable-next-line no-unused-vars
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
      // eslint-disable-next-line no-unused-vars
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
    const comp_id=available_drives.map(a=>a.company_id)
    let company_name = await prisma.company.findMany({
      where:{
        company_id: { in:comp_id}
      },
      select: {
        company_id: true,
        company_name: true,
      },
    });
    for (let i = 0; i < available_drives.length; i++) {
      var result = company_name.filter((e)=>e.company_id == available_drives[i].company_id)
      available_drives[i].company_name = result[0].company_name
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
    const company = await prisma.company.findMany();
    return company;
  } catch (error) {
    return error;
  }
};

const getCompanyDrive = async (company_id) =>{
  try {
    const company = await prisma.drives.findMany({
      where:{
        company_id : company_id,
      }
    });
    return company;
  } catch (error) {
    return error;
  }
};

const getTopPlacedStudents = async () => {
  try {
    let student_list = await prisma.offers.findMany({
      take: 10,
      select: {
        roll_no: true,
        company_name: true,
        package: true,
      },
      orderBy: {
        package: 'desc',
      },
    });
    return student_list;
  } catch (error) {
    return error;
  }
};

const getSelectedStudentsCompanyWise = async () => {
  try {
    let lpa = await prisma.offers.groupBy({
      by: ['company_id'],
      _count: {
        company_id: true,
      },
    });

    let restructure_array = [];
    for (let i = 0; i < lpa.length; i++) {
      let refined_object = {
        placed_company: lpa[i].company_id,
        count: lpa[i]._count.company_id,
      };
      restructure_array.push(refined_object);
    }
    return restructure_array;
  } catch (error) {
    return error;
  }
};

const getSelectedStudentsLpaWise = async () => {
  try {
    let lpa = await prisma.offers.groupBy({
      by: ['package'],
      _count: {
        package: true,
      },
    });

    let restructure_array = [];
    for (let i = 0; i < lpa.length; i++) {
      let refined_object = {
        package: lpa[i].package,
        count: lpa[i]._count.package,
      };
      restructure_array.push(refined_object);
    }
    return restructure_array;
  } catch (error) {
    return error;
  }
};

const getStudentsPlacedByDept = async () => {
  try {
    let placed_students = await prisma.offers.findMany({
      select: {
        roll_no: true,
      },
      where: {
        package: { gte: 1 },
      },
    });

    let placed_by_dept = [];
    for (let students in placed_students) {
      let restructure_object = {
        branch: '',
        count: 0,
      };
      const roll_no = placed_students[students]['roll_no'];
      restructure_object.branch = roll_no.substring(2, 4);
      if (!placed_by_dept.includes(restructure_object.branch)) {
        if (placed_by_dept.length == 0) {
          placed_by_dept[1] = restructure_object;
        } else {
          placed_by_dept[placed_by_dept.length + 1] = restructure_object;
        }
      }
    }
    for (let i = 0; i < placed_by_dept.length; i++) {
      if (placed_by_dept[i] == null) {
        placed_by_dept.splice(i, 1);
      }
    }
    for (let stu in placed_students) {
      const roll_no = placed_students[stu]['roll_no'];
      for (let i = 0; i < placed_by_dept.length; i++) {
        if (
          placed_by_dept[i] != null &&
          placed_by_dept[i].branch == roll_no.substring(2, 4)
        ) {
          placed_by_dept[i].count++;
        }
      }
    }
    return placed_by_dept;
  } catch (error) {
    return error;
  }
};

const getAppliedDrives = async (roll_no) =>{
  try{
    let appliedskeleton = await prisma.students.findUnique({
      where: {
        roll_no: roll_no,
      },
      select: {
        applied_to_drives: true,
      }
    })
    const catalyst=appliedskeleton.applied_to_drives.map(a=>a.drive_id)
    let applied_drives = await prisma.drives.findMany({
      where: {
          drive_id: { in: catalyst },
      }
    })
  const comp_id=applied_drives.map(a=>a.company_id)
  
    let company_name = await prisma.company.findMany({
      where:{
        company_id: { in:comp_id}
      },
      select: {
        company_id: true,
        company_name: true,
      },
    });
    for (let i = 0; i < applied_drives.length; i++) {
      var result = company_name.filter((e)=>e.company_id == applied_drives[i].company_id)
      applied_drives[i].company_name = result[0].company_name
    }
    return applied_drives;
  } catch (error) {
    res.json(error);
  }
}

const getRequestOffers = async (roll_no) =>{
  try{
    let offers = await prisma.students.findUnique({
      where: {
        roll_no: roll_no,
      },
      select: {
        offers: true,
      }
    })
    return offers;
  } catch(error){
    res.json(error)
  }
}

const getAllOffers = async (company_name) =>{
  try{
    let offers = await prisma.offers.findMany({
      where: {
        company_name:company_name
      },
      select:{
        roll_no:true
      }
    })
    const catalyst=offers.map(a=>a.roll_no)
    let details = await prisma.students.findMany({
      where: {
        roll_no: { in:catalyst },
      },
      select: {
        roll_no:true,
        first_name:true,
        last_name:true,
        email:true,
        _count:{
          select:{
            offers: true,
          }
        },
        offers:true
      }
    })
    return details;
  } catch(error){
    res.json(error)
  }
}

const getOffersCount = async (roll_no) =>{
  try{
    let offers = await prisma.students.findUnique({
      where: {
        roll_no: roll_no,
      },
      select: {
        _count:{
          select:{
            offers: true,
          }
        }
      }
    })
    return offers._count.offers;
  } catch(error){
    res.json(error)
  }
}

const getMultipleOffersCount = async (roll_no) =>{
  try{
    let offers = await prisma.students.findMany({
      where: {
        roll_no: { in:roll_no },
      },
      select: {
        roll_no:true,
        _count:{
          select:{
            offers: true,
          }
        }
      }
    })
    return offers;
  } catch(error){
    res.json(error)
  }
}

export default {
  getAllStudents,
  getStudent,
  getStudentsByDept,
  getPaginatedDashboard,
  getDashboard,
  getAllDrives,
  getEligibleData,
  getAllCompanies,
  getCompanyDrive,
  getTopPlacedStudents,
  getSelectedStudentsCompanyWise,
  getSelectedStudentsLpaWise,
  getStudentsPlacedByDept,
  getAppliedDrives,
  getRequestOffers,
  getAllOffers,
  getOffersCount,
  getMultipleOffersCount,
};
