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

const reset_password = async (req, res) => {
  try {
    const auth_token = req.headers['authorization'];
    const token = auth_token.replace('Bearer ', '');
    const { email, password, old_password } = req.body;
    const response = await authService.reset_password(
      email,
      password,
      old_password,
      token,
    );
    res.json(response);
  } catch (error) {
    res.json({ error: 'Failed to update password' });
  }
};

export default { login, reset_password };
