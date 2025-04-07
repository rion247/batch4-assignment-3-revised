import express from 'express';
import { UserValidationSchemas } from './user.validation';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidationSchemas.userValidationSchemaforCreate),
  UserController.createUser,
);

router.post(
  '/login',
  validateRequest(UserValidationSchemas.userValidationSchemaforLogIn),
  UserController.logIn,
);

export const UserRoutes = router;
