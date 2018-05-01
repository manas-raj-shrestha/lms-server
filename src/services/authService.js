import Boom from 'boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uuidv4 from 'uuid/v4';
import Employee from '../models/employee';

export async function login(requestBody) {
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
