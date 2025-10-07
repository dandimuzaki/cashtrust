import api from './../api/axios.js'

export const getTransactions = async () => {
  try {
    const res = await api.get('/transactions')
    return res.data
  } catch (err) {
    console.error("Failed to load transactions", err)
  }
}

export const getTransactionById = async (id) => {
  try {
    const res = await api.get(`/transactions/transaction/${id}`)
    return res.data
  } catch (err) {
    console.error("Failed to load transaction", err)
  }
}

export const getMonthlyTransactions = async (query = '') => {
  try {
    const res = await api.get(`/transactions/monthly?${query}`)
    return res.data
  } catch (err) {
    console.error("Failed to load transaction", err.message)
  }
}

export const getTransactionsByCategory = async (query = '') => {
  try {
    const res = await api.get(`/transactions/categories?${query}`)
    return res.data
  } catch (err) {
    console.error("Failed to load transaction", err)
  }
}

export const getAnalyticsOverview = async (query = '') => {
  try {
    const res = await api.get(`/transactions/analytics?${query}`)
    return res.data
  } catch (err) {
    console.error("Failed to load transaction", err.message)
  }
}

export const createTransaction = async (data) => {
  try {
    const res = await api.post('/transactions', data)
    return res.data
  } catch (err) {
    console.error("Failed to create transaction", err)
  }
}

export const deleteTransaction = async (id) => {
  try {
    const res = await api.delete(`/transactions/${id}`)
    return res.data
  } catch (err) {
    console.error("Failed to delete transaction", err)
  }
}

export const updateTransaction = async (id, data) => {
  try {
    const res = await api.put(`/transactions/${id}`, data)
    return res.data
  } catch (err) {
    console.error("Failed to update transaction", err)
  }
}