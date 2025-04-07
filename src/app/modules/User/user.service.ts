import status from 'http-status';
import config from '../../config';
import { TLogin, TUser, TuserInformationForJWT } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import { jwtTokenGenerator } from './user.utils';
import { SignOptions } from 'jsonwebtoken';

const createUserInToDB = async (payload: TUser) => {
  const userData = await User.isUserExist(payload?.email);

  if (userData) {
    throw new AppError(
      status.NOT_FOUND,
      'Sorry!!! This user already exist !!!',
    );
  }

  payload.password = payload?.password || (config.default_password as string);

  const createUser = await User.create(payload);

  return {
    _id: createUser?._id,
    name: createUser?.name,
    email: createUser?.email,
  };
};

const loginInToDB = async (payload: TLogin) => {
  const userData = await User.isUserExist(payload?.email);

  if (!userData) {
    throw new AppError(status.UNAUTHORIZED, 'Invalid credentials');
  }

  const userStatus = userData?.isBlocked;

  if (userStatus) {
    throw new AppError(status.UNAUTHORIZED, 'Invalid credentials');
  }

  if (
    !(await User.isUserPasswordMatched(payload?.password, userData?.password))
  ) {
    throw new AppError(status.UNAUTHORIZED, 'Invalid credentials');
  }

  const userInformationForJWT: TuserInformationForJWT = {
    userEmail: userData?.email,
    role: userData?.role,
  };

  const accessToken = jwtTokenGenerator(
    userInformationForJWT,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as SignOptions['expiresIn'],
  );

  const refreshToken = jwtTokenGenerator(
    userInformationForJWT,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as SignOptions['expiresIn'],
  );

  return { accessToken, refreshToken };
};

export const UserService = {
  createUserInToDB,
  loginInToDB,
};
