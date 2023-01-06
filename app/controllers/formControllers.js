import studentService from '../services/studentService.js';
import companyService from '../services/companyService.js';
import filterService from '../services/filterService.js';
import utilityservice from '../util/eligibleUtility.js';
//Student
const createAcademicInfo = async (req, res) => {
  try {
    const data = req.body.academic;
    const result = await studentService.upsertAcademicInfo(data);

    res.json(result);
    return res.status(200);
  } catch (error) {
    return res.json(error);
  }
};

const createAppliedDrive = async (req, res) => {
  try {
    const data = req.body.applieddrive;
    const result = await studentService.createAppliedDrive(data);

    res.json(result);
    return res.status(200);
  } catch (error) {
    return res.json(error);
  }
};

const createExtracurricular = async (req, res) => {
  try {
    const data = req.body.extra;
    const result = await studentService.upsertExtracurricular(data);

    res.json(result);
    return res.status(200);
  } catch (error) {
    return res.json(error);
  }
};

const createOffer = async (req, res) => {
  try {
    const data = req.body.offer;
    const offer_count = await filterService.getOffersCount(data.roll_no);
    if (offer_count < 2) {
      data.offer_id = data.roll_no + `${offer_count + 1}`;
      const result = await studentService.createOffer(data);
      res.json(result);
      return res.status(200);
    } else {
      return res.status(401).json({ error: 'Maximum offers reached' });
    }
  } catch (error) {
    return res.json(error);
  }
};

const updateOffer = async (req, res) => {
  try {
    const offer_id = req.body.offer_id;
    const data = req.body.update;
    console.log(data);
    const result = await studentService.updateOffer(offer_id, data);
    res.json(result);
    return res.status(200);
  } catch (error) {
    return res.json(error);
  }
};

const createBulkOffers = async (req, res) => {
  try {
    const data = req.body;
    let roll_no = data.map((a) => a.roll_no);
    const offer_count = await filterService.getMultipleOffersCount(roll_no);
    const eligible = await utilityservice.offercheck(offer_count, data);
    console.log(eligible);
    let final_roll = eligible.map((a) => a.roll_no);
    console.log(final_roll);
    const result = await studentService.createBulkOffers(final_roll, eligible);
    res.json(result);
    return res.status(200);
  } catch (error) {
    return res.json(error);
  }
};

const createProject = async (req, res) => {
  try {
    const data = req.body.project;
    const result = await studentService.upsertProject(data);

    res.json(result);
    return res.status(200);
  } catch (error) {
    return res.json(error);
  }
};

const createResumedata = async (req, res) => {
  try {
    const data = req.body.resume;
    const result = await studentService.upsertResumedata(data);

    res.json(result);
    return res.status(200);
  } catch (error) {
    return res.json(error);
  }
};

const upsertStudent = async (req, res) => {
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
  try {
    const data = req.body.work;
    const result = await studentService.upsertWorkexperience(data);

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
  upsertStudent,
  createAcademicInfo,
  createAppliedDrive,
  createExtracurricular,
  createOffer,
  createBulkOffers,
  updateOffer,
  createProject,
  createResumedata,
  createWorkexperience,
  createCompany,
  createDrives,
};
