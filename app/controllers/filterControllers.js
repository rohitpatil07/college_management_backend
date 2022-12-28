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


const getTopPlacedStudents = async (req, res) => {
  try {
    const top10studentplaced = await filterService.getTopPlacedStudents();
    return res.json({ top10studentplaced });
  } catch (error) {
    return res.json(error);
  }
};
const getSelectedStudentsCompanyWise = async (req, res) => {
  try {
    const studentsPlacedCompanyWise =
      await filterService.getSelectedStudentsCompanyWise();
    return res.json({ studentsPlacedCompanyWise });
  } catch (error) {
    return res.json(error);
  }
};
const getSelectedStudentsLpaWise = async (req, res) => {
  try {
    const studentsPlacedLpaWise =
      await filterService.getSelectedStudentsLpaWise();
    return res.json({ studentsPlacedLpaWise });
  } catch (error) {
    return res.json(error);
  }
};


const getStudentsPlacedByDept = async (req, res) => {
  try {
    let students = await filterService.getStudentsPlacedByDept();
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
  getTopPlacedStudents,
  getSelectedStudentsCompanyWise,
  getSelectedStudentsLpaWise,
  getStudentsPlacedByDept,
};
