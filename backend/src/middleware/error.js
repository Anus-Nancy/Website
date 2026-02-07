import { StatusCodes } from 'http-status-codes';

export const notFound = (_req, res) => res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' });

export const errorHandler = (err, _req, res, _next) => {
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  return res.status(status).json({ message: err.message || 'Internal server error' });
};
