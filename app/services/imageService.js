import prisma from '../config/prisma.js';

const downloadProfileImage = async (roll_no) => {
  try {
    const photo = await prisma.students.findUnique({
      select: {
        photo: true,
      },
      where: {
        roll_no: roll_no,
      },
    });

    return photo;
  } catch (error) {
    return error;
  }
};

const uploadProfileImage = async (roll_no, b64) => {
  try {
    await prisma.students.update({
      where: { roll_no: roll_no },
      data: {
        photo: b64,
      },
    });
    return 'Photo Uploaded Sucessfully';
  } catch (error) {
    return error;
  }
};

const downloadOfferLetter = async (offer_id) => {
  try {
    const photo = await prisma.offers.findUnique({
      select: {
        offer_letter: true,
      },
      where: {
        offer_id: offer_id,
      },
    });
    console.log(offer_id)
    return photo;
  } catch (error) {
    return error;
  }
};

const uploadOfferLetter = async (offer_id, b64) => {
  try {
    await prisma.offers.update({
      where: { offer_id: offer_id },
      data: {
        offer_letter: b64,
      },
    });
    return 'Photo Uploaded Sucessfully';
  } catch (error) {
    return error;
  }
};

export default { downloadProfileImage, uploadProfileImage, downloadOfferLetter, uploadOfferLetter };
