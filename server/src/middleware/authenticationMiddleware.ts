import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express' {
  interface Request {
    userId: string;
  }
}

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'No token authorization' });
  }

  const tokenPrefix = 'Bearer ';
  if (!authHeader.startsWith(tokenPrefix)) {
    return res.status(401).json({ error: 'Token is not a Bearer' });
  }

  const token = authHeader.slice(tokenPrefix.length);

  try {
    const decoded: any = jwt.verify(token, 'web-tycoon');

    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token or expired' });
  }
};

export default authenticateUser;