import { ZodError, ZodIssue } from 'zod';
import { TError, TGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const statusCode = 400;
  const message = 'Validation Error';

  const error: TError = err?.issues?.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path?.length - 1],
      message: issue?.message,
    };
  });

  return { statusCode, message, error };
};

export default handleZodError;
