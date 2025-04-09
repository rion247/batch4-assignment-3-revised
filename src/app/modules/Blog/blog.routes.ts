import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import { BlogController } from './blog.controller';
import { BlogValidationSchemas } from './blog.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(BlogValidationSchemas.blogValidationSchemaforUpdate),
  BlogController.updateBlog,
);

router.delete('/:id', auth(USER_ROLE.user), BlogController.deleteBlog);

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BlogValidationSchemas.blogValidationSchemaforCreate),
  BlogController.createBlog,
);

router.get('/', BlogController.getBlog);

export const BlogRoutes = router;
