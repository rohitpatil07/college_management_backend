import prisma from '../config/prisma.js';

const removeStuPic = async (roll_no) => {
    console.log(roll_no)
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
      console.log(error);
      return { error: 'Error deleting Photo' };
    }
};

const removeDrive = async (drive_id) => {
  console.log(drive_id)
  try {
    const data = await prisma.drives.delete({
      where:{
        drive_id : drive_id
      }
    });
    console.log(data)
    return { success: 'drive deleted.' };
  } catch (error) {
    console.log(error);
    return { error: 'Error deleting drive' };
  }
};

const removeApplied = async (drive_id,roll_no) => {
  console.log(drive_id)
  console.log(roll_no)
  try {
    const data = await prisma.applied_to_drives.deleteMany({
      where:{
        drive_id : drive_id,
        roll_no : roll_no
      }
    });
    console.log(data)
    return { success: 'application removed' };
  } catch (error) {
    console.log(error);
    return { error: 'Error deleting drive' };
  }
};

const removeOffer = async (offer_id,roll_no) => {
  console.log("offer",offer_id)
  try {
    const data = await prisma.offers.delete({
      where:{
        offer_id : offer_id
      }
    });
    console.log(data)
    let deleting = parseInt(offer_id.slice(8));
    let roll_no = offer_id.slice(0,8)
    console.log(roll_no)
    if(deleting==1){
      const update = await prisma.offers.updateMany({
          where:{
            roll_no : roll_no,
          },
          data:{
            offer_id : offer_id,
          }
        });
      console.log(update) 
    }
    return { success: 'offer deleted.' };
  } catch (error) {
    console.log(error);
    return { error: 'Error deleting offer' };
  }
};


export default {
    removeStuPic,
    removeDrive,
    removeApplied,
    removeOffer,
}