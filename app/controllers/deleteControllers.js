import deleteService from '../services/deleteService.js';

const removeStuPic = async  (req, res) => {
    try { 
      const picture = await deleteService.removeStuPic(req.params.rollno);
      res.json(picture);
    } catch (error) {
      res.json(error);
    }
  }; 

const removeDrive = async  (req, res) => {
    try { 
    let driveid=parseInt(req.params.driveid)
    const picture = await deleteService.removeDrive(driveid);
    res.json(picture);
  } catch (error) {
    res.json(error);
  }
}; 

const removeApplied = async  (req, res) => {
    try { 
    let driveid=parseInt(req.params.driveid)
    let roll_no=req.params.rollno
    const picture = await deleteService.removeApplied(driveid,roll_no);
    res.json(picture);
  } catch (error) {
    res.json(error);
  }
}; 

const removeOffer = async (req,res) => {
    try { 
        let offerid=req.params.offerid
        const picture = await deleteService.removeOffer(offerid);
        res.json(picture);
      } catch (error) {
        res.json(error);
      }
}

export default {
    removeStuPic,
    removeDrive,
    removeApplied,
    removeOffer,
}  