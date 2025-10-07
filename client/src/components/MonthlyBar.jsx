import React, { useCallback, useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { getMonthlyTransactions } from '../services/transactionService'
import { useAuth } from '../hooks/AuthContext'

const MonthlyBar = React.memo(({loading, monthlyData}) => {
  console.log("Rendering MonthlyBar")

  return (
    <>
    {(<ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={monthlyData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_income" fill="#0374d9" activeBar={<Rectangle fill="#7ab9f0" />} />
          <Bar dataKey="total_expense" fill="#fee254" activeBar={<Rectangle fill="#ffea81" />} />
        </BarChart>
      </ResponsiveContainer>)}
      </>
  )
})

export default MonthlyBar
