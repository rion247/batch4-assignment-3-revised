import { User } from '../User/user.model';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { Blog } from '../Blog/blog.model';

const blockUserInToDB = async (id: string, decodedToken: JwtPayload) => {
  const email = decodedToken?.userEmail;

  const adminData = await User.isUserExist(email);
  const userData = await User.findById(id);

  if (!adminData) {
    throw new AppError(
      status.NOT_FOUND,
      'Sorry!!! This admin is not found !!!',
    );
  }

  if (!userData) {
    throw new AppError(status.NOT_FOUND, 'Sorry!!! This user is not found !!!');
  }

  const adminRole = adminData?.role;
  const userRole = userData?.role;

  if (adminRole !== 'admin') {
    throw new AppError(
      status.UNAUTHORIZED,
      'Sorry!!! You are not authorized!!!',
    );
  }

  if (userRole !== 'user') {
    throw new AppError(
      status.UNAUTHORIZED,
      'Sorry!!! You are not authorized!!!',
    );
  }

  const adminStatus = adminData?.isBlocked;
  const userStatus = userData?.isBlocked;

  if (adminStatus) {
    throw new AppError(
      status.BAD_REQUEST,
      'Sorry!!! This admin is already blocked !!!',
    );
  }

  if (userStatus) {
    throw new AppError(
      status.BAD_REQUEST,
      'Sorry!!! This user is already blocked !!!',
    );
  }

  const blockUser = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  );

  if (!blockUser) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Sorry!!! Block user request failed!!!',
    );
  }

  return null;
};

const deleteBlogFromDB = async (id: string, decodedToken: JwtPayload) => {
  const email = decodedToken?.userEmail;

  const adminData = await User.isUserExist(email);

  if (!adminData) {
    throw new AppError(
      status.NOT_FOUND,
      'Sorry!!! This admin is not found !!!',
    );
  }

  const adminRole = adminData?.role;

  if (adminRole !== 'admin') {
    throw new AppError(
      status.UNAUTHORIZED,
      'Sorry!!! You are not authorized!!!',
    );
  }

  const adminStatus = adminData?.isBlocked;

  if (adminStatus) {
    throw new AppError(
      status.BAD_REQUEST,
      'Sorry!!! This admin is already blocked !!!',
    );
  }

  const deleteBlog = await Blog.findByIdAndDelete(id, { new: true });

  if (!deleteBlog) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Sorry!!! Delete blog request failed!!!',
    );
  }

  return null;
};

export const AdminActionService = {
  blockUserInToDB,
  deleteBlogFromDB,
};
