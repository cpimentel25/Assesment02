import { Router } from "express";
import {
  handleCreateFavs,
  handleDeleteFavs,
  handleGetAllFavs,
  handleGetFavs
} from "./favs.controllet";
import { isAuthenticated } from "../../auth/auth.service";

const router = Router();

// Get /api/favs/ -> All list of favorites
router.get('/', isAuthenticated, handleGetAllFavs);

// Get /api/favs/:id	->	A single list of favorites
router.get('/:id', isAuthenticated, handleGetFavs);

// Post /api/favs/ -> Creates a new list of favorites
router.post('/', isAuthenticated, handleCreateFavs);

// Delete /api/favs/:id	-> Deletes a list of favorites
router.delete('/:id', isAuthenticated, handleDeleteFavs);

export default router;
