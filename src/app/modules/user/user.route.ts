import exrress from 'express';
import { userControllers } from './user.controller';
import { userValidations } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = exrress.Router(); // an object

// will call controller func
router.post(
  '/register',
  validateRequest(userValidations.createUserValidationSchema),
  userControllers.createUser,
);

export const userRoutes = router;
