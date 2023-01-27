import { NextFunction, Response, Request } from 'express';
import * as dotenv from 'dotenv';
import logger from '../../logger';
import { createFavs, deleteFavs, getAllFavs, getFavs, updateListsFavs } from './favs.services';

dotenv.config();

export async function handleGetAllFavs(req: Request, res: Response, next: NextFunction) {
  try {
    const favs = await getAllFavs();
    return res.status(200).json(favs);
  } catch (error) {
    logger.error('handleGetAllFavs ~ error', error)
    return res.status(500).json(error);
  }
};

export async function handleGetFavs(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const favs = await getFavs(id)
    return res.status(200).json(favs)
  } catch (error) {
    logger.error('handleGetFavs ~ error', error)
    return res.status(500).json(error);
  }
};

export async function handleCreateFavs(req: any, res: Response, next: NextFunction) {
  const data = req.body;
  const user = req.user;

  try {
    const listsFavs = await updateListsFavs(data, user);

    if (!listsFavs) {
      console.log('Working!')
      return res.status(404).json({ message: 'List not found' })
    }

    const favs = await createFavs(data);

    return res.status(200).json(favs);
  } catch (error) {
    logger.error('handleCreateFavs ~ error', error)
    return res.status(500).json(error);
  }
};

export async function handleDeleteFavs(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const data = await deleteFavs(id);

    if (!data) {
      return res.status(404).json({ message: 'Id not found' });
    }
    return res.status(200).json({ message: 'Favs delete '});
  } catch (error) {
    logger.error('handleDeleteFavs ~ error', error)
    return res.status(500).json(error);
  }
};
