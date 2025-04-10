import express from 'express';
import { BlogRoutes } from '../modules/Blog/blog.routes';
import { UserRoutes } from '../modules/User/user.routes';
import { AdminActionRoutes } from '../modules/Admin Actions/adminActions.routes';

const router = express.Router();

const modelRoutes = [
  {
    pathName: '/blogs',
    route: BlogRoutes,
  },
  {
    pathName: '/auth',
    route: UserRoutes,
  },
  {
    pathName: '/admin',
    route: AdminActionRoutes,
  },
];

modelRoutes.forEach((item) => router.use(item.pathName, item.route));

export default router;
