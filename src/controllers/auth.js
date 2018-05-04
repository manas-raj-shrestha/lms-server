import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as authService from '../services/authService';
import * as mailService from '../services/mailService';
import { defaultThrottleConfig } from 'rxjs/operator/throttle';

const router = Router();

router.post('/login', (req, res, next) => {
  console.log('login');
  authService
    .login(req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

router.post('/token', (req, res, next) => {
  authService
    .refreshToken(req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

router.post('/forgotpassword', (req, res, next) => {
  mailService
    .sendResetToken(req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

router.post('/resetpassword', (req, res, next) => {
  authService
    .resetPassword(req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

export default router;
