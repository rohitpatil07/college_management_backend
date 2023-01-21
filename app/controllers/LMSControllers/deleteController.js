import deleteService from '../../services/LMSServices/deleteService.js';

const deleteDILO = async (req, res) => {
    try{
      const data = await deleteService.deleteDILO(req.body.subject_id,req.body.roll_no);
      res.json(data);
    } catch (error){
      return res.json(error);
    }
}

export default {
    deleteDILO,
};  