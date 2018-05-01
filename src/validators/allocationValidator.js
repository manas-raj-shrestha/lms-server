import Joi from 'joi';
import validate from '../utils/validate';
import * as employeeService from '../services/employeeService';
import * as projectService from '../services/projectService';

const SCHEMA = {
  employee_id: Joi.number()
    .label('Employee Id')
    .required(),
  project_id: Joi.number()
    .label('Project id')
    .required(),
  start_date: Joi.string().required(),
  end_date: Joi.string()
};

/**
 * Validate create/update user request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
async function allocationValidator(req, res, next) {
  try {
    await validate(req.body, SCHEMA);
    await employeeService.getEmployee(req.body.employee_id);
  } catch (validationError) {
    next(validationError);
  }

  return projectService
    .getProject(req.body.project_id)
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

export { findEmployee, allocationValidator };
