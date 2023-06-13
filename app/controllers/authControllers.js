import authService from '../services/authService.js';

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.json({ error: 'pls fill all the fields' });
    }
    const result = await authService.login(email, password, role);
    if(result)
    {
      res.cookie('jwt', result.token, { httpOnly: true, maxAge: 1000 * 60 * 60,sameSite: 'none',
      secure: true});
      return res.json({success:result.user.role})
    }
    else
    {
      return res.json({ error: 'Invalid Credentials' });
    }
  } catch (err) {
    res.json(err);
  }
};


const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 1 });
    res.json({ success: 'User logged out' });
  } catch (error) {
    res.json({ error: 'Failed to logout' });
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

const forgot_mail = async (req, res) => {
  try{
    const mail = req.body.email;
    const role = req.body.role
    const response = await authService.forgot_mail(mail,role);
    res.json(response)
  }
  catch(error)
  {
    console.log(error)
  }
}


const forgot_password = async(req,res) =>
{
    try {
      const auth_token = req.body.headers['Authorization'];
      const token = auth_token.replace('Bearer ', '');
      const new_password = req.body.data.new_password;
      const response = await authService.forgot_password(
        new_password,
        token,
      );
      res.json(response);
    } catch (error) {
      res.json({ error: 'Failed to update password' });
    }
}

const user_data = async(req,res) =>
{
  try{
    const auth_token = req.cookies.jwt;
    const token = auth_token.replace('Bearer ', '');
    const response = await authService.user_data(token);
    res.json(response)
  }
  catch(error)
  {
    console.log(error)
  }
}


export default { login, reset_password,forgot_mail,forgot_password ,user_data,logout};
