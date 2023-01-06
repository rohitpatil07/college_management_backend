import imageService from '../services/imageService.js';
import fs from 'fs';

const downloadProfileImage = async (req, res) => {
    try {
      const roll_no = String(req.params.roll_no);
      const photo = await imageService.downloadProfileImage(roll_no);
  
      let buff = Buffer.from(photo['photo'], 'base64');
      fs.writeFileSync(`${roll_no}.jpg`, buff);
      res.download(`${roll_no}.jpg`, { dotfiles: 'deny' }, function (err) {
        if (err) {
          return err;
        }
        fs.unlinkSync(`${roll_no}.jpg`);
      });
    } catch (error) {
      res.json(error);
    }
};

const uploadProfileImage = async (req, res) => {
  try {
    const roll_no = String(req.params.roll_no);
    const image = req.files.profile;
    if (image.size <= 256000) {
      const b64 = Buffer.from(image.data).toString('base64');

      const message = await imageService.uploadProfileImage(roll_no, b64);
      res.json({ message: message });
    } else {
      res.json({ message: 'Please upload file size of 256kb or less' });
    }
  } catch (error) {
    res.json(error);
  }
};

const downloadOfferLetter = async (req, res) => {
  try {
    const offer_id = String(req.params.offer_id);
    const photo = await imageService.downloadOfferLetter(offer_id);
    let buff = Buffer.from(photo['offer_letter'].slice(23,photo['offer_letter'].length), 'base64');
      fs.writeFileSync(`${offer_id}.jpg`, buff);
      res.download(`${offer_id}.jpg`, { dotfiles: 'deny' }, function (err) {
        if (err) {
          return err;
        }
        fs.unlinkSync(`${offer_id}.jpg`);
    });
  } catch (error) {
    console.log(error)
    res.json(error);
  }
};

const uploadOfferLetter = async (req, res) => {
  try {
    const offer_id = String(req.params.offer_id);
    const message = await imageService.uploadOfferLetter(offer_id, req.body.offer_letter);
    console.log(message);
  } catch (error) {
    res.json(error);
  }
};

export default { uploadProfileImage, downloadProfileImage, downloadOfferLetter, uploadOfferLetter };
