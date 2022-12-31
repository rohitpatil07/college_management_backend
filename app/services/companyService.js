import prisma from '../config/prisma.js';

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
    if(data.drive_id==null||data.drive_id==undefined){
      await prisma.drives.create({
        data,
      });
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
