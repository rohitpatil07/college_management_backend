import authService from '../services/authService.js';

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.json({ error: 'pls fill all the fields' });
    }
    const result = await authService.login(email, password, role);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

export default { login };
