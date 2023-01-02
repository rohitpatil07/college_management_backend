import deleteService from '../services/deleteService.js';

const removeApplied = async  (req, res) => {
    try { 
    let driveid=parseInt(req.params.driveid)
    let roll_no=req.params.rollno
    const applied = await deleteService.removeApplied(driveid,roll_no);
    res.json(applied);
  } catch (error) {
    res.json(error);
  }
}; 

const removeDrive = async  (req, res) => {
  try { 
    let driveid=parseInt(req.params.driveid)
    const drive = await deleteService.removeDrive(driveid);
    res.json(drive);
  } catch (error) {
    res.json(error);
  }
};

const removeExtracurricular = async (req,res) => {
  try { 
      let extraid=req.params.extraid
      const extra = await deleteService.removeExtracurricular(extraid);
      res.json(extra);
    } catch (error) {
      res.json(error);
    }
}

const removeOffer = async (req,res) => {
    try { 
        let offerid=req.params.offerid
        const offer = await deleteService.removeOffer(offerid);
        res.json(offer);
      } catch (error) {
        res.json(error);
      }
}

const removeProject = async (req,res) => {
  try { 
      let projectid=req.params.projectid
      const project = await deleteService.removeProject(projectid);
      res.json(project);
    } catch (error) {
      res.json(error);
    }
}

const removeStuPic = async  (req, res) => {
  try { 
      const picture = await deleteService.removeStuPic(req.params.rollno);
      res.json(picture);
  } catch (error) {
      res.json(error);
  }
}; 

const removeWorkexperience = async (req,res) => {
  try { 
      let workid=req.params.workid
      const work = await deleteService.removeWorkexperience(workid);
      res.json(work);
    } catch (error) {
      res.json(error);
    }
}

export default {
    removeApplied,
    removeDrive,
    removeExtracurricular,
    removeOffer,
    removeProject,
    removeStuPic,
    removeWorkexperience,
}  