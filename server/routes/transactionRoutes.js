import express from "express";
import { addTransaction, fetchMonthlyTransactions, fetchTransactionsByCategory, getAllTransactions, getAnalyticsOverview, getSingleTransaction, removeTransaction, reviseTransaction } from "../controllers/transactionController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/', verifyToken, getAllTransactions);
router.get('/transaction/:id', verifyToken, getSingleTransaction);
router.get('/monthly', verifyToken, fetchMonthlyTransactions);
router.get('/categories', verifyToken, fetchTransactionsByCategory);
router.get('/analytics', verifyToken, getAnalyticsOverview);
router.post('/', verifyToken, addTransaction);
router.delete('/:id', verifyToken, removeTransaction);
router.put('/:id', verifyToken, reviseTransaction)

export default router;