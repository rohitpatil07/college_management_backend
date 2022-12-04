import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const extract_token=async(req)=>{
  if(req.method=='GET'){
    return req.headers['authorization'];
  }
  else{
    return req.body.headers['Authorization'];
  }
}

const authenticate = (roles) => {
  return async (req, res, next) => {
    try {
      const auth = await extract_token(req);
      const token = auth.replace('Bearer ', '');
      if (!auth) {
        return req.status(401).json({ error: 'Authorization required' });
      }

      const payload = jwt.verify(token, config.JWT_SECRET);

      let flag = 0;

      for (let i = 0; i < roles.length; i++) {
        if (roles[i] == payload.role) {
          flag = 1;
          break;
        }
      }

      if (!flag) {
        res.json({ Error: 'You are not authorized' });
      }

      req.email = payload.email;
      req.auth = auth;
    } catch (error) {
      return res.status(401).json({ Error: 'Token missing or Invalid' });
    }

    next();
  };
};

export default authenticate;
