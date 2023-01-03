import filterService from '../../services/LMSServices/filterService.js';

const getAllFaculty = async (req, res) => {
    try{
        const data = await filterService.getAllFaculty();
        res.json(data);
    } catch(error){
        res.json(error)
    }
};

const getAllSubject = async (req, res) => {
    try{
        const data = await filterService.getAllSubject();
        res.json(data);
    } catch(error){
        res.json(error)
    }
};

const getFacultybyDept = async (req, res) => {
    try{
        const data = await filterService.getFacultybyDept(req.params.dept);
        res.json(data);
    } catch(error){
        res.json(error)
    }
}

const getFacultybyMail = async (req, res) => {
    try{
        const data = await filterService.getFacultybyMail(req.params.mail);
        res.json(data);
    } catch(error){
        res.json(error)
    }
}

const getSubjectbyID = async (req,res) => {
    try{
    const data = await filterService.getSubjectbyID(req.params.subid);
    res.json(data);
    } catch(error){
        res.json(error)
    }
};

export default {
  getAllFaculty,
  getAllSubject,
  getFacultybyDept,
  getFacultybyMail,
  getSubjectbyID,  
};