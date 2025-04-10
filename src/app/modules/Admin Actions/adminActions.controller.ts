import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AdminActionService } from './adminActions.service';

const blockUser = catchAsync(async (req, res) => {
  const token = req.user;
  const { userId } = req.params;
  await AdminActionService.blockUserInToDB(userId, token);

  res.status(status.OK).json({
    success: true,
    message: 'User blocked successfully',
    statusCode: status.OK,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const token = req.user;
  const { id } = req.params;
  await AdminActionService.deleteBlogFromDB(id, token);

  res.status(status.OK).json({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: status.OK,
  });
});

export const AdminActionController = {
  blockUser,
  deleteBlog,
};
