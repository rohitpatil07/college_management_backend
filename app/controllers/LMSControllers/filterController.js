import filterService from '../../services/LMSServices/filterService.js';

const getAllFaculty = async (req, res) => {
  try {
    const data = await filterService.getAllFaculty();
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

// const getAllFacSubs = async (req, res) => {
//   try {
//     const data = await filterService.getAllFacSubs(req.body.subjects);
//     res.json(data);
//   } catch (error) {
//     res.json(error);
//   }
// };

const getAllSubject = async (req, res) => {
  try {
    const data = await filterService.getAllSubject();
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

const getFacultybyDept = async (req, res) => {
  try {
    const data = await filterService.getFacultybyDept(req.params.dept);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

const getFacultybyMail = async (req, res) => {
  try {
    const data = await filterService.getFacultybyMail(req.params.mail);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

const getModulebyID = async (req, res) => {
  try {
    const data = await filterService.getOneModbyID(
      parseInt(req.params.moduleid),
    );
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

const getModulebySubject = async (req, res) => {
  try {
    const data = await filterService.getModbySub(req.params.subid);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

const getSubbyDept = async (req, res) => {
  try {
    const data = await filterService.getSubbyDept(
      parseInt(req.params.batch),
      req.params.dept,
      parseInt(req.params.sem)
    );
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

const getSubjectbyID = async (req, res) => {
  try {
    const data = await filterService.getSubjectbyID(req.params.subid);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

const getReadMatByModuleId = async (req, res) => {
  try {
    const data = await filterService.getReadingMaterialByModuleId(
      parseInt(req.params.moduleid),
    );
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

const getFacultySubjects = async (req, res) => {
  try {
    const { email } = req.body;
    const subjects = await filterService.getFacultySubjects(email);
    return res.json(subjects);
  } catch (error) {
    res.json(error);
  }
};

export default {
  getAllFaculty,
  //  getAllFacSubs,
  getAllSubject,
  getFacultybyDept,
  getFacultybyMail,
  getModulebyID,
  getModulebySubject,
  getSubbyDept,
  getSubjectbyID,
  getReadMatByModuleId,
  getFacultySubjects,
};
