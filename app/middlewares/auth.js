import jwt  from 'jsonwebtoken';
import config from '../config/index.js';
const authenticate = async (req,res,next) =>
{
    const auth = req.headers['authorization'];
    if(!auth)
    {
        return res.status(422).send('Access denied');
    }
    else
    {
        const token=auth.replace("Bearer ","");
        const verifyToken=jwt.verify(token,config.JWT_SECRET);
        next();
    }
}

export default authenticate