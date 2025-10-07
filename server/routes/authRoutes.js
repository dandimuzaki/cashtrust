import express from "express";
import { deleteAccount, login, logout, register, silentLogin, updateAccount } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/silent-login', silentLogin)
router.post('/logout', logout)
router.put('/user/update', verifyToken, updateAccount)
router.post('/user/delete', verifyToken, deleteAccount)

export default router