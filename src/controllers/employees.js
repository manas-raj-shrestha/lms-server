import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as employeeService from '../services/employeeService';
import { findEmployee, employeeValidator } from '../validators/employeeValidator';
import { getEmployeeInfo } from '../middlewares/authHandler';
import { checkAdminAccess } from '../middlewares/accessHandler';

const router = Router();

/**
 * GET /api/employee
 */
router.get('/', getEmployeeInfo, (req, res, next) => {
  console.log('get employees');
  employeeService
    .getAllEmployees()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * GET /api/users/:id
 */
router.get('/:id', getEmployeeInfo, (req, res, next) => {
  console.log('get employees');
  employeeService
    .getEmployee(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * POST /api/employees
 */
router.post('/', getEmployeeInfo, checkAdminAccess(1), (req, res, next) => {
  console.log('create employees');
  employeeService
    .createEmployee(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

/**
 * PUT /api/users/:id
 */
router.put('/', employeeValidator, getEmployeeInfo, findEmployee, (req, res, next) => {
  console.log('update', req.employeeId);
  employeeService
    .updateEmployee(req.employeeId, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * DELETE /api/employee/
 */
const x = checkAdminAccess(1);
router.delete('/:id', getEmployeeInfo, x, findEmployee, (req, res, next) => {
  console.log('delete employees');
  employeeService
    .deleteEmployee(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});

export default router;
