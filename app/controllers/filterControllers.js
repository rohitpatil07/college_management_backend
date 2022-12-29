import filterService from '../services/filterService.js';
import utilityservice from '../util/eligibleUtility.js';
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

const getAppliedDrives = async (req,res) => {
  try{
    const applied_drives = filterService.getAppliedDrives(req.params.roll_no);
    res.json(applied_drives)
  } catch (error) {
    res.json(error);
  }
}

export default {
  getAllStudents,
  getStudent,
  getStudentsByDept,
  getPaginatedDashboard,
  getDashboard,
  getAllDrives,
  getEligibleDrives,
  getAllCompanies,
  getTopPlacedStudents,
  getSelectedStudentsCompanyWise,
  getSelectedStudentsLpaWise,
  getStudentsPlacedByDept,
  notify,
  getAppliedDrives,
};
