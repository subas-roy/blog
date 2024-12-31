// Handles application Request and Response
import { NextFunction, Request, Response } from 'express';
import { userServices } from './user.service';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body; // data from client

    // will call service func to send this data
    const result = await userServices.createUserIntoDB(user);

    // send response
    const statusCode = 201;
    res.status(statusCode).json({
      success: true,
      message: 'User registered successfully!',
      statusCode,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userControllers = {
  createUser,
};
