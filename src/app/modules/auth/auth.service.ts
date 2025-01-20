import config from '../../config';
import AppError from '../../errors/AppError';
import { isUserExistsById, User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { createToken } from './auth.utils';
import { Blog } from '../blog/blog.model';

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
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  // Access granted: send access token & refreshtoken
  // create token and send to the client
  const jwtPayload = {
    userId: isUserExists?.id,
    role: isUserExists?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    token: accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // check if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { userId } = decoded;

  // checking if the user is exists
  const user = await isUserExistsById(userId);

  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'User not found!');
  }

  // checking if the user is blocked
  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndUpdate(
    id,
    { isPublished: false },
    { new: true },
  );
  return result;
};

export const authServices = {
  loginUser,
  refreshToken,
  deleteBlogFromDB,
};
