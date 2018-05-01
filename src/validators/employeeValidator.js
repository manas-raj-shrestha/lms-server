import Joi from 'joi';
import validate from '../utils/validate';
import * as employeeService from '../services/employeeService';

const SCHEMA = {
  first_name: Joi.string()
    .label('First name')
    .required(),
  last_name: Joi.string()
    .label('Last name')
    .required(),
  joined_date: Joi.string().required(),
  designation_id: Joi.number(),
  date_of_birth: Joi.string().required(),
  department: Joi.string().required(),
  leave_issuer_id: Joi.number(),
  github: Joi.string(),
  skype: Joi.string(),
  phone: Joi.string().required(),
  gender: Joi.string().required(),
  address: Joi.string().required()
};

/**
 * Validate create/update user request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function employeeValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate users existence.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function findEmployee(req, res, next) {
  return employeeService
    .getEmployee(req.employeeId)
    .then(() => next())
    .catch(err => next(err));
}

function findEmployeeById(emloyeeId) {
  return employeeService
    .getEmployee(employeeId)
    .then(() => next())
    .catch(err => next(err));
}

export { findEmployee, findEmployeeById, employeeValidator };
