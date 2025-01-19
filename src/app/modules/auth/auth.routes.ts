import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidations } from './auth.validation';
import { authControllers } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidations.loginValidationSchema),
  authControllers.loginUser,
);

router.delete('/:id', auth(USER_ROLE.admin), authControllers.deleteBlog);

router.post(
  '/refresh-token',
  validateRequest(authValidations.refreshTokenValidatioinSchema),
  authControllers.refreshToken,
);

export const authRoutes = router;
