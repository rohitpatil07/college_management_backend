import studentService from '../services/studentService.js';
import companyService from '../services/companyService.js';
//Student
const createAcademicInfo = async (req, res) => {
  try{
    const data = req.body.academic;
    const result = await studentService.upsertAcademicInfo(data)

    res.json(result);
    return res.status(200);
  } catch (error) {
    return res.json(error);
  }
};

const createAppliedDrive = async (req, res) => {
  try{
    const data = req.body.applieddrive;
    const result = await studentService.upsertAppliedDrive(data)

    res.json(result);
    return res.status(200);
  } catch (error) {
    return res.json(error);
  }
};

const createExtracurricular = async (req, res) => {
  try{
    const data = req.body.extra;
    const result = await studentService.upsertExtracurricular(data)

    res.json(result);
    return res.status(200);
  } catch (error) {
    return res.json(error);
  }
};

const createOffer = async (req, res) => {
  try{
    const data = req.body.offer;
    const result = await studentService.createOffer(data)

    res.json(result);
    return res.status(200);
  } catch (error) {
    return res.json(error);
  }
};

const createProject = async (req, res) => {
  try{
    const data = req.body.project;
    const result = await studentService.upsertProject(data)

    res.json(result);
    return res.status(200);
  } catch (error) {
    return res.json(error);
  }
};

const createResumedata = async (req, res) => {
  try{
    const data = req.body.resume;
    const result = await studentService.upsertResumedata(data)

    res.json(result);
    return res.status(200);
  } catch (error) {
    return res.json(error);
  }
};

const createStudent = async (req, res) => {
  try {
    const data = req.body.student;
    const result = await studentService.upsertStudent(data);

    res.json(result);
    return res.status(200);
  } catch (error) {
    return res.json(error);
  }
};

const createWorkexperience = async (req, res) => {
  try{
    const data = req.body.work;
    const result = await studentService.upsertWorkexperience(data)

    res.json(result);
    return res.status(200);
  } catch (error) {
    return res.json(error);
  }
};

//Company section
const createCompany = async (req, res) => {
  try {
    const data = req.body.company;
    const result = await companyService.upsertCompany(data);

    res.json(result);
    return res.status(200);
  } catch (error) {
    return res.json(error);
  }
};

const createDrives = async (req, res) => {
  try {
    const data = req.body.drive;
    const result = await companyService.upsertDrive(data);

    res.json(result);
    return res.status(200);
  } catch (error) {
    return res.json(error);
  }
};

export default { 
  createStudent, 
  createAcademicInfo, 
  createAppliedDrive, 
  createExtracurricular, 
  createOffer,
  createProject, 
  createResumedata, 
  createStudent, 
  createWorkexperience, 
  createCompany, 
  createDrives, 
};
