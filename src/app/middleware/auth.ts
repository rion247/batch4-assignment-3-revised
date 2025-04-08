import status from 'http-status';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/User/user.model';
import catchAsync from '../utils/catchAsync';
import { TUser_role } from '../modules/User/user.interface';
import { NextFunction, Request, Response } from 'express';

const auth = (...requiredRoles: TUser_role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req?.headers?.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(
        status.UNAUTHORIZED,
        'Sorry!!! You are not authorized!!!',
      );
    }

    const token = authHeader?.split(' ')[1];

    if (!token) {
      throw new AppError(
        status.UNAUTHORIZED,
        'Sorry!!! You are not authorized!!!',
      );
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { userEmail, role } = decoded;

    const userData = await User.isUserExist(userEmail);

    if (!userData) {
      throw new AppError(
        status.NOT_FOUND,
        'Sorry!!! This user is not found !!!',
      );
    }

    const userStatus = userData?.isBlocked;

    if (userStatus) {
      throw new AppError(
        status.BAD_REQUEST,
        'Sorry!!! This user is already blocked !!!',
      );
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        status.UNAUTHORIZED,
        'Sorry!!! You are not authorized!!!',
      );
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
