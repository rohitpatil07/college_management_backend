import subjectService from '../../services/LMSServices/subjectService.js';

const getSubject = async (req, res) => {
  const data = await subjectService.getSubject();
  res.json(data);
};

export default { getSubject };
