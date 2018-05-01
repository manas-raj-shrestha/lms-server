import Boom from 'boom';
import project from '../models/project';
import Project from '../models/project';
import ProjectAllocation from '../models/projectallocation';

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllProjects() {
  return Project.fetchAll({ withRelated: ['employees'] });
}

/**
 * Get a employee.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getProject(id) {
  return new Project({ id }).fetch({ withRelated: ['employees'] }).then(project => {
    if (!project) {
      throw new Boom.notFound('Project not found');
    }

    return project;
  });
}

/**
 * Create new employee.
 *
 * @param  {Object}  project
 * @return {Promise}
 */
export function createProject(project) {
  return new Project(project).save().then(p => {
    return getProject(p.id);
  });
}

export function createProjectAllocations(requestBody) {
  return new ProjectAllocation(requestBody).save().then(projectAllocation => {
    return projectAllocation;
  });
}
// /**
//  * Update a user.
//  *
//  * @param  {Number|String}  id
//  * @param  {Object}         user
//  * @return {Promise}
//  */
// export function updateEmployee(id, employee) {
//   return new Employee({ id }).save(employee).then(employee => employee.refresh());
// }

// /**
//  * Delete a user.
//  *
//  * @param  {Number|String}  id
//  * @return {Promise}
//  */
// export function deleteEmployee(id) {
//   return new Employee({ id }).fetch().then(employee => employee.destroy());
// }
