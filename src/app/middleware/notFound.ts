import { Request, Response } from 'express';
import status from 'http-status';

const notFound = (req: Request, res: Response) => {
  const statusCode = status.NOT_FOUND;
  const message = 'Sorry!!! API Not Found!!!';

  res
    .status(statusCode)
    .json({ success: false, message, statusCode, error: '' });
};

export default notFound;
