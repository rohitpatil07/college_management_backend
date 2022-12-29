import prisma from '../config/prisma.js';

const upsertCompany = async (data) => {
  try {
    await prisma.company.create({
      data,
    });
    return { success: 'Company added' };
  } catch (error) {
    return { error: 'Error adding Company' };
  }
};

const upsertDrive = async (data) => {
  try {
    await prisma.drives.create({
      data,
    });
    return { success: 'Drive added' };
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
