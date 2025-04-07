import { TUserRole } from './user.interface';

export const userRole: TUserRole[] = ['admin', 'user'];

export const USER_ROLE = {
  admin: 'admin',
  user: 'user',
} as const;
