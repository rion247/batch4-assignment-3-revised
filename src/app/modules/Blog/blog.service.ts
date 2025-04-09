import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { User } from '../User/user.model';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import status from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { searchAbleField } from './blog.constant';

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

const updateBlogInToDB = async (
  id: string,
  decodedToken: JwtPayload,
  payload: Partial<TBlog>,
) => {
  const blogData = await Blog.isBlogExist(id);

  if (!blogData) {
    throw new AppError(
      status.NOT_FOUND,
      'Sorry!!! This blog does not exist into database !!!',
    );
  }

  const email = decodedToken?.userEmail;

  const userData = await User.isUserExist(email);

  if (!userData) {
    throw new AppError(status.NOT_FOUND, 'Sorry!!! This user is not found !!!');
  }

  const userStatus = userData?.isBlocked;

  if (userStatus) {
    throw new AppError(
      status.BAD_REQUEST,
      'Sorry!!! This user is already blocked !!!',
    );
  }

  if (!userData._id.equals(blogData.author)) {
    throw new AppError(
      status.UNAUTHORIZED,
      'Sorry!!! You are not authorized to update this blog!',
    );
  }

  const updateBlog = await Blog.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true, runValidators: true },
  );

  if (!updateBlog) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Sorry!!! Update blog request failed!!!',
    );
  }

  const populatedBlog = await updateBlog.populate('author');

  return {
    _id: populatedBlog._id,
    title: populatedBlog.title,
    content: populatedBlog.content,
    author: populatedBlog.author,
  };
};

const deleteBlogInToDB = async (id: string, decodedToken: JwtPayload) => {
  const blogData = await Blog.isBlogExist(id);

  if (!blogData) {
    throw new AppError(
      status.NOT_FOUND,
      'Sorry!!! This blog does not exist into database !!!',
    );
  }

  const email = decodedToken?.userEmail;

  const userData = await User.isUserExist(email);

  if (!userData) {
    throw new AppError(status.NOT_FOUND, 'Sorry!!! This user is not found !!!');
  }

  const userStatus = userData?.isBlocked;

  if (userStatus) {
    throw new AppError(
      status.BAD_REQUEST,
      'Sorry!!! This user is already blocked !!!',
    );
  }

  if (!userData._id.equals(blogData.author)) {
    throw new AppError(
      status.UNAUTHORIZED,
      'Sorry!!! You are not authorized to update this blog!',
    );
  }

  const deleteBlog = await Blog.findByIdAndDelete(id, {
    new: true,
  });

  if (!deleteBlog) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Sorry!!! Delete blog request failed!!!',
    );
  }

  return null;
};

const getBlogFromDB = async (query: Record<string, unknown>) => {
  const getBlogQuery = new QueryBuilder(Blog.find().populate('author'), query)
    .search(searchAbleField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const blogs = await getBlogQuery.modelQuery;

  const getBlogs = blogs.map((blog) => ({
    _id: blog?._id,
    title: blog?.title,
    content: blog?.content,
    author: blog?.author,
  }));

  return getBlogs;
};

export const BlogService = {
  createBlogInToDB,
  updateBlogInToDB,
  deleteBlogInToDB,
  getBlogFromDB,
};

// {
//   "success": true,
//   "message": "Blogs fetched successfully",
//   "statusCode": 200,
//   "data": [
//     {
//       "_id": "string",
//       "title": "string",
//       "content": "string",
//       "author": { "details" }
//     }
//   ]
// }
