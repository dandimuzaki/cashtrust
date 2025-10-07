import { useEffect, useState } from 'react'
import { TransactionContext } from './TransactionContext.jsx'
import { useAuth } from './AuthContext.jsx'
import { createTransaction, deleteTransaction, getTransactionById, getTransactions, updateTransaction } from '../services/transactionService.js';

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [transaction, setTransaction] = useState(null)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(Date.now())
  const { loadingAuth, accessToken } = useAuth()

  const fetchTransactions = async () => {
    try {
      const result = await getTransactions()
      setTransactions(result.data)
    } catch (err) {
      console.error("Failed to fetch transactions", err)
    }
  }

  const fetchTransaction = async (id) => {
    try {
      const result = await getTransactionById(id)
      setTransaction(result.data)
    } catch (err) {
      console.error("Failed to fetch transaction", err)
    }
  }

  useEffect(() => {
    if (!loadingAuth && accessToken) {
    fetchTransactions()
    if (selectedTransaction?.id) {
      fetchTransaction(selectedTransaction?.id)
    }
  }
  }, [selectedTransaction?.id, lastUpdated, loadingAuth, accessToken])

  const openTransactionModal = (transaction = null) => {
    setSelectedTransaction(transaction)
    setOpenModal(true)
  }

  const closeTransactionModal = () => {
    setSelectedTransaction(null)
    setOpenModal(false)
    setTransaction(null)
  }

  const saveTransaction = async (data) => {
    setLoading(true)
    try {
      if (transaction) {
        const updated = await updateTransaction(transaction.id, data)
        setTransactions((prev) => 
          prev.map((t) => (t.id === updated.data.id ? updated.data : t))
        )
        setLastUpdated(Date.now())
      } else {
        const added = await createTransaction(data)
        setTransactions((prev) => [...prev, added.data])
        setLastUpdated(Date.now())
      }
    } catch (err) {
      if (transaction) {
        console.error("Failed to update transaction", err)
      } else {
        console.error("Failed to create transaction", err)
      }
    } finally {
      setLoading(false)
      closeTransactionModal()
    }
  }

  const removeTransaction = async (id) => {
    setLoading(true)
    try {
      await deleteTransaction(id)
      setTransactions((prev) => prev.filter((transaction) => transaction.id != id))
    } catch (err) {
      console.error("Failed to delete transaction", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <TransactionContext.Provider value={{
      transactions,
      selectedTransaction,
      transaction,
      openModal,
      openTransactionModal,
      closeTransactionModal,
      saveTransaction,
      removeTransaction,
      loading, setLoading,
      lastUpdated
    }}>
      {children}
    </TransactionContext.Provider>
  )
}