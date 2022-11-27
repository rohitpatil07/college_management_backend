import formService from '../services/formService.js';

const createStudent = async (req, res) => {
  try {
    const data = req.body.student;
    const result = await formService.addStudent(data);

    res.json(result);
    return res.status(200);
  } catch (error) {
    return res.json(error);
  }
};

export default { createStudent };
