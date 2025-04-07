import mongoose from 'mongoose';
import { TError, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const message = 'Validation Error';

  const error: TError = [{ path: err?.path, message: err?.message }];

  return { statusCode, message, error };
};

export default handleCastError;
