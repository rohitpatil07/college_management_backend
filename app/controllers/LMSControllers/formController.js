import subjectService from '../../services/LMSServices/subjectService.js';
import facultyService from '../../services/LMSServices/facultyService.js';
import filterService from '../../services/filterService.js';

const createSubject = async (req, res) => {
  try {
    const data = await subjectService.createSubject(req.body);
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

export default {
  createSubject,
  updateStudents,
  upsertFaculty,
  upsertModule,
  upsertReadingMaterial,
};
