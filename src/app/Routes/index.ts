import express from 'express';
// import { BlogRoutes } from '../modules/Blog/blog.routes';
import { UserRoutes } from '../modules/User/user.routes';

const router = express.Router();

const modelRoutes = [
  // {
  //   pathName: '/blogs',
  //   route: BlogRoutes,
  // },
  {
    pathName: '/auth',
    route: UserRoutes,
  },
];

modelRoutes.forEach((item) => router.use(item.pathName, item.route));

export default router;
