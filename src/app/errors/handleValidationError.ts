import mongoose from 'mongoose';
import { TError, TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const message = 'Validation Error';

  const error: TError = Object.values(err?.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    },
  );

  return { statusCode, message, error };
};

export default handleValidationError;
