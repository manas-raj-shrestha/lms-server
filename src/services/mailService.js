import Boom from 'boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uuidv4 from 'uuid/v4';
import Employee from '../models/employee';
import * as employeeService from '../services/employeeService';
import nodemailer from 'nodemailer';

import { email, password } from '../creds';

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
  from: '"LMS"', // sender address
  to: 'manasshrestha@lftechnology.com', // list of receivers
  subject: 'Password reset code', // Subject line
  text: 'Hello world?' // plain text body
};

export async function sendResetToken(reqBody) {
  let employee = await employeeService.getEmployeeByEmail(reqBody.email);
  let resetCode = employee.id + '' + getRandomIntInclusive(1000, 9999);

  mailOptions.to = reqBody.email;
  mailOptions.text = `Your reset code is ${resetCode}`;

  try {
    await new Employee({ id: employee.id }).save({ resetCode });
  } catch (dbErr) {
    throw new Boom.notFound('Something went wrong');
  }

  return new Promise(function(fulfill, reject) {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new Boom.serverUnavailable('Something went wrong');
        reject(error);
      }

      fulfill({ success: true });
    });
  });

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
  }
}
