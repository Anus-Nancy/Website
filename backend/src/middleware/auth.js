import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../utils/jwt.js';

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Missing token' });
  }
  try {
    req.user = verifyToken(authHeader.split(' ')[1]);
    return next();
  } catch {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};

export const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
  }
  return next();
};
