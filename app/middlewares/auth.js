import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const extract_token = async (req) => {
  return req.cookies.jwt;
};

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
        if (roles[i] == payload.auth_obj.user.role) {
          flag = 1;
          break;
        }
      }

      if (!flag) {
        res.json({ Error: 'You are not authorized' });
      }

      req.email = payload.auth_obj.user.email;
      req.auth=auth
    } catch (error) {
      console.log(error);
      return res.status(401).json({ Error: 'Token missing or Invalid' });
    }

    next();
  };
};

export default authenticate;
