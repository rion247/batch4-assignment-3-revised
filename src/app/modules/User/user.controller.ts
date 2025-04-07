import status from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';
import catchAsync from '../../utils/catchAsync';
import config from '../../config';

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUserInToDB(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const logIn = catchAsync(async (req, res) => {
  const result = await UserService.loginInToDB(req.body);

  const { accessToken: token, refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Login successful',
    data: { token },
  });
});

export const UserController = {
  createUser,
  logIn,
};
