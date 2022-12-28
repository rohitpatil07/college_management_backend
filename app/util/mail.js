import nodemailer from 'nodemailer';
import config from '../config/index.js';

const sendEmail = async (students, message, subject) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.EMAIL,
      pass: config.EMAIL_PASSWORD,
    },
  });

  const mailoptions = {
    from: config.EMAIL,
    to: students,
    subject: subject,
    text: message,
  };

  try {
    transporter.sendMail(mailoptions);
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
