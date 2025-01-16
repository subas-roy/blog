import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

// Schema
const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Helper function (Instance Method) - Check if user exists by ID
export const isUserExistsById = async (id: string) => {
  return await User.findById(id);
};

// Model creation
export const User = model<TUser>('User', userSchema);

/**
 * Patern:
 * Create Interface --> Schema --> Model --> Query
 */
