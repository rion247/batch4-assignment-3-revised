import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const token = req.user;
  const result = await BlogService.createBlogInToDB(token, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const token = req.user;
  const result = await BlogService.updateBlogInToDB(id, token, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const token = req.user;

  await BlogService.deleteBlogInToDB(id, token);

  res.status(status.OK).json({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: status.OK,
  });
});

const getBlog = catchAsync(async (req, res) => {
  const query = req?.query;

  const result = await BlogService.getBlogFromDB(query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BlogService.getSingleBlogFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Blog fetched successfully',
    data: result,
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  getSingleBlog,
};
