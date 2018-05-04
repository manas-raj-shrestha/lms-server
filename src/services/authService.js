import Boom from 'boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uuidv4 from 'uuid/v4';
import Employee from '../models/employee';
import { retrieveSourceMap } from 'source-map-support';
import fcm from '../services/fcmService';

let message = {
  // this may vary according to the message type (single recipient, multicast, topic, et cetera)
  to:
    'fyWNL18XETk:APA91bESKIvWG21e0ki3pl7IIi6orcJ0NVGaghwSMV3I6xVczUsPWXfbcUQuK0H_1U2xJ-q9J8mQaORR0RstSe3f4wAlLbiGd0Yk2e288qKy_s5l9rhonEbIsc99Lf2eGPM2W8SlERMj',

  notification: {
    title: 'Title of your push notification',
    body: 'Body of your push notification'
  },

  data: {
    // you can send only notification or only data(or include both)
    my_key: 'my value',
    my_another_key: 'my another value'
  }
};

export async function login(requestBody) {
  fcm.send(message, function(err, response) {
    if (err) {
      console.log('Something has gone wrong! ', err);
    } else {
      console.log('Successfully sent with response: ', response);
    }
  });

  let employee = await new Employee({ email: requestBody.email }).fetch();
  console.log(requestBody.email, requestBody.password);
  try {
    if (!employee || !bcrypt.compareSync(requestBody.password, employee.toJSON().password)) {
      throw '';
    }
  } catch (err) {
    console.log(err);
    throw new Boom.badRequest('Incorrect username or password');
  }

  let employeeJson = employee.toJSON();
  delete employeeJson.password;
  let token = jwt.sign({ employee: employeeJson }, 'shhhhh');

  let response = {
    accessToken: token,
    refreshToken: uuidv4()
  };

  await new Employee({ id: employee.get('id') }).save({ refresh_token: response.refreshToken }).then(employee => {
    employee.refresh();
  });

  return response;
}

export async function refreshToken(requestBody) {
  let employee = await Employee.where('refresh_token', requestBody.refreshToken).fetch();
  console.log('token1', employee);
  if (!employee) {
    throw new Boom.badRequest('Invalid token');
  }

  let employeeJson = employee.toJSON();
  delete employeeJson.password;
  let token = jwt.sign({ employee: employeeJson }, 'shhhhh');

  let response = {
    accessToken: token,
    refreshToken: requestBody.refreshToken
  };

  return response;
}

export async function resetPassword(requestBody) {
  let employee = await new Employee({ reset_code: requestBody.reset_code }).fetch();
  console.log(requestBody.password);
  let hash = await bcrypt.hash(requestBody.password, 10);

  if (!employee) {
    throw new Boom.badRequest('Invalid token');
  }

  return new Employee({ id: employee.id }).save({ password: hash, resetCode: null }).then(emp => emp.refresh());
}
