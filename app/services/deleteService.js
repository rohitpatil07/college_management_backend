import prisma from '../config/prisma.js';

const removeStuPic = async (roll_no) => {
    try {
      await prisma.students.update({
        where:{
            roll_no : roll_no
        },
        data: {
            photo: null
        }
      });
      return { success: 'Photo deleted.' };
    } catch (error) {
      return { error: 'Error deleting Photo' };
    }
};

const removeDrive = async (drive_id) => {
  try {
    const data = await prisma.drives.delete({
      where:{
        drive_id : drive_id
      }
    });
    return { success: 'drive deleted.' };
  } catch (error) {
    return { error: 'Error deleting drive' };
  }
};

const removeApplied = async (drive_id,roll_no) => {
  try {
    const data = await prisma.applied_to_drives.deleteMany({
      where:{
        drive_id : drive_id,
        roll_no : roll_no
      }
    });
    return { success: 'application removed' };
  } catch (error) {
    return { error: 'Error deleting drive' };
  }
};

const removeOffer = async (offer_id,roll_no) => {
  try {
    const data = await prisma.offers.delete({
      where:{
        offer_id : offer_id
      }
    });
    let deleting = parseInt(offer_id.slice(8));
    let roll_no = offer_id.slice(0,8)
    if(deleting==1){
      const update = await prisma.offers.updateMany({
          where:{
            roll_no : roll_no,
          },
          data:{
            offer_id : offer_id,
          }
        });
    }
    return { success: 'offer deleted.' };
  } catch (error) {
    return { error: 'Error deleting offer' };
  }
};

const removeProject = async (proj_id) => {
  try {
    const data = await prisma.projects.delete({
      where:{
        proj_id : proj_id
      }
    });
    return { success: 'proj deleted.' };
  } catch (error) {
    return { error: 'Error deleting proj' };
  }
};

const removeExtracurricular = async (extra_id) => {
  try {
    const data = await prisma.extra_curricular.delete({
      where:{
        extra_id : extra_id
      }
    });
    return { success: 'extra deleted.' };
  } catch (error) {
    return { error: 'Error deleting extra' };
  }
};

const removeWorkexperience = async (work_id) => {
  try {
    const data = await prisma.work_experience.delete({
      where:{
        work_id : work_id
      }
    });
    return { success: 'work deleted.' };
  } catch (error) {
    return { error: 'Error deleting work' };
  }
};

export default {
    removeApplied,    
    removeDrive,
    removeExtracurricular,
    removeOffer,
    removeProject,
    removeStuPic,
    removeWorkexperience,
}