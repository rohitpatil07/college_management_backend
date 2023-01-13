import subjectService from '../../services/LMSServices/subjectService.js';
import facultyService from '../../services/LMSServices/facultyService.js';
import filterService from '../../services/filterService.js';

const createSubject = async (req, res) => {
  try {
    const data = await subjectService.createSubject(req.body.subject);
    res.json(data);
  } catch (error) {
    return res.json(error);
  }
};

const updateStudents = async (req, res) => {
  try {
    const data = await subjectService.updateStudents(req.body);
    res.json(data);
  } catch (error) {
    return res.json(error);
  }
};

const upsertFaculty = async (req, res) => {
  try {
    const data = await facultyService.upsertFaculty(req.body.faculty);
    res.json(data);
  } catch (error) {
    return res.json(error);
  }
};

const upsertModule = async (req, res) => {
  try {
    const data = await subjectService.upsertModule(req.body.module);
    res.json(data);
  } catch (error) {
    return res.json(error);
  }
};

const upsertReadingMaterial = async (req, res) => {
  try {
    const data = await subjectService.upsertReadingMaterial(req.body.reading);
    res.status(200).json(data);
  } catch (error) {
    return res.json(error);
  }
};

const addSubjectToStudent = async (req, res) => {
  try {
    const { newsubs, roll_no } = req.body.subjects_data;
    if (!roll_no) return res.json('Error processing request');
    const response = await subjectService.addSubjectToStudent(roll_no, newsubs);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

const addSubjectToDept = async (req, res) => {
  try {
    const { department, batch, newsubs } = req.body;
    const select_fields = { roll_no: true };
    const queries = { batch: batch, department: department };

    const students = await filterService.getDashboard(select_fields, queries);

    const response = await subjectService.addSubjectToDept(students, newsubs);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

const addSubjectToFaculty = async (req, res) => {
  try {
    const { email, newsubs } = req.body;
    const response = await subjectService.addSubjectToFaculty(email, newsubs);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

//

export default {
  createSubject,
  updateStudents,
  upsertFaculty,
  upsertModule,
  upsertReadingMaterial,
  addSubjectToStudent,
  addSubjectToDept,
  addSubjectToFaculty,
};
