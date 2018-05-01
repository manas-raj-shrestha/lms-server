import Joi from 'joi';
import validate from '../utils/validate';
import * as projectService from '../services/projectService';

const SCHEMA = {
  name: Joi.string()
    .label('Project Name')
    .required(),
  status: Joi.string()
    .label('Project Status')
    .required(),
  start_date: Joi.string().required(),
  account_manager_id: Joi.number().required(),
  end_date: Joi.string().required()
};

/**
 * Validate create/update project request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function projectValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate project existence.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function findProject(req, res, next) {
  return projectService
    .getProject(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export { findProject, projectValidator };
