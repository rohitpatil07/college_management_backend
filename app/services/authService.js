import prisma from '../config/prisma.js';
import config from '../config/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (email, login_password, role) => {
  if (role == 'student') {
    try {
      const student_data = await prisma.students.findMany({
        where: {
          email: {
            equals: email,
          },
        },
        select: {
          roll_no: true,
          email: true,
          password: true,
          first_name: true,
          last_name: true,
        },
      });

      let { password, ...student } = student_data[0];

      if (!student_data[0]) {
        return 'You are not authorized';
      }
      const result = await bcrypt.compare(login_password, password);

      let auth_obj = {};
      auth_obj['user'] = student;
      auth_obj['user']['role'] = 'student';

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
      const admin_data = await prisma.admins.findMany({
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

      if (!admin_data[0]) {
        return 'You are not authorized';
      }

      let auth_obj = {};

      let { password, ...admin } = admin_data[0];
      auth_obj['user'] = admin;
      auth_obj['user']['role'] = 'admin';

      const result = await bcrypt.compare(login_password, password);

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
      const company_data = await prisma.company.findMany({
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

      if (!company_data[0]) {
        return 'You are not authorized';
      }

      let auth_obj = {};
      let { password, ...company } = company_data[0];
      auth_obj['user'] = company;
      auth_obj['user']['role'] = 'company';

      const result = await bcrypt.compare(login_password, password);

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
