import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { User } from '../User/user.model';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import status from 'http-status';

const createBlogInToDB = async (decodedToken: JwtPayload, payload: TBlog) => {
  const email = decodedToken?.userEmail;

  const userData = await User.isUserExist(email);

  if (!userData) {
    throw new AppError(status.NOT_FOUND, 'Sorry!!! This user is not found !!!');
  }

  payload.author = userData?._id;

  const createBlog = await Blog.create(payload);

  const populatedBlog = await createBlog.populate('author');

  return {
    _id: populatedBlog?._id,
    title: populatedBlog?.title,
    content: populatedBlog?.content,
    author: populatedBlog?.author,
  };
};

export const BlogService = {
  createBlogInToDB,
};
