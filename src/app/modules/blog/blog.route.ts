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
  validateRequest(blogValidations.createBlogValidationSchema),
  blogControllers.createBlog,
);
router.get('/:id', blogControllers.getSingleBlog);
router.patch(
  '/:id',
  validateRequest(blogValidations.updateBlogValidationSchema),
  blogControllers.updateBlog,
);
router.get('/', auth(), blogControllers.getAllBlogs);
router.delete('/:id', auth(USER_ROLE.admin), blogControllers.deleteBlog);

export const blogRoutes = router;
