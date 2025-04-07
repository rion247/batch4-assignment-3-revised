import { Response } from 'express';

type TSendResponseData<T> = {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
};

const sendResponse = <T>(res: Response, data: TSendResponseData<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
    data: data.data,
  });
};

export default sendResponse;
