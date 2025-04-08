import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import { BlogController } from './blog.controller';
import { BlogValidationSchemas } from './blog.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BlogValidationSchemas.blogValidationSchemaforCreate),
  BlogController.createBlog,
);

export const BlogRoutes = router;
