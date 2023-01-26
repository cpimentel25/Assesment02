import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { AuthRequest } from '../../auth/auth.types';
import logger from '../../logger';
import { getAllLists, getListsById, postCreateLists } from './lists.services';

dotenv.config();

export async function handleAllGetLists(req: AuthRequest, res: Response) {
  const id = req.user?._id;
  try {
    const lists = await getAllLists(id);
    return res.status(200).json(lists);
  } catch (error) {
    logger.error('handleAllGetLists ~ error', error)
    return res.status(500).json(error);
  }
};

export async function handleGetLists(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const lists = await getListsById(id);

    if (!lists) {
      return res.status(404).json({ message: 'List not found' });
    }
    return res.status(200).json(lists);

  } catch (error) {
    logger.error('handleGetCategorie ~ error', error);
    return res.status(500).json(error);
  }
};

export async function handleCreateLists(req: Request, res: Response) {
  const data = req.body;
  try {
    const lists = await postCreateLists(data);
    return res.status(200).json(lists);
  } catch (error: any) {
    logger.error('handleCreateLists ~ error', error);
    return res.status(500).json(error.message);
  }
}
