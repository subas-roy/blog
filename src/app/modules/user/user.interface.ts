import { USER_ROLE } from './user.constant';

// 1. Create an interface representing a document in MongoDB.
export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
};

export type TUserRole = keyof typeof USER_ROLE;
