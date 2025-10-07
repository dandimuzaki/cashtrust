import express from "express";
import { addCategory, removeCategory, retrieveCategories } from "../controllers/categoryController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/', verifyToken, retrieveCategories);
router.post('/', verifyToken, addCategory);
router.delete('/:id', verifyToken, removeCategory);

export default router;