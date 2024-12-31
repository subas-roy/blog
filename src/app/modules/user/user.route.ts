import exrress from 'express';
import { userControllers } from './user.controller';

const router = exrress.Router(); // an object

// will call controller func
router.post('/register', userControllers.createUser);

export const userRoutes = router;
