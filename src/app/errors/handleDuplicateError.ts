/* eslint-disable @typescript-eslint/no-explicit-any */
import { TError, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const statusCode = 400;
  const message = 'Duplicate Error';

  const match = err?.errorResponse?.errmsg?.match(/"([^"]+)"/);

  const errorMsg = match ? match[1] : null;

  const error: TError = [
    { path: '', message: `Sorry!!! ${errorMsg} already Exist!!!` },
  ];

  return { statusCode, message, error };
};

export default handleDuplicateError;
