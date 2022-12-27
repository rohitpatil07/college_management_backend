import filterService from '../services/filterService.js';
import sendEmail from '../util/mail.js';
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

const notify = async (req, res) => {
  try {
    const { queries, subject, message } = req.body;

    const students_data = await filterService.getDashboard(
      { email: true },
      {
        department: queries.department,
        academic_info: {
          gap: queries.livekt,
          cgpa: queries.cgpa,
          livekt: queries.livekt,
          deadkt: queries.deadkt,
          tenth_percent: queries.tenth_percent,
          twelveth_percent: queries.twelveth_percent,
        },
      },
    );

    let students = [];

    students_data.forEach((student) => {
      if (student.email) students.push(student.email);
    });

    const n = students.length;
    sendEmail(students, message, subject);

    res.json(`Notified ${n} students`);
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
  notify,
};
