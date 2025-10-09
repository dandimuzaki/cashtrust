import React, { useCallback, useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from '../hooks/AuthContext';
import { getAnalyticsOverview } from '../services/transactionService';

const Analytics = React.memo(({loading, current, compare, periodOption, handleCurrent, handleCompare, analytics}) => {
  console.log("Rendering Analytics")

  return (
    <>
    {(<div className='grid gap-4 bg-white shadow-[2px_2px_10px_rgba(0,0,0,0.1)] rounded-lg p-4'>
      <h2 className='text-center font-bold text-xl'>Analytics</h2>
      <div className='md:flex grid gap-2 w-full justify-center items-center text-center'>
      <div className='rounded pr-2 bg-gray-300'>
        <select
          value={current}
          onChange={(e) => handleCurrent(e.target.value)}
          className='px-4 py-2'
        >
          {periodOption.filter(p => p[0]!== compare).map((p, index) => (
            <option value={p[0]} key={index}>{p[1]}</option>
          ))}
        </select>
      </div>
        <p>vs</p>
      <div className='rounded pr-2 bg-gray-300'>
        <select
          value={compare}
          onChange={(e) => handleCompare(e.target.value)}
          className='px-4 py-2'
        >
          {periodOption.filter(p => p[0]!==current).map((p, index) => (
            <option value={p[0]} key={index}>{p[1]}</option>
          ))}
        </select>
      </div>
      
      </div>
      <div className='grid gap-2'>
        <div className='grid gap-2 text-center'>
          <p>Income Growth</p>
          <p className='font-bold text-green-500 text-3xl'>{analytics?.growth.income_growth}%</p>
        </div>
        <div className='grid gap-2 text-center'>
          <p>Expense Growth</p>
          <p className='font-bold text-red-500 text-3xl'>{analytics?.growth.expense_growth}%</p>
        </div>
        <div className='grid gap-2 text-center'>
          <p>Net Growth</p>
          <p className='font-bold text-blue-500 text-3xl'>{analytics?.growth.net_growth}%</p>
        </div>
      </div>
    </div>)}
    </>
  )
})

export default Analytics
