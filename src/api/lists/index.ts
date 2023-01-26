import { Router } from "express";
import { isAuthenticated } from "../../auth/auth.service";
import { handleAllGetLists, handleCreateLists, handleGetLists } from "./lists.controller";

const router = Router();

// Get /api/lists/
router.get('/', isAuthenticated, handleAllGetLists);

// Get /api/lists/:id
router.get('/:id', isAuthenticated, handleGetLists);

// Post /api/lists/
router.post('/',isAuthenticated , handleCreateLists);

export default router;
