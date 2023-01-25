import { Router } from "express";
import { handleGetAllFavs } from "./favs.controllet";
import { isAuthenticated } from "../../auth/auth.service";

const router = Router();

// Get /api/favs/ -> All list of favorites
router.get('/', isAuthenticated, handleGetAllFavs);

// Get /api/favs/:id	->	A single list of favorites

// Post /api/favs/ -> Creates a new list of favorites

// Delete /api/favs/:id	-> Deletes a list of favorites

// Post /auth/local/login	-> Login user by email/password

export default router;
