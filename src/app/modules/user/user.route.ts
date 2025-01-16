import exrress from 'express';
import { userControllers } from './user.controller';
import { userValidations } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = exrress.Router(); // an object

// will call controller func
router.post(
  '/register',
  validateRequest(userValidations.createUserValidationSchema),
  userControllers.createUser,
);

router.patch(
  '/:userId/block',
  auth(USER_ROLE.admin),
  userControllers.blockUser,
);

export const userRoutes = router;
