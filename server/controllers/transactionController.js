import { createTransaction, deleteTransaction, getMonthlyTransactions, getTransactionById, getTransactions, getTransactionsByCategory, updateTransaction } from "../models/transaction.js"

export const getAllTransactions = async (req, res) => {
  try {
    const user = req.user
    const {type, category, sort} = req.query
    const transactions = await getTransactions(user.id, type, category, sort)
    res.status(200).json({
      success: true,
      message: "Success retrieve transactions",
      data: transactions
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed retrieve transactions",
      errors: err.message
    })
  }
}

export const getSingleTransaction = async (req, res) => {
  try {
    const user = req.user
    const {id} = req.params
    const transaction = await getTransactionById(id, user.id)
    if (!transaction) return res.status(404).json({
      success: false,
      message: "Transaction not found"
    })
    res.status(200).json({
      success: true,
      message: "Success retrieve transaction",
      data: transaction
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve transaction",
      errors: err.message
    })
  }
}

export const fetchMonthlyTransactions = async (req, res) => {
  try {
    const user = req.user
    const {interval, from, to} = req.query
    const transactions = await getMonthlyTransactions(user.id, interval, from, to)
    res.status(200).json({
      success: true,
      message: "Success retrieve transactions",
      data: transactions
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed retrieve transactions",
      errors: err.message
    })
  }
}

export const fetchTransactionsByCategory = async (req, res) => {
  try {
    const user = req.user
    const {type, from, to} = req.query
    const transactions = await getTransactionsByCategory(user.id, type, from, to)
    res.status(200).json({
      success: true,
      message: "Success retrieve transactions",
      data: transactions
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed retrieve transactions",
      errors: err.message
    })
  }
}

export const getAnalyticsOverview = async (req, res) => {
  try {
    const {id} = req.user
    const {interval, currentFrom, currentTo, compareFrom, compareTo} = req.query
    const currentPeriod = await getMonthlyTransactions(id, interval, currentFrom, currentTo)
    const comparePeriod = await getMonthlyTransactions(id, interval, compareFrom, compareTo)
    const current = {
      'total_income': currentPeriod.reduce((sum, c) => sum + Number(c.total_income), 0),
      'total_expense': currentPeriod.reduce((sum, c) => sum + Number(c.total_expense), 0),
      'net': currentPeriod.reduce((sum, c) => sum + Number(c.net), 0),
    }

    const compare = {
      'total_income': comparePeriod.reduce((sum, c) => sum + Number(c.total_income), 0),
      'total_expense': comparePeriod.reduce((sum, c) => sum + Number(c.total_expense), 0),
      'net': comparePeriod.reduce((sum, c) => sum + Number(c.net), 0),
    }
    
    const calcGrowth = (curr, prev) =>
      prev == 0 ? (curr > 0 ? 100 : 0) : ((curr - prev) / prev) * 100;
      
    const growth = {
      income_growth: calcGrowth(current.total_income, compare.total_income).toFixed(2),
      expense_growth: calcGrowth(current.total_expense, compare.total_expense).toFixed(2),
      net_growth: calcGrowth(current.net, compare.net).toFixed(2)
    }

    const result = {'current': current, 'compare': compare, 'growth': growth}
    res.status(200).json({
      success: true,
      message: "Success fetch analytics overview",
      data: result
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics overview",
      errors: err.message
    })
  }
}

export const addTransaction = async (req, res) => {
  try {
    const user = req.user
    const { description, category_id, amount, type } = req.body
    if (!description || !category_id || !amount || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const added = await createTransaction({...req.body, user_id: user.id})
    res.status(201).json({
      success: true,
      message: "Success create transaction",
      data: added
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed create transaction",
      error: err.message
    })
  }
}

export const removeTransaction = async (req, res) => {
  try {
    const {id} = req.params
    const deleted = await deleteTransaction(id, req.user.id)
    console.log(deleted)
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      })
    }
    res.status(200).json({
      success: true,
      message: "Success delete transaction",
      data: deleted
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed delete transaction",
      error: err.message
    })
  }
}

export const reviseTransaction = async (req, res) => {
  try {
    const user = req.user
    const data = req.body
    const {id} = req.params
    const updated = await updateTransaction(id, {...data, user_id: user.id})
    if (!updated) {
      return res.status(404).json({
        success: true,
        message: "Transaction not found",
      })
    }
    res.status(200).json({
      success: true,
      message: "Success update transaction",
      data: updated
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed update transaction",
      error: err.message
    })
  }
}