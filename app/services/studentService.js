import prisma from '../config/prisma.js';

const upsertAcademicInfo = async (data) => {
  try {
    let count = 0;
    let gpa = 0;
    for (let i = 1; i <= 8; i++) {
      var x = 'sem' + `${i}` + '_pointer';
      if (data[x] != null) {
        count++;
        gpa = gpa + data[x];
      }
    }
    let cgpa = gpa / count;
    let be_percent = (7.4 * cgpa + 12).toPrecision(2);
    data.cgpa = cgpa;
    data.be_percent = be_percent;
    await prisma.academic_info.upsert({
      where: {
        roll_no: data.roll_no,
      },
      update: data,
      create: data,
    });

    return { success: 'AcademicInfo added' };
  } catch (error) {
    return { error: 'Error adding AcademicInfo' };
  }
};

const createAppliedDrive = async (data) => {
  try {
    await prisma.applied_to_drives.create({
      data,
    });
    return { success: 'AppliedDrive added' };
  } catch (error) {
    console.log(error);
    return { error: 'Error adding AppliedDrive' };
  }
};

const createBulkOffers = async (roll_no,data) => {
  try {
    await prisma.offers.createMany({
      data,
    });
    return { success: 'Offers added' };
  } catch (error) {
    return { error: 'Error adding Offer' };
  }
};

const upsertExtracurricular = async (data) => {
  try {
    //change pos_res varhar size to something bigger
    await prisma.extra_curricular.upsert({
      where: {
        extra_id: data.extra_id,
      },
      update: data,
      create: data,
    });
    return { success: 'Extracurricular added' };
  } catch (error) {
    return { error: 'Error adding Extracurricular' };
  }
};

const createOffer = async (data) => {
  try {
    await prisma.offers.create({
      data,
    });
    return { success: 'Offer added' };
  } catch (error) {
    return { error: 'Error adding Offer' };
  }
};

const updateOffer = async (offer_id,data)=>{
  try{
    await prisma.offers.update({
      where:{
        offer_id:offer_id
      },
      data
    }) 
  } catch (error) {
    return { error: 'Error updating Offer' };
  }
}

const upsertProject = async (data) => {
  try {
    await prisma.projects.upsert({
      where: {
        proj_id: data.proj_id,
      },
      update: data,
      create: data,
    });
    return { success: 'Project added' };
  } catch (error) {
    return { error: 'Error adding Project' };
  }
};

const upsertResumedata = async (data) => {
  try {
    await prisma.resume_data.upsert({
      where: {
        roll_no: data.roll_no,
      },
      update: data,
      create: data,
    });
    return { success: 'Resumedata added' };
  } catch (error) {
    return { error: 'Error adding Resumedata' };
  }
};

const upsertStudent = async (data) => {
  if (data.batch) {
    data.batch = parseInt(data.batch);
  }
  console.log(data);
  try {
    await prisma.students.upsert({
      where: {
        roll_no: data.roll_no,
      },
      update: data,
      create: data,
    });
    return { success: 'Student added' };
  } catch (error) {
    return { error: 'Error adding student' };
  }
};

const upsertWorkexperience = async (data) => {
  try {
    await prisma.work_experience.upsert({
      where: {
        work_id: data.work_id,
      },
      update: data,
      create: data,
    });
    return { success: 'Experience added' };
  } catch (error) {
    return { error: 'Error adding Experience' };
  }
};

const updateStudentPassword = async (email, password) => {
  try {
    await prisma.students.updateMany({
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
  upsertAcademicInfo,
  createAppliedDrive,
  createBulkOffers,
  upsertExtracurricular,
  createOffer,
  updateOffer,
  upsertProject,
  upsertResumedata,
  upsertStudent,
  upsertWorkexperience,
  updateStudentPassword,
};
