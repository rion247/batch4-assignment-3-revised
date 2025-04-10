import express from 'express';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middleware/auth';
import { AdminActionController } from './adminActions.controller';

const router = express.Router();

router.delete(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  AdminActionController.blockUser,
);

export const AdminActionRoutes = router;
