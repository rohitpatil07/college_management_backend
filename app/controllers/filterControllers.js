import filterService from '../services/filterService.js';
import utilityservice from '../util/eligibleUtility.js';

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

const getAllDrives = async (req, res) => {
  try {
    const drives = await filterService.getAllDrives();
    res.json(drives);
  } catch (error) {
    res.json(error);
  }
};

const getEligibleDrives = async (req, res) => {
  try {
    const roll_no = String(req.params.roll_no);
    const criteria = await filterService.getEligibleData(roll_no);
    if (criteria.offers.length <= 2) {
      const drives = await filterService.getAllDrives();
      const eligible = await utilityservice.check(criteria, drives);
      console.log('eligible', eligible);
      res.json(eligible);
    } else {
      return 'Not eligble for placement';
    }
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
  getAllDrives,
  getEligibleDrives,
  getAllCompanies,
};
