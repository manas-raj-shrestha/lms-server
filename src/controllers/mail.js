import { Router } from 'express';
import nodemailer from 'nodemailer';
import { email, password } from '../creds';

const router = Router();

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: email, // generated ethereal user
    pass: password // generated ethereal password
  }
});

let mailOptions = {
  from: '"Fred Foo 👻" <foo@example.com>', // sender address
  to: 'manasshrestha@lftechnology.com', // list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Hello world?', // plain text body
  html: '<b>Hello world?</b>' // html body
};

router.post('/', (req, res, next) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
});

export default router;
