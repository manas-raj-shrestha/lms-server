import Boom from 'boom';
import Employee from '../models/employee';
import Designation from '../models/designation';
import bcrypt from 'bcrypt';
import ProjectAllocation from '../models/projectallocation';
import Project from '../models/project';

/**
 * Get all employees.
 *
 * @return {Promise}
 */
export function getAllEmployees() {
  return Employee.fetchAll({
    withRelated: ['designation', 'projects', 'roles']
  });
}

/**
 * Get a employee.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getEmployee(id) {
  return new Employee({ id }).fetch({ withRelated: ['roles', 'designation', 'projects'] }).then(employee => {
    if (!employee) {
      throw new Boom.notFound('employee not found');
    }

    return employee;
  });
}

/**
 * Create new employee.
 *
 * @param  {Object}  employee
 * @return {JSON}
 */
export async function createEmployee(requestBody) {
  try {
    let hash = await bcrypt.hash(requestBody.password, 10);
    console.log(hash);
    let employee = await new Employee({ email: requestBody.email, password: hash }).save();
    console.log(requestBody.password, employee);
    employee.refresh();
    let employeeJson = employee.toJSON();
    delete employeeJson.password;

    return employeeJson;
  } catch (err) {
    console.log(err);
    throw new Boom.badRequest('Email is already in use');
  }
}

/**
 * Update a user.
 *
 * @param  {Number|String}  id
 * @param  {Object}         employee
 * @return {Promise}
 */
export function updateEmployee(id, employee) {
  console.log('id', id);

  return new Employee({ id }).save(employee).then(employee => employee.refresh());
}

/**
 * Delete a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export async function deleteEmployee(id) {
  await Employee.query(function(qb) {
    console.log('run query', id);
    qb.where('leave_issuer_id', id);
    qb.update('leave_issuer_id', 1);
  }).fetch();

  await ProjectAllocation.query(function(qb) {
    qb.delete('employee_id', id);
  }).fetch();

  await Project.query(function(qb) {
    qb.where('account_manager_id', id);
    qb.update({ account_manager_id: 1 });
  }).fetch();

  return new Employee({ id }).fetch().then(employee => employee.destroy());
}
