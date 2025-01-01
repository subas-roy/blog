// Handles application Request and Response
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createUser = catchAsync(async (req, res) => {
  const user = req.body; // data from client

  // will call service func to send this data
  const result = await userServices.createUserIntoDB(user);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User is created successfully!',
    data: result,
  });
});

export const userControllers = {
  createUser,
};
