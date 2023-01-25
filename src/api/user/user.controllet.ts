import { Response, Request, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import logger from "../../logger";
import { getAllUsers } from './user.services';

dotenv.config();

export async function handleAllGetUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users)
  } catch (error) {
    logger.error('handleAllGetUsers ~ error', error)
    return res.status(500).json(error);
  };
};
