import deleteService from '../../services/LMSServices/deleteService.js';

const deleteDILO = async (req, res) => {
  try{
    const data = await deleteService.deleteDILO(req.body.subject_id,req.body.roll_no);
    res.json(data);
  } catch (error){
    return res.json(error);
  }
}

const deleteForum = async (req, res) => {
  try{
    const data = await deleteService.deleteForum(parseInt(req.params.forum_id));
    res.json(data);
  } catch (error){
    return res.json(error);
  }
}

const deleteForm = async (req, res) => {
  try{
    const data = await deleteService.deleteForm(parseInt(req.params.form_id));
    res.json(data);
  } catch (error){
    return res.json(error);
  }
}

export default {
  deleteDILO,
  deleteForum,
  deleteForm
};  