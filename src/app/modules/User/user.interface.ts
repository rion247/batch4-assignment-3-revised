/* eslint-disable no-unused-vars */
import { HydratedDocument, Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUserRole = 'admin' | 'user';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  isBlocked: boolean;
}

export interface TLogin {
  email: string;
  password: string;
}

export interface TuserInformationForJWT {
  userEmail: string;
  role: string;
}

export interface TUserModel extends Model<TUser> {
  isUserExist(email: string): Promise<HydratedDocument<TUser> | null>;
  isUserPasswordMatched(
    plainTextPassword: string,
    hashedTextPassword: string,
  ): Promise<boolean>;
}

export type TUser_role = keyof typeof USER_ROLE;
