// Handles application Request and Response
import { NextFunction, Request, Response } from 'express';
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body; // data from client

    // will call service func to send this data
    const result = await userServices.createUserIntoDB(user);

    // send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userControllers = {
  createUser,
};
