import prisma from '../config/prisma.js';
import config from '../config/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import companyService from './companyService.js';
import studentService from './studentService.js';
import sendEmail from '../util/mail.js';

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
  if (role == 'faculty') {
    try {
      const faculty_data = await prisma.Faculty.findMany({
        where: {
          email: {
            equals: email,
          },
        },
        select: {
          college_name: true,
          department: true,
          email: true,
          password: true,
          first_name: true,
          last_name: true,
        },
      });

      if (!faculty_data[0]) {
        return 'You are not authorized';
      }

      let auth_obj = {};

      let { password, ...faculty } = faculty_data[0];
      auth_obj['user'] = faculty;
      auth_obj['user']['role'] = 'faculty';

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
  if (role == 'lms_admin') {
    try {
      const lms_admin_data = await prisma.lms_admin.findMany({
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

      if (!lms_admin_data[0]) {
        return 'You are not authorized';
      }

      let auth_obj = {};

      let { password, ...lms_admin } = lms_admin_data[0];
      auth_obj['user'] = lms_admin;
      auth_obj['user']['role'] = 'lms_admin';

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
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

const forgot_password = async (password,token) =>
{
  try {
    //verify token
    const pass=password
    const verified = jwt.verify(token, config.JWT_SECRET);
    const e_mail=verified.email
    if (!verified) {
      return 'Error Authenticating your account';
    }
    // verify email
    // if (email != verified.email) {
    //   return 'Error Authenticating your account';
    // }
    //based on role and email check if current password matches
    if (verified.role == 'student') {
      const student_data = await prisma.students.findMany({
        where: {
          email: {
            equals: e_mail,
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
      if (student_data.length==0) {
        return 'Invalid Credentials';
      }
      //update pass if matched
      else {
        const new_password = await hash_password(pass);
        console.log(new_password);
        const response = await studentService.updateStudentPassword(
          e_mail,
          new_password,
        );
        console.log(response);
        return response;
      }
    } else if (verified.role == 'admin') {
      const admin_data = await prisma.admins.findMany({
        where: {
          email: {
            equals: e_mail,
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

      else {
        //update password
        const new_password = await hash_password(password);

        await prisma.admins.update({
          where: {
            email: verified.email,
          },
          data: {
            password: new_password,
          },
        });
        return 'Password Updated';
      }
    } else if (verified.role == 'company') {
      const company_data = await prisma.company.findMany({
        where: {
          email: {
            equals: e_mail,
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
      else {
        const new_password = await hash_password(password);

        const response = await companyService.updateCompanyPassword(
          e_mail,
          new_password,
        );
        console.log(response);
        return response;
      }
    }
    return 'Error updating password please recheck your credentials';
  } catch (error) {
    return 'Failed to update password';
  }
}

const forgot_mail = async (mail,role) => {
  try{
    const subject="Password Reset"
    let token = jwt.sign({ email: mail ,role:role}, config.JWT_SECRET);
    const link=`http://localhost:3000/forgotpassword?token=${token}`
    const message=`Click here to reset password :${link}`
    const email=mail
    const msg=await sendEmail(email,message,subject)
    console.log(msg)
  }
  catch(error)
  {
    console.log(error)
  }
}

const reset_password = async (email, password, old_password, token) => {
  try {
    //verify token
    const verified = jwt.verify(token, config.JWT_SECRET);
    if (!verified) {
      return 'Error Authenticating your account';
    }

    // verify email
    if (email != verified.email) {
      return 'Error Authenticating your account';
    }

    //based on role and email check if current password matches

    if (verified.role == 'student') {
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

      if (!student_data[0]) {
        return 'Invalid Credentials';
      }

      const password_match = await bcrypt.compare(
        old_password,
        student_data[0].password,
      );

      //update pass if matched
      if (password_match) {
        const new_password = await hash_password(password);

        const response = await studentService.updateStudentPassword(
          email,
          new_password,
        );
        console.log(response);
        return response;
      }
    } else if (verified.role == 'admin') {
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

      const password_match = await bcrypt.compare(
        old_password,
        admin_data[0].password,
      );

      if (password_match) {
        //update password
        const new_password = await hash_password(password);

        await prisma.admins.update({
          where: {
            email: email,
          },
          data: {
            password: new_password,
          },
        });
        return 'Password Updated';
      }
    } else if (verified.role == 'company') {
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

      const password_match = await bcrypt.compare(
        old_password,
        company_data[0].password,
      );

      //if password matches update the password
      if (password_match) {
        const new_password = await hash_password(password);

        const response = await companyService.updateCompanyPassword(
          email,
          new_password,
        );
        console.log(response);
        return response;
      }
    }

    return 'Error updating password please recheck your credentials';
  } catch (error) {
    return 'Failed to update password';
  }
};

export default { login, reset_password , forgot_mail ,forgot_password };
