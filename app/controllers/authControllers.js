import authService from '../services/authService.js';

const login = async (req, res) => {
  try {
    const {mail,password,role}=req.body;

	if (!mail || !password || !role) {
		return res.json(
		{error:"pls fill all the fields"}
		)}
    const result = await authService.login(mail,password,role);    
    res.json(result);

  } catch (err) {
    res.json(err);
  }
};

export default {login}
