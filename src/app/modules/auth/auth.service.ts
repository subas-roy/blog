import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const isUserExists = await User.findOne({ email: payload.email });
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  // checking if the user is already blocked
  const isUserBlocked = isUserExists.isBlocked;
  if (isUserBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is alredy blocked');
  }

  // checking if the password is correct
  const isPasswordMatched = isUserExists.password === payload.password;
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not matched');
  }

  // Access granted: send access token & refreshtoken
  // create token and send to the client
  const jwtPayload = {
    userId: isUserExists?.id,
    role: isUserExists?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
  };
};

export const authServices = {
  loginUser,
};
