import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

// Schema
const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: ['admin', 'user'],
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Model
export const User = model<TUser>('User', userSchema);

/**
 * Patern:
 * Create Interface --> Schema --> Model --> Query
 */
