import exrress from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { blogControllers } from './blog.controller';
import { blogValidations } from './blog.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = exrress.Router(); // an object

// will call controller func
router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(blogValidations.createBlogValidationSchema),
  blogControllers.createBlog,
);
router.get(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  blogControllers.getSingleBlog,
);
router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(blogValidations.updateBlogValidationSchema),
  blogControllers.updateBlog,
);
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  blogControllers.getAllBlogs,
);
router.delete('/:id', auth(USER_ROLE.user), blogControllers.deleteBlog);

export const blogRoutes = router;
