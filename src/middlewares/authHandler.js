import jwt from 'jsonwebtoken';
import Boom from 'boom';

export function getEmployeeInfo(req, res, next) {
  let token = req.headers['access-token'];
  let employee = jwt.decode(token, 'shhhhh');
  console.log(employee);
  if (!employee) {
    throw new Boom.unauthorized('User not valid');
  }
  req.employeeId = employee.employee.id;
  req.roleId = employee.employee.roleId;

  next();
}
