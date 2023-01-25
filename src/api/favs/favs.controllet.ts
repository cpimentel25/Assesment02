import { Response } from 'express';
import * as dotenv from 'dotenv';
import logger from '../../logger';
import { getAllFavs } from './favs.services';

dotenv.config();

export async function handleGetAllFavs(req, res: Response, next) {
  try {
    const favs = await getAllFavs();
    return res.status(200).json(favs);
  } catch (error) {
    logger.error('handleGetAllFavs ~ error', error)
    return res.status(500).json(error);
  }
};
