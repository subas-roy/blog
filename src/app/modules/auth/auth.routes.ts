import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidations } from './auth.validation';
import { authControllers } from './auth.controller';
import { blogControllers } from '../blog/blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidations.loginValidationSchema),
  authControllers.loginUser,
);

router.delete('/:id', auth(USER_ROLE.admin), blogControllers.deleteBlog);

export const authRoutes = router;
