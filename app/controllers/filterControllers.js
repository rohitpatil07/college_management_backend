import filterService from '../services/filterService.js';

const getAllStudents = async (req, res) => {
  try {
    const students = await filterService.getAllStudents();
    res.json(students);
  } catch (error) {
    res.json(error);
  }
};

const getStudent = async (req, res) => {
  try {
    const roll_no = String(req.params.roll_no);
    const student = await filterService.getStudent(roll_no);
    res.json(student);
  } catch (error) {
    res.json(error);
  }
};

const getStudentsByDept = async (req, res) => {
  try {
    let dept = String(req.params.dept);
    let students = await filterService.getStudentsByDept(dept);
    res.json({ students: students });
  } catch (error) {
    res.json(error);
  }
};

const getPaginatedDashboard = async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);
    const { select_fields, queries } = req.body;

    // const select_fields = {
    //   roll_no: true,
    // first_name: true,
    // academic_info: {
    //   select: {
    //     cgpa: true,
    //   },
    // },
    // projects: {
    //   select: {
    //     proj_name: true,
    //   },
    // },
    // };

    // const queries = {
    //   academic_info: {
    //     cgpa: { gte: 0 },
    //     tenth_percent: { gte: 94.0 },
    //   },
    //   projects: {
    //     every: {
    //       roll_no: { contains: '19IT' },
    //     },
    //   },
    // };

    const students = await filterService.getPaginatedDashboard(
      select_fields,
      queries,
      page,
      limit,
    );
    res.json(students);
  } catch (error) {
    res.json(error);
  }
};

const getDashboard = async (req, res) => {
  try {
    const { select_fields, queries } = req.body;

    const students = await filterService.getDashboard(select_fields, queries);
    res.json(students);
  } catch (error) {
    res.json(error);
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const students = await filterService.getAllCompanies();
    res.json(students);
  } catch (error) {
    res.json(error);
  }
};

export default {
  getAllStudents,
  getStudent,
  getStudentsByDept,
  getPaginatedDashboard,
  getDashboard,
  getAllCompanies,
};
