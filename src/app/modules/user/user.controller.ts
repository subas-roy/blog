// Handles application Request and Response
import { Request, Response } from 'express';
import { userServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body; // data from client

    // will call service func to send this data
    const result = await userServices.createUserIntoDB(userData);

    // send response
    res.status(201).json({
      success: true,
      message: 'User is create ssuccessfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const userControllers = {
  createUser,
};
