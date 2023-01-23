import prisma from '../config/prisma.js';
import filterService from './filterService.js';
import sendMail from '../util/mail.js';

const upsertCompany = async (data) => {
  try {
    if(data.company_id==null||data.company_id==undefined){
      await prisma.company.create({
        data,
      });
      return { success: 'Company added' };
    }
    else{
      await prisma.company.update({
        where:{
          company_id:data.company_id
        },
        data,
      })
      return { success: 'Company updated' };
    }
  } catch (error) {
    return { error: 'Error adding Company' };
  }
};

const upsertDrive = async (data) => {
  try {
    let { subject, message, queries, ...data } = data;
    if(data.drive_id==null||data.drive_id==undefined){
      await prisma.drives.create({
        data,
      });
      let students = await filterService.getDashboard({email:true},queries)
      const emails = students.map((student) => student.email);
      console.log(emails)
      //sendMail(['sohamtalekar7@gmail.com'], 'Drive Added', 'This is a test mail')
      return { success: 'Drive added' };
    }
    else{
      await prisma.drives.update({
        where:{
          drive_id:data.drive_id
        },
        data,
      })
      return { success: 'Drive updated' };
    }
  } catch (error) {
    return { error: 'Error adding Drive' };
  }
};

const updateCompanyPassword = async (email, password) => {
  try {
    await prisma.company.updateMany({
      where: {
        email: email,
      },
      data: {
        password: password,
      },
    });

    return 'Password Updated';
  } catch (error) {
    return 'Invalid Credentials';
  }
};

export default {
  upsertCompany,
  upsertDrive,
  updateCompanyPassword,
};
