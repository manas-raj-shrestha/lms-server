import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as projectService from '../services/projectService';
import { findProject, projectValidator } from '../validators/projectValidator';
import { getEmployeeInfo } from '../middlewares/authHandler';
import { checkAdminAccess } from '../middlewares/accessHandler';
import { findEmployee } from '../validators/employeeValidator';
import { allocationValidator } from '../validators/allocationValidator';

const router = Router();

/**
 * GET /api/project
 */
router.get('/', getEmployeeInfo, (req, res, next) => {
  projectService
    .getAllProjects()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * GET /api/project/:id
 */
router.get('/:id', getEmployeeInfo, (req, res, next) => {
  projectService
    .getProject(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * POST /api/project
 */
router.post('/', getEmployeeInfo, checkAdminAccess(1), projectValidator, (req, res, next) => {
  projectService
    .createProject(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

router.post('/allocation', getEmployeeInfo, checkAdminAccess(1), allocationValidator, (req, res, next) => {
  projectService
    .createProjectAllocations(req.body)
    .then(data => {
      console.log('data', data);
      res.status(HttpStatus.CREATED).json({ data });
    })
    .catch(err => next(err));
});

// /**
//  * PUT /api/users/:id
//  */
// router.put('/:id', findEmployee, (req, res, next) => {
//   employeeService
//     .updateEmployee(req.params.id, req.body)
//     .then(data => res.json({ data }))
//     .catch(err => next(err));
// });

// /**
//  * DELETE /api/users/:id
//  */
// router.delete('/:id', findEmployee, (req, res, next) => {
//   employeeService
//     .deleteEmployee(req.params.id)
//     .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
//     .catch(err => next(err));
// });

export default router;
