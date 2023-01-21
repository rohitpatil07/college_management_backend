import subjectService from '../../services/LMSServices/subjectService.js';
import facultyService from '../../services/LMSServices/facultyService.js';

const addDILO = async (req, res) => {
  try{
    const data = await subjectService.addDILO(req.body);
    res.status(200).json(data);
  } catch (error){
    return res.status(422).json(error);
  }
}

const createForm = async (req, res) => {
    try {
      let form = req.body.form
      form.DILO=JSON.stringify(form.DILO)
      const data = await subjectService.createForm(form);
      res.status(200).json(data);
  } catch (error){
    return res.status(422).json(error);
    }
  };

const createSubject = async (req, res) => {
  try {
    const data = await subjectService.createSubject(req.body.subject);
    res.json(data);
  } catch (error) {
    return res.json(error);
  }
};

// const updateStudents = async (req, res) => {
//   try {
//     const data = await subjectService.updateStudents(req.body);
//     res.json(data);
//   } catch (error) {
//     return res.json(error);
//   }
// };

const upsertFaculty = async (req, res) => {
  try {
    const data = await facultyService.upsertFaculty(req.body.faculty);
    res.status(200).json(data);
  } catch (error) {
    return res.status(422).json(error);
  }
};

const upsertModule = async (req, res) => {
  try {
    const data = await facultyService.upsertModule(req.body.module);
    res.json(data);
  } catch (error) {
    return res.json(error);
  }
};

const upsertReadingMaterial = async (req, res) => {
  try {
    const data = await facultyService.upsertReadingMaterial(req.body.reading);
    res.status(200).json(data);
  } catch (error) {
    return res.json(error);
  }
};

export default {
  addDILO,
  createForm,
  createSubject,
  upsertFaculty,
  upsertModule,
  upsertReadingMaterial,
};
