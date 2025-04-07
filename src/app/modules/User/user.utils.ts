import { TuserInformationForJWT } from './user.interface';
import jwt, { SignOptions } from 'jsonwebtoken';

export const jwtTokenGenerator = (
  user: TuserInformationForJWT,
  secret: string,
  expiresIn: SignOptions['expiresIn'],
) => {
  return jwt.sign(user, secret, { expiresIn });
};
