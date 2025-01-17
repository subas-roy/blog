import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const sanitizedUser = {
    ...user,
    role: 'user', // Always enforce 'user' role
  };
  const result = await User.create(sanitizedUser); // create user into DB

  return result;
};

const blockUserIntoDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  );
  return result;
};

export const userServices = {
  createUserIntoDB,
  blockUserIntoDB,
};
