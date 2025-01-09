import exrress from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { blogControllers } from './blog.controller';
import { blogValidations } from './blog.validation';

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
router.get('/', blogControllers.getAllBlogs);
router.delete('/:id', blogControllers.deleteBlog);

export const blogRoutes = router;
