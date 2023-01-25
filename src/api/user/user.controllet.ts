import { Response, Request, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import logger from "../../logger";
import { createUser, getAllUsers } from './user.services';

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

export async function handleCreateUsers(req: Request, res: Response) {
  const data = req.body;
  try {
    const user = await createUser(data);
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};
