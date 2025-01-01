import exrress from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { blogValidations } from './blog.validation';
import { blogControllers } from './blog.controller';

const router = exrress.Router(); // an object

// will call controller func
router.post(
  '/',
  validateRequest(blogValidations.createBlogValidationSchema),
  blogControllers.createBlog,
);
router.get('/:id', blogControllers.getSingleBlog);
router.get('/', blogControllers.getAllBlogs);
router.delete('/:id', blogControllers.deleteBlog);

export const blogRoutes = router;
