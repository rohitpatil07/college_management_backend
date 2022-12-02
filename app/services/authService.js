import prisma from '../config/prisma.js';
import config from '../config/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (email, password, role) => {
  if (role == 'student') {
    try {
      const student = await prisma.students.findMany({
        where: {
          email: {
            equals: email,
          },
        },
        select: {
          roll_no: true,
          email: true,
          password: true,
        },
      });

      if (!student[0]) {
        return 'You are not authorized';
      }
      const result = await bcrypt.compare(password, student[0]['password']);

      let auth_obj = {};
      auth_obj['student'] = student[0];

      if (result) {
        let token = jwt.sign({ email: email, role: role }, config.JWT_SECRET);
        auth_obj['token'] = token;
      } else {
        return 'You are not authorized';
      }

      return auth_obj;
    } catch (err) {
      return err;
    }
  }
  if (role == 'admin') {
    try {
      const admin = await prisma.admins.findMany({
        where: {
          email: {
            equals: email,
          },
        },
        select: {
          college_name: true,
          email: true,
          password: true,
        },
      });

      if (!admin[0]) {
        return 'You are not authorized';
      }

      let auth_obj = {};
      auth_obj['admin'] = admin[0];
      const result = await bcrypt.compare(password, admin[0]['password']);

      if (result) {
        let token = jwt.sign({ email: email, role: role }, config.JWT_SECRET);
        auth_obj['token'] = token;
      } else {
        return 'You are not authorized';
      }

      return auth_obj;
    } catch (err) {
      return err;
    }
  }
  if (role == 'company') {
    try {
      const company = await prisma.company.findMany({
        where: {
          email: {
            equals: email,
          },
        },
        select: {
          company_id: true,
          company_name: true,
          email: true,
          password: true,
        },
      });

      if (!company[0]) {
        return 'You are not authorized';
      }

      let auth_obj = {};
      auth_obj['company'] = company[0];

      const result = await bcrypt.compare(password, company[0]['password']);

      if (result) {
        let token = jwt.sign({ email: email, role: role }, config.JWT_SECRET);
        auth_obj['token'] = token;
      } else {
        return 'You are not authorized';
      }

      return auth_obj;
    } catch (err) {
      return err;
    }
  }
};

const hash_password = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(String(password), salt);
  return hashed;
};

export default { login };
