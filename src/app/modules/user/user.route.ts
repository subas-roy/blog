import exrress from 'express';
import { userControllers } from './user.controller';

const router = exrress.Router();

// will call controller func
router.post('/create-user', userControllers.createUser);
