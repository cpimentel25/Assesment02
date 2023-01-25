import jwt from 'jsonwebtoken';
import { UserDocument } from '../api/user/user.model';
import { NextFunction, Response, Request } from 'express';
import { getUser } from '../api/user/user.services';
import { AuthRequest } from './auth.types';

const SECRET = process.env.TOKEN_SECRET as string


//sing_Token ->
export function singToken(payload: any, options?: any) {
  const token = jwt.sing(
    payload,
    SECRET,
    options
  );
  return token;
};

//verify_Token ->
export function verifyToken(token: string) {
  try {
    const decode = jwt.verify(token, SECRET) as UserDocument;
    return decode;
  } catch (error) {
    return false;
  };
};

// isAuthenticated ->
export async function isAuthenticated(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers?.authorization?.split(' ')[1];

  if(!token) {
    return res.status(401).json({ message: 'No autorizado' });
  };

  const decode = verifyToken(token) as UserDocument;

  if (!decode) {
    return res.status(401).json({ message: 'No autorizado' });
  };

  const user = await getUser({ email: decode.email });

  if (!user) {
    return res.status(401).json({ message: 'No autorizado' });
  };

  req.user = user;

  next();
  return true;
}
