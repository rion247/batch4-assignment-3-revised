/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TUser, TUserModel } from './user.interface';
import { userRole } from './user.constant';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: [true, 'Name is required!!!'] },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required!!!'],
    },
    password: {
      type: String,
      required: [true, 'Password is required!!!'],
      select: 0,
    },
    role: {
      type: String,
      enum: {
        values: userRole,
        message: '{VALUE} is not supported',
      },
      default: 'user',
    },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExist = async function (email: string) {
  const userAlreadyExist = await User.findOne({ email }).select('+password');

  return userAlreadyExist;
};

userSchema.statics.isUserPasswordMatched = async function (
  plainTextPassword: string,
  hashedTextPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedTextPassword);
};

export const User = model<TUser, TUserModel>('User', userSchema);
