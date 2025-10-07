import React, { useCallback, useEffect, useMemo, useState } from 'react'
import CategoryPie from '../components/CategoryPie';
import PageTitle from '../components/PageTitle';
import MonthlyBar from '../components/MonthlyBar';
import { getAnalyticsOverview, getMonthlyTransactions, getTransactionsByCategory } from '../services/transactionService';
import { useAuth } from '../hooks/AuthContext';
import { formatIDR } from '../utils/format';
import Analytics from '../components/Analytics';
import TransactionMiniTable from '../components/TransactionMiniTable';
import { useTransaction } from '../hooks/TransactionContext';
import { useNavigate } from 'react-router-dom';
import {Close} from '@mui/icons-material';

const MemoizedMonthlyBar = React.memo(MonthlyBar)
const MemoizedCategoryPie = React.memo(CategoryPie)
const MemoizedAnalytics = React.memo(Analytics)
const MemoizedTransactionMiniTable = React.memo(TransactionMiniTable)

const Dashboard = () => {
  console.log("Rendering Dashboard")

  const { loadingAuth, accessToken } = useAuth()
  const [loading, setLoading] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(null)
  const [monthlyData, setMonthlyData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const {transactions} = useTransaction()


  // ✅ Memoize today once
  const today = useMemo(() => new Date(), [])

  const firstOfThisMonth = new Date(today.getFullYear(), today.getMonth())
  const firstOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1)
  const lastOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0)

  // ✅ Replace array states with individual states
  const [currentFrom, setCurrentFrom] = useState(firstOfThisMonth)
  const [currentTo, setCurrentTo] = useState(today)

  const [compareFrom, setCompareFrom] = useState(firstOfLastMonth)
  const [compareTo, setCompareTo] = useState(lastOfLastMonth)

  const periodOption = [
    ["thisMonth", "This Month"],
    ["lastMonth", "Last Month"],
    ["thisYear", "This Year"],
    ["lastYear", "Last Year"],
  ]

  const [current, setCurrent] = useState("thisMonth")
  const [compare, setCompare] = useState("lastMonth")

  // === Fetchers ===
  const fetchCurrentMonthTransactions = useCallback(async (query) => {
    try {
      const result = await getMonthlyTransactions(query)
      console.log(result.data[0])
      if (result) setCurrentMonth(result?.data[0])
    } catch (err) {
      console.error("Failed to fetch current month transactions", err)
    }
  }, [])

  const fetchMonthlyTransactions = useCallback(async (query) => {
    try {
      const result = await getMonthlyTransactions(query)
      if (result) setMonthlyData(result?.data)
    } catch (err) {
      console.error("Failed to fetch monthly transactions", err)
    }
  }, [])

  const fetchTransactionsByCategory = useCallback(async (query) => {
    try {
      const result = await getTransactionsByCategory(query)
      if (result.data) {
        setCategoryData(result?.data?.map((d) => ({ ...d, total: Number(d.total) })))
      }
    } catch (err) {
      console.error("Failed to fetch category transactions", err)
    }
  }, [])

  const fetchAnalytics = useCallback(async (query) => {
    try {
      const result = await getAnalyticsOverview(query)
      if (result) setAnalytics(result?.data)
    } catch (err) {
      console.error("Failed to fetch analytics", err)
    }
  }, [])

  // === Handlers ===
  const handleCurrent = useCallback((period) => {
    setCurrent(period)
    const year = today.getFullYear()
    const month = today.getMonth()

    if (period === "thisMonth") {
      setCurrentFrom(new Date(year, month, 1))
      setCurrentTo(today)
    } else if (period === "lastMonth") {
      setCurrentFrom(new Date(year, month - 1, 1))
      setCurrentTo(new Date(year, month, 0))
    } else if (period === "thisYear") {
      setCurrentFrom(new Date(year, 0, 1))
      setCurrentTo(today)
    } else if (period === "lastYear") {
      setCurrentFrom(new Date(year - 1, 0, 1))
      setCurrentTo(new Date(year - 1, 11, 31))
    }
  }, [today])

  const handleCompare = useCallback((period) => {
    setCompare(period)
    const year = today.getFullYear()
    const month = today.getMonth()

    if (period === "thisMonth") {
      setCompareFrom(new Date(year, month, 1))
      setCompareTo(today)
    } else if (period === "lastMonth") {
      setCompareFrom(new Date(year, month - 1, 1))
      setCompareTo(new Date(year, month, 0))
    } else if (period === "thisYear") {
      setCompareFrom(new Date(year, 0, 1))
      setCompareTo(today)
    } else if (period === "lastYear") {
      setCompareFrom(new Date(year - 1, 0, 1))
      setCompareTo(new Date(year - 1, 11, 31))
    }
  }, [today])

  // === Effect for initial fetch ===
  useEffect(() => {
    console.log("What's happe 1")
    if (!loadingAuth && accessToken) {
      const queryCurrentMonth = new URLSearchParams()
      queryCurrentMonth.append('interval', 0)
      fetchCurrentMonthTransactions(queryCurrentMonth)
      console.log(queryCurrentMonth)
    }
  }, [loadingAuth, accessToken, fetchCurrentMonthTransactions])

  useEffect(() => {
    console.log("What's happen 2")
    if (!loadingAuth && accessToken) {
      const queryMonthly = new URLSearchParams()
      queryMonthly.append('interval', 5)
      fetchMonthlyTransactions(queryMonthly)
    }
  }, [loadingAuth, accessToken, fetchMonthlyTransactions])

  useEffect(() => {
    console.log("What's happen 3")
    if (!loadingAuth && accessToken) {
      const queryCategory = new URLSearchParams()
      queryCategory.append('type', 'expense')
      fetchTransactionsByCategory(queryCategory)
    }
  }, [loadingAuth, accessToken, fetchTransactionsByCategory])

  useEffect(() => {
    console.log("What's happen 4")
    if (!loadingAuth && accessToken) {
      const query = new URLSearchParams()
      query.append('currentFrom', `${currentFrom.getFullYear()}-${currentFrom.getMonth() + 1}-${currentFrom.getDate()}`)
      query.append('currentTo', `${currentTo.getFullYear()}-${currentTo.getMonth() + 1}-${currentTo.getDate()}`)
      query.append('compareFrom', `${compareFrom.getFullYear()}-${compareFrom.getMonth() + 1}-${compareFrom.getDate()}`)
      query.append('compareTo', `${compareTo.getFullYear()}-${compareTo.getMonth() + 1}-${compareTo.getDate()}`)
      fetchAnalytics(query).finally(() => setLoading(false))
    }
  }, [loadingAuth, accessToken, currentFrom, currentTo, compareFrom, compareTo, fetchAnalytics])

  const navigate = useNavigate()
  const [hideBanner, setHideBanner] = useState(false)

  return (
    <>
      <PageTitle title='Dashboard'/>
      <div className='grid md:gap-6 gap-4'>
      {!hideBanner && (
        <div className="flex justify-between bg-amber-50 border-l-4 border-amber-400 text-amber-700 md:p-4 p-2 rounded-xl shadow-sm">
          <p>Your starting balance is not set. 
          <span 
            onClick={() => navigate('/settings')}
            className="underline cursor-pointer font-medium ml-1"
          >
            Set it in Settings
          </span> for accurate totals.
          </p>
          <div
          onClick={() => setHideBanner(true)}
          >
            <Close/>
          </div>
        </div>
      )}
        {loading ? '' : (
          <div className='grid md:grid-cols-4 md:gap-4 gap-2'>
            <div className='p-2 md:p-4 bg-[var(--light-secondary)] grid gap-2 rounded-lg shadow-[2px_2px_10px_rgba(0,0,0,0.1)]'>
              <div>
                <p 
                
                className='text-lg md:text-xl font-bold'>Total Balance</p>
                <p className='text-sm'>Since 17-08-1945</p>
              </div>
              <p className='text-xl md:text-3xl text-white font-bold'>{formatIDR(Number(currentMonth?.total_balance))}</p>
            </div>
            <div className='p-2 md:p-4 bg-[var(--light-primary)] grid gap-2 rounded-lg shadow-[2px_2px_10px_rgba(0,0,0,0.1)]'>
              <div>
                <p className='text-sm'>This Month</p>
                <p className='text-lg md:text-xl font-bold'>Total Income</p>
              </div>
              <p className='text-xl md:text-3xl font-bold text-white'>{formatIDR(Number(currentMonth?.total_income))}</p>
            </div>
            <div className='p-2 md:p-4 bg-[var(--light-secondary)] grid gap-2 rounded-lg shadow-[2px_2px_10px_rgba(0,0,0,0.1)]'>
              <div>
                <p className='text-sm'>This Month</p>
                <p className='text-lg md:text-xl font-bold'>Total Expense</p>
              </div>
              <p className='text-xl md:text-3xl font-bold text-white'>{formatIDR(Number(currentMonth?.total_expense))}</p>
            </div>
            <div className='p-2 md:p-4 bg-[var(--light-primary)] grid gap-2 rounded-lg shadow-[2px_2px_10px_rgba(0,0,0,0.1)]'>
              <div>
                <p className='text-sm'>This Month</p>
                <p className='text-lg md:text-xl font-bold'>Net Savings</p>
              </div>
              <p className='text-xl md:text-3xl font-bold text-white'>{formatIDR(Number(currentMonth?.net))}</p>
            </div>
          </div>
        )}

        <div className='grid md:grid-cols-[3fr_2fr] gap-4'>
          <div className='grid gap-2 bg-white shadow-[2px_2px_10px_rgba(0,0,0,0.1)] rounded-lg p-4'>
            <h2 className='text-center font-bold text-xl'>Monthly Transactions</h2>
            <div className='w-full h-60 text-sm'>
              {loading ? '' : <MemoizedMonthlyBar monthlyData={monthlyData} loading={loading} />}
            </div>
          </div>
          <div className='grid gap-2 bg-white shadow-[2px_2px_10px_rgba(0,0,0,0.1)] rounded-lg p-4'>
            <h2 className='text-center font-bold text-xl'>Expense by Category</h2>
            <div className='w-full h-60 text-sm'>
              {loading ? '' : <MemoizedCategoryPie categoryData={categoryData} loading={loading} />}
            </div>
          </div>
        </div>

        <div className='grid md:grid-cols-[1fr_3fr] gap-4'>
          {loading ? '' : (
            <MemoizedAnalytics 
              loading={loading} 
              current={current} 
              compare={compare} 
              handleCurrent={handleCurrent} 
              handleCompare={handleCompare} 
              periodOption={periodOption} 
              analytics={analytics} 
            />
          )}
          <div className='h-fit hidden md:grid gap-2 bg-white shadow-[2px_2px_10px_rgba(0,0,0,0.1)] rounded-lg p-4'>
            <h2 className='font-bold text-xl'>Current Transactions</h2>
            {<MemoizedTransactionMiniTable transactions={transactions.slice(0,6)}/>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
